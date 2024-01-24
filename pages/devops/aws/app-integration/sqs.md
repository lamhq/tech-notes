# Amazon Simple Queue Service (Amazon SQS)

## Overview

Amazon SQS is a fully managed, **message queuing service** that you can use to decouple and scale microservices, distributed systems, and serverless applications.

SQS enables you to send, store, and receive messages between software components.

An SQS queue is a temporary repository for messages that are awaiting processing.

One resource will write a message to an SQS queue, and then another resource will retrieve that message from SQS.

SQS is pull-based (Amazon SNS is push-based).

SQS doesn't offer real-time.

SQS stores all message queues and messages within a single, highly available AWS region with multiple redundant AZs.


## Queue Types

### Standard

Default queue type.

Nearly unlimited transactions per second.

Messages could be received out of order.

Messages can be duplicated (due to visibility timeout is too low or applications do not delete messages after processing).

Tips: to prevent duplication, you can include a unique ordering ID in each message, and have the backend application use this to deduplicate messages.


### FIFO queues

Guaranteed ordering (using message group ID).

No message duplication.

Message is delivered once and remains available until a consumer processes and deletes it.

Support message groups that allow multiple ordered message groups within a single queue.

Support up to **300** messages per second. When you batch 10 messages per operation (maximum), FIFO queues can support up to 3,000 messages per second.

You can enable **FIFO high throughput**, allow to process up to 9,000 transactions second/API (without batching), 90,000 per second with batching.

Do not have the same level of performance as standard queues.

More expensive.

Deduplication with FIFO queues:
- Message Group ID: The tag that specifies that a message belongs to a specific message group. Messages that belong to the same message group are guaranteed to be processed in a FIFO manner.
- Message Deduplication ID: The token used for deduplication of messages within the deduplication interval.
- Provide a `MessageDeduplicationId` with the message.
- The de-duplication interval is 5 minutes.
- Content based duplication – the `MessageDeduplicationId` is generated as the SHA-256 with the message body.

Sequencing with FIFO queues:
- To ensure strict ordering between messages, specify a MessageGroupId.
- Messages with a different Group ID may be received out of order.
- Messages with the same Group ID are delivered to one consumer at a time.


## Dead-Letter Queues

Dead-letter queues (DLQ) are targets for messages that cannot be processed successfully.

It's technically just a standard or FIFO queue that has been specified as a dead-letter queue in the configuration of another queue.

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-sqs-dead-letter-queue-redrive-policy.jpeg)

Messages are moved to the dead-letter queue when the `ReceiveCount` for a message exceeds the `maxReceiveCount` for a queue.

Dead-letter queues will break the order of messages in FIFO queues.

Useful for debugging applications and messaging systems.

**Redrive capability** allows you to move the message back into the source queue!

You can use DLQs with FIFO SQS queues, but it must ALSO be FIFO queues.


### Benefits

DLQs can be used to configure alarms based on message availability counts. Once a message is sent to DLQs, you can trigger alarms to notify operation teams.

It allows you to quickly identify which logs to investigate for exceptions.

Analyze the SQS message contents for any errors.

Troubleshoot consumer permissions.

### Tips

Make sure you set up an alarm and alert on queue depth.


## Visibility timeout

The amount of time a message is invisible in the queue after a reader picks it up.

- If the job **is processed** before the visibility timeout expires, the message will then be deleted from the queue.
- If the job **is not processed** within the visibility timeout, the message will become visible again and another reader will process it.

This could result in the same message being delivered twice.

The default visibility timeout is 30 seconds, maximum is 12 hours.


## Delivery delay

The amount of time a message is delayed before being added to the queue.

Up to 900 seconds (15 minutes), default is 0.

Changing this setting for standard queues doesn’t affect the delay of messages already in the queue, only new messages. For FIFO queues, this affects the delay of messages already in the queue.

Use cases: Large distributed applications which may need to introduce a delay in processing.


## Polling

Polling is a way to retrieve messages from SQS queues.

### Short polling

