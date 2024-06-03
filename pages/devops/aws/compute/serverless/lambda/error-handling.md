# Error Handling

BEST PRACTICES: always ensure failures are tested.


## Workflow

When a function errors, the error will cause a request to stay
on the internal Lambda queue.

If we have configured single retry, it will try the same invocation again after a minute.

If the function fails a second time (depends on on how many retries are configured), the failed invocation is rooted to a dead-letter queue a failure destination.

If the error is due to throttling or a system error:
- Retry exponentially from one second up to five minutes.
- If the queue is filling up, it'll slow down.

Important:
- An event can be sent to a Lambda multiple times
- Funtions are not guaranteed to run in a certain order and only once per event.


## Configuration options

There are two key configuration for an asynchronous invocation:
- Retry attemps: number of times the Lambda service will retry the invocation.
- Maximum age of event: how long it can stay on the queue. Maximum is six hours.


## Handling errors in Event Source Mappings

### SQS Queues

If a function errors processing a batch, all items will become visible in the queue again.

To make items only re-appear on function errors, it's recommended to set the visibility timeout on the queue to be six times the timeout of the function.

If the function is failing, then the processes that poll queue will reduce and slow down.

You can turn on the report batch item failures option and return a list of failures from the function under `batchItemFailures`.


### Streams

For stream source such as Kinesis or DynamoDB stream, if a function errors processing a batch, then the Lambda service will retry until:
- It works.
- The data expires from the stream.

To avoid a single record blocking a whole shard:
- Use smaller batches.
- Set a maximum number of retry attempts. Allow the failures to be retried
- Set a maximum record age. Ensure failing items will be removed from the stream
- Turn on the option to split batch on error. The function will be invoked again with a smaller batch
- Turn on the report batch item failures option. Return a list of the failing records to avoid retrying whole batches.


## Dead Letter Queue (DLQ)

A dead-letter queue is a destination for a failed or expired event.

It is used when an event fails all processing attempts or expires without being processed.

It can be set as an Amazon SQS queue or an Amazon SNS topic (standard type, not FIFO).

SQS queue support redrive, messages can be sent back to the original source for proccessing.

SNS is used if the message should be fanned out to multiple queues.

Metadata include some attributes from the event: request ID, error code, and the first 1KB of the error message.

You can setup a DLQ by configuring the `DeadLetterConfig` property when creating or updating your Lambda function.


## On-failure destinations

On-failure destinations can be used for handling or notifying of failures after any retries have not worked.

Compared to DLQ:
- More destination services (Amazon EventBridge or another function)
- Additional information provided (stack traces, for example)
- Works for asynchronous invocation or stream event sources (Kinesis and DynamoDB)