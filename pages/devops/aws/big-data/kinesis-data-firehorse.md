# Amazon Kinesis Data Firehose

## Overview

Kinesis Data Firehose can ingest streaming data and **transform** it before sending it to a **destination**.

**Supported destinations**: Amazon S3, Amazon Redshift, Amazon Elasticsearch Service, generic HTTP endpoints, and service providers like Datadog, New Relic, MongoDB, and Splunk.

Kinesis Data Firehose uses Lambda functions to perform the data transformation, enable custom transformations.

It can batch (buffer), compress, transform, encrypt data before before delivering it to destination.

It can send a copy of your original data to an S3 bucket for safekeeping.

It automatically scales based on the data throughput and requires minimal ongoing administration.


## Kinesis Data Firehose vs. Amazon Kinesis Data Streams

- Easier to operate
- Has higher latency from the moment that data is ingested (near real-time, within 1 minute)
- Has limited supported third party endpoints
- Does not use a producer-consumer model, you must specify one or more destinations for the data.
