# Queue Types

## Standard

Default queue type.

Nearly unlimited transactions per second.

Messages could be received out of order.

Messages can be duplicated (due to visibility timeout is too low or applications do not delete messages after processing).

Tips: to prevent duplication, you can include a unique ordering ID in each message, and have the backend application use this to deduplicate messages.


## FIFO queues

Guaranteed ordering (using message group ID).

No message duplication.

Message is delivered once and remains available until a consumer processes and deletes it.

Support message groups that allow multiple ordered message groups within a single queue.

Support up to **300** messages/sec. Up to **3,000** messages/sec with batching (maximum 10 messages per operation).

You can enable **FIFO high throughput**, allow to process up to 9,000 transactions/sec/API (without batching), 90,000 transactions/second with batching.

Do not have the same level of performance as standard queues.

More expensive.

### Sequencing with FIFO queues
- To ensure strict ordering between messages, specify a MessageGroupId.
- Messages with a different Group ID may be received out of order.
- Messages with the same Group ID are delivered to one consumer at a time.

### Deduplication with FIFO queues
- Message Group ID: The tag that specifies that a message belongs to a specific message group. Messages that belong to the same message group are guaranteed to be processed in a FIFO manner.
- Message Deduplication ID: The token used for deduplication of messages within the deduplication interval.
- Provide a `MessageDeduplicationId` with the message.
- The de-duplication interval is 5 minutes.
- Content based duplication – the `MessageDeduplicationId` is generated as the SHA-256 with the message body.


## Dead-Letter Queues

Dead-letter queues (DLQ) are targets for messages that cannot be processed successfully.

Just a standard or FIFO queue that has been specified as a dead-letter queue of another queue.

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
