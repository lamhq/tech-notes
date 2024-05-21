# Amazon Kinesis Data Firehose

## Overview

Kinesis Data Firehose can **capture, transform, and load streaming data to a destination**.

It can batch (buffer), compress, transform, encrypt data before before delivering it to destination.

It's **push-based**. Data is immediately loaded into a destination.

It automatically scales based on the data throughput and requires minimal ongoing administration.

Firehose synchronously replicates data across three AZs as it is transported to destinations.

Each delivery stream stores data records for up to **24 hours**.

The maximum size of a record (before Base64-encoding) is **1 MB**.

Uses Lambda functions to perform the data transformation, support custom transformations.

Data can optionally be backed up to S3 bucket.


## Destinations

Supported destinations:
- Amazon S3
- Amazon Redshift
- Amazon Elasticsearch Service
- Generic HTTP endpoints
- Service providers like Datadog, New Relic, MongoDB, and Splunk.

For **Amazon Redshift destinations**, streaming data is delivered to your S3 bucket first. Kinesis Data Firehose then issues an Amazon Redshift COPY command to load data from your S3 bucket to your Amazon Redshift cluster. If data transformation is enabled, you can optionally back up source data to another Amazon S3 bucket:

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-kinesis-data-firehose-redshift-destination.jpeg)


## Encryption

Can encrypt data with an existing AWS Key Management Service (KMS) key.

Server-side-encryption can be used if Kinesis Streams is used as the data source.


## Kinesis Data Firehose vs. Amazon Kinesis Data Streams

- Easier to operate
- Has higher latency from the moment that data is ingested (near real-time, within 1 minute)
- Has limited supported third party endpoints
- Does not use a producer-consumer model, you must specify one or more destinations for the data.
- Kinesis Data Streams can be used as the source(s) to Kinesis Data Firehose.