Returns immediately (even if the message queue is empty).

It queries only a subset of the available servers for messages (based on weighted random execution).

`ReceiveMessageWaitTime` is set to 0.

More requests are used, which implies higher cost.

Short polling is the default behavior.

> The following diagram shows the short-polling behavior of messages returned from a standard queue after one of your system components makes a receive request. Amazon SQS returns messages A, C, D, and B from these servers. Message E isn't returned for this request, but it's returned for a subsequent request.

![](./images/short-polling.png)


### Long polling

Doesn’t return a response until a message arrives in the message queue or the long poll times out.

Requests contain at least one of the available messages up to the maximum number of messages specified in the `ReceiveMessage` action.

Can be enabled at the queue level or at the API level using `WaitTimeSeconds`.

In effect when `ReceiveMessageWaitTime` is greater than 0 seconds and up to 20 seconds.

Shouldn’t be used if your application expects an immediate response to receive message calls.

In rare cases, you might receive empty responses even when a queue still contains messages, especially if you specify a low value for the `ReceiveMessageWaitTime` parameter.

Uses fewer requests and reduces cost.

Same charge per million requests as short polling.


## Available Settings

- **Delivery delay**
- **Message size**: The maximum message size for the queue. Up to **256KB** of text.
- **Encryption**: Messages are encrypted in transit by default. Can enable "at-rest" too.
- **Message retention**: The amount of time messages remain in the queue. From 1 minute to 14 days, default is **4 days**.
- **Visibility timeout**: The length of time that a message received from a queue (by one consumer) won’t be visible to the other message consumers. If the consumer fails to process the message within the visibility timeout period, the message will reappear in the queue and become available for other consumers to receive and process.
- **Receive message wait time**: The maximum wait time for messages to become available after the queue gets a receive request.
- **Enable content-based deduplication**: Amazon SQS can automatically create deduplication IDs based on the body of the message.
- **Enable high throughput FIFO**: This feature enables high throughput for messages in the queue. Choosing this option changes the related options (deduplication scope and FIFO throughput limit) to the required settings for enabling high throughput for FIFO queues.
- **Redrive allow policy**: This policy defines which source queues can use this queue as the dead-letter queue.


## Monitoring

CloudWatch is integrated with SQS and you can view and monitor queue metrics (collected every 5 minutes).

CloudTrail captures API calls from SQS and logs to a specified S3 bucket.


## Security

You can use IAM policies to control who can read/write messages.

Authentication can be used to secure messages within queues (who can send and receive).

Can enable server-side encryption (SSE) using KMS.
- Can set the CMK you want to use.
- Can set the data key reuse period.
- SSE only encrypts the message body not the message attributes.

IAM policy must allow usage of SQS.

You can also specify permissions in an **SQS queue access policy**:
- Providers finer grained control.
- Control over the requests that come in.


## SQS with Lambda

You can use a Lambda function to process messages in a SQS queue.

Lambda event source mappings support standard queues and FIFO queues.

Lambda polls the queue and invokes your Lambda function synchronously with an event that contains queue messages.

Lambda reads messages in batches and invokes your function once for each batch.

When your function successfully processes a batch, Lambda deletes its messages from the queue.


## SQS vs. SNS vs. Kinesis

Kinesis Data Stream:

- Consumers pull data
- Can be used as queues.
- As many consumers as you need.
- Possible to replay data.
- Meant for **real-time** big data, analytics, and ETL.
- Ordering at the shard level.
- Data expires after X days.
- Must provision throughput.
 
SQS:

- Consumers pull data.
- Data is deleted after being consumed.
- Can have as many workers (consumers) as you need.
- No need to provision throughput.
- No ordering guarantee (except with FIFO queues).
- Individual message delay.

SNS:

- Push data to many subscribers.
- Up to 10,000,000 subscribers.
- Data is not persisted (lost if not deleted).
- Pub/sub.
- Up to 10,000,000 topics.
- No need to provision throughput.
- Integrates with SQS for fan-out architecture pattern.
