# Amazon SQS

## Version

This document was updated in 2024.


## Overview

Amazon SQS (Amazon Simple Queue Service) is a fully managed **message queuing service** that lets you integrate and decouple distributed software systems and components.

SQS enables you to send, store, and receive messages between software components.

SQS is **pull-based** (one resource will write a message to an SQS queue, and then other resources will poll the queue to retrieve messages). Amazon SNS is push-based.

SQS scales transparently to handle any load increases or spikes without any provisioning instructions.

High availability. Data are stored redundantly in multiple AZs within a region.

SQS doesn't offer real-time.


## Concepts

- Producers: components that send messages to the queue
- Consumers: components that receive messages from the queue.
- Queue: the queue which holds messages

### Queue

When you create a new queue, you must specify a queue name unique for your AWS account and region

Each queue is assigned an unique URL that is used to perform actions.

### Message

Message ID: each message has a message ID that Amazon SQS returns to you in the SendMessage response. It is useful for identifying messages.

### Message states

A message has three basic states:

- Sent to a queue by a producer.
- Received from the queue by a consumer.
- Deleted from the queue.
- Stored: message is sent to a queue but not yet received. No quota for the number of stored messages.
- In flight: message is received but not yet deleted from the queue. Max 120,000 messages for standard queues, 20,000 for FIFO queues.

### Receipt handle

Every time you receive a message from a queue, you receive an unique receipt handle (for that action).

To delete the message or to change the message visibility, you must provide the receipt handle (not the message ID).


## Message lifecycle

The lifecycle of a message, from creation to deletion:

![](https://docs.aws.amazon.com/images/AWSSimpleQueueService/latest/SQSDeveloperGuide/images/sqs-message-lifecycle-diagram.png)

1. A producer (component 1) sends message A to a queue
2. When a consumer (component 2) consumes messages from the queue, and message A is returned.
3. While processing, message A remains in the queue and isn't returned to receive requests during the visibility timeout.
4. The consumer (component 2) deletes message A from the queue to prevent it from being received and processed again (after the visibility timeout expires).


## SQS vs. SNS vs. Kinesis vs. MQ

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

MQ:
- For migrating from traditional message brokers
- Support standard messaging protocols like AMQP, MQTT, OpenWire, STOMP


## SQS with Lambda

You can use a Lambda function to process messages in a SQS queue.

Lambda event source mappings support standard queues and FIFO queues.

Lambda polls the queue and invokes your Lambda function synchronously with an event that contains queue messages.

Lambda reads messages in batches and invokes your function once for each batch.

When your function successfully processes a batch, Lambda deletes its messages from the queue.