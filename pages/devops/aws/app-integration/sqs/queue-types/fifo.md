# FIFO queues

## Overview

Order is strictly preserved. First-In-First-Out Delivery.

No message duplication. Exactly-Once Processing. A message is delivered once and remains available until a consumer processes and deletes 

Support message groups that allow multiple ordered message groups within a single queue.

Queue name must end with the `.fifo` suffix.

Throughput:
- **300** messages/sec/API.
- **3,000** messages/sec with batching (max 10 messages/operation).
- If FIFO high throughput is enabled:
  - **9,000** transactions/sec/API (no batching)
  - **90,000** transactions/sec with batching.

Do not have the same level of performance as standard queues.

More expensive than standard queues.

Ideal for sending data between applications when the order of events is important

Example use cases:
- Processing user-entered inputs in the order entered
- Communications and networking – Sending and receiving data and information in the same order
- Display the correct product price by sending price modifications in the right order.
- Prevent a student from enrolling in a course before registering for an account.


## Sequencing

**MessageGroupId** is the tag that specifies that a message belongs to a specific message group.

Messages that belong to the same message group are always processed one by one, in a strict order relative to the message group.

MessageGroupId is required for FIFO queues. You can't use it for Standard queues.

Avoid having a large backlog of messages with the same message group ID. A FIFO queue checks the first 20k messages for available message groups. If they all have the same `MessageGroupId`, you can't consume messages from other groups beyond the first.


## Deduplication

**Message deduplication ID** is the token used for deduplication of sent messages.

If the setting **Content-based deduplication** is enabled, deduplication IDs are automatically created based on the body of the message (using a SHA-256 hash).

You can explicitly provide the Message deduplication ID.

### Deduplication interval
- If a message with a specific deduplication ID is sent successfully, other messages with the same ID will not be delivered for 5 minutes (deduplication interval).
- Retrying SendMessage requests after the deduplication interval expires can introduce duplicate messages into the queue.


## Receiving messages

You can't request to receive messages with a specific message group ID.

When you receive messages from a FIFO queue that contains multiple message group IDs, Amazon SQS tries to return as many messages as possible from the same message group ID. This ensures that messages within the same group are processed in order.

By returning messages from the same group ID together, other consumers can process messages from different group IDs simultaneously. This helps in parallel processing and improves efficiency.

Message Visibility: Once you receive a message with a specific message group ID, no more messages from that group will be returned to you until you either delete the message or it becomes visible again (e.g., if the visibility timeout expires). This ensures that messages within the same group are processed one at a time, maintaining their order.


## Retry

Producers can retry sending massages as many times as necessary, using the same message deduplication ID.

Consumers can retry receiving massages as many times as necessary, using the same receive request attempt ID.


## High throughput for FIFO queues

High throughput FIFO queues efficiently manage high message throughput while maintaining strict message order.

Ideal for scenarios demanding both **high throughput** and **strict message ordering**.

Use cases:
- Real-time data processing: event processing, telemetry data ingestion
- E-commerce order processing: ensure that orders are processed sequentially and without delays, even during peak shopping seasons.
- Financial services: process market data and transactions with minimal latency while adhering to strict regulatory requirements for message ordering.
- Media streaming: manage the delivery of media files and streaming content, ensuring smooth playback experiences for users while maintaining the correct order of content delivery.

You can enable high throughput for FIFO queues by chossing **Enable high throughput FIFO** option while creating/editing a FIFO queue:
- This will change the related options: **deduplication scope** and **FIFO throughput limit**

## Integrations with other AWS service

### Incompatible AWS Services

FIFO queues are not supported as a destination for these AWS features:

- [Amazon S3 Event Notifications](https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html)
- [Auto Scaling Lifecycle Hooks](https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html)
- [AWS IoT Rule Actions](https://docs.aws.amazon.com/iot/latest/developerguide/iot-rule-actions.html)
- [AWS Lambda Dead-Letter Queues](https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html#invocation-dlq)


### Lambda concurrency behavior

Behavior of Lambda functions when processing messages from an Amazon SQS FIFO queue:
- **Single instance per message group**. Only one Lambda instance will be processing messages from a specific message group ID. This ensures that messages within the same group are processed in order
- **Concurrent processing of different groups**. Lambda will use multiple instances to concurrently process messages from different message group IDs, one instance per group.
