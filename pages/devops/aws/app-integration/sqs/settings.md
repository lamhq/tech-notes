# Available Settings

## Visibility timeout

When a consumer reads a message from the queue, that message is marked as hidden for a period of time (called **visibility timeout**) so that other consumers won't receive and process it.

This ensures that only one consumer processes the message at a time.

> If the consumer doesn't remove the message within the visibility timeout period, the message will reappear in the queue and become available for other consumers to receive and process. This could result in the same message being delivered twice.

The default value is 30 seconds, max 12 hours.


## Delivery delay

The amount of time a message is delayed before being added to the queue.

Up to 900 seconds (15 minutes), default is 0.

Changing this setting for standard queues doesn't affect the delay of messages already in the queue, only new messages. For FIFO queues, this affects the delay of messages already in the queue.

Use cases: Large distributed applications which may need to introduce a delay in processing.


## Message size
 
The maximum message size for the queue. Up to **256KB** of text.


## Encryption

Messages are encrypted in transit by default. Can enable "at-rest" too.


## Message retention

The amount of time messages remain in the queue. From 1 minute to 14 days, default is **4 days**.


## Receive message wait time

The maximum wait time for messages to become available after the queue gets a receive request.


## Content-based deduplication (FIFO queue)

When enabled, Amazon SQS can automatically create deduplication IDs based on the body of the message.


## Enable high throughput FIFO (FIFO queue)

This feature enables high throughput for messages in the queue. 

Choosing this option changes the related options (deduplication scope and FIFO throughput limit) to the required settings for enabling high throughput for FIFO queues.


## Redrive allow policy

This policy defines which source queues can use this queue as the dead-letter queue.


## Access policy

Defines the accounts, users, and roles that can access the queue (send, receive, delete messages).