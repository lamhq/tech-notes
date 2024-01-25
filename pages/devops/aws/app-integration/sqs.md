# Amazon Simple Queue Service (Amazon SQS)

## Overview

Amazon SQS is a fully managed, **message queuing service** that you can use to decouple and scale microservices, distributed systems, and serverless applications.

SQS enables you to send, store, and receive messages between software components.

SQS is pull-based (Amazon SNS is push-based). One resource will write a message to an SQS queue, and then other resources will poll the queue to retrieve messages.

SQS doesn't offer real-time.

Data are stored redundantly in multiple AZs within a region.


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
