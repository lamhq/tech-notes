# Amazon Simple Queue Service (Amazon SQS)

## Overview

Amazon SQS is a fully managed, message queuing service that you can use to decouple and scale microservices, distributed systems, and serverless applications.

Using Amazon SQS, you can send, store, and receive messages between software components, without losing messages or requiring other services to be available.

One resource will write a message to an SQS queue, and then another resource will retrieve that message from SQS.

SQS doesn't offer real-time.

![](./images/amazon-sqs.png)


## Available Settings

- **Delivery delay**: The amount of time a message is deplayed before beingadded to the queue. Default is 0, can set up to 15 minutes.
- **Message size**: The maximum message size for the queue. Can be up to 256KB of text.
- **Encryption**: Messages are encrypted in transit by default. Can enable "at-rest" too.
- **Message retention**: The amount of time that Amazon SQS retains messages that remain in the queue. Default is 4 days, value from 1 minute to 14 days.
- **Visibility timeout**: The length of time that a message received from a queue (by one consumer) won’t be visible to the other message consumers. If the consumer fails to process the message within the visibility timeout period, the message will reappear in the queue and become available for other consumers to receive and process.
- **Receive message wait time**: The maximum amount of time that Amazon SQS waits for messages to become available after the queue gets a receive request.
- **Enable content-based deduplication**: Amazon SQS can automatically create deduplication IDs based on the body of the message.
- **Enable high throughput FIFO**: This feature enables high throughput for messages in the queue. Choosing this option changes the related options (deduplication scope and FIFO throughput limit) to the required settings for enabling high throughput for FIFO queues.
- **Redrive allow policy**: This policy defines which source queues can use this queue as the dead-letter queue.


## Short polling vs Long polling

### Short polling

When you consume messages from a queue by using short polling, Amazon SQS samples a subset of its servers and returns messages from only those servers.

If you keep consuming from your queues, Amazon SQS samples all of its servers, and you receive all of your messages.

> The following diagram shows the short-polling behavior of messages returned from a standard queue after one of your system components makes a receive request. Amazon SQS returns messages A, C, D, and B from these servers. Message E isn't returned for this request, but it's returned for a subsequent request.

![](./images/short-polling.png)


### Long polling

When the wait time for the `ReceiveMessage` API action is greater than 0, long polling is in effect (maximum 20 seconds).

Long polling helps reduce the cost of using Amazon SQS by reducing the number of empty responses and false empty responses.

Long polling offers the following benefits:

- Reduces empty responses by letting Amazon SQS wait until a message is available in a queue before it sends a response (In rare cases, you might receive empty responses even when a queue still contains messages, especially if you specify a low value for the `ReceiveMessageWaitTimeSeconds` parameter).
- Reduces false empty responses by querying all—instead of a subset of—Amazon SQS servers.
- Returns messages as soon as they become available.


## Standard vs FIFO queue

### Standard queues

- Messages could be received out of order in your application
- You can receive duplicate messages (visibility timeout is too low or delete API is not called).
- Nearly unlimited transactions per second.

### FIFO queues

- Guaranteed ordering. Message group ID helps ensures process order is one by one in a strict order, based on the group.
- No message duplication. Messages matching deduplication IDs are not delivered during a deduplication interval.
- 300 transactions per second (batching can achieve up to 3000).
- You can enable **FIFO high throughput**, allow to process up to 9000 transactions per second, per API without batching, 90000 per second with batching.
- Do not have the same level of performance as standard queues 
- More expensive.

## Dead-Letter Queues

Amazon SQS Dead-letter queues (DLQ) are targets for messages that cannot be processed successfully. These are technically just other SQS queues.

Works with SQS and SNS.

Useful for debugging applications and messaging systems.

Ability to isolate unconsumed messages to troubleshoot.

**Redrive capability** allows you to move the message back into the source queue!

You can use DLQs with FIFO SQS queues, but it must ALSO be FIFO queues.

### Benefits

DLQs can be used to configure alarms based on message availability counts. Once a message is sent to DLQs, you can trigger alarms to notify operation teams.

It allows you to quickly identify which logs to investigate for exceptions.

Analyze the SQS message contents for any errors.

Troubleshoot consumer permissions.

### Tips

Make sure you set up an alarm and alert on queue depth.


## SQS and Kinesis

Both services can be queues.

SQS is easier and simpler.

Kinesis is faster (real-time) and can store data for up to a year.