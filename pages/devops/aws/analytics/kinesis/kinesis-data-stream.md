# Amazon Kinesis Data Streams

## Overview

Amazon Kinesis Data Streams is a data pipeline enables you to **ingest, buffer, and process streaming big data in real-time**.

Kinesis can handle any amount of streaming data and process data from hundreds of thousands of sources with very low latencies.

Example sources:
- website clickstreams
- database event streams
- financial transactions
- social media feeds
- IT logs
- location-tracking events
- ...

It does not transform data.

It reliably **stores data** for later processing by applications (key difference with Firehose which delivers data directly to AWS services), maximum retention period is **7 days**.

It's **pull-based** (like Amazon SQS).

The collected data is available (to consumers) in milliseconds.

Multiple consumers can read from a stream concurrently (fan-out).

You're responsible for creating the consumer and scaling the stream (a bit complicated).

Kinesis Data Streams replicates synchronously across three AZs.

Producers can get data into a stream through:
- Kinesis Streams API.
- Kinesis Producer Library (KPL): send data directly from applications.
- Kinesis Agent: for streaming logs.

Use cases:
- Real-time metrics and reporting.
- Real-time data analytics.
- Complex stream processing.


## Shard and Stream

A shard is a sequence of data records in a Kinesis data stream.

Each shard supports up to 5 read transactions/sec, maximum data rate of 2 MB/sec.

For writes, you can push up to 1,000 records per second, with a data rate of 1 MB per second.

A stream is composed of one or more shards.

The total capacity of the stream is the sum of the capacities of its shards.


## Record and Data blob

A record is the unit of data stored in a Amazon Kinesis data stream.

Each record has a sequence number, a partition key, and a data blob.

Partition key is used to determine which shard a given data record belongs to.

Data records with the same partition key are processed in the order in which they were added to the stream.

A data blob is the data that producer adds to a data stream.

The maximum size of a data blob (before Base64-encoding) within one record is **1 MB**.


## Resharding

Kinesis Data Streams supports resharding, which lets you adjust the number of shards in your stream to adapt to changes in the rate of data flow through the stream.

There are two types of resharding operations:
- Shard split: you divide a single shard into two shards. Increases the data capacity of the stream. Increases the cost of your stream (you pay per-shard).
- Shard merge: combine two shards into a single shard. Decreases the data capacity—and cost—of the stream.


## Encryption

Kinesis Streams uses KMS master keys for encryption.

To read from or write to an encrypted stream the producer and consumer applications must have permission to access the master key.


## Scaling

The maximum throughput of a stream depends on the number of shards you configure. If you need more capacity, you can increase the number of shards.


## SQS vs. SNS vs. Kinesis

Check this [document](../../app-integration/sqs.md#sqs-vs-sns-vs-kinesis-vs-mq).


## Architecture

- Producers continually push data to Kinesis Data Streams.
- Consumers process the data in real time.
- Consumers can store their results using an AWS service such as Amazon DynamoDB, Amazon Redshift, or Amazon S3.
- Kinesis Streams applications are consumers that run on EC2 instances.
- Shards are uniquely identified groups or data records in a stream.
- Records are the data units stored in a Kinesis Stream.

![](https://digitalcloud.training/wp-content/uploads/2022/01/Kinesis-1.jpg)