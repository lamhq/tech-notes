# Amazon Kinesis Services

## Overview

Kinesis helps ingest, process, and analyze **real-time streaming data**.

You can can ingest various types of real-time data (video, audio, logs, clickstreams, IoT telemetry data) for machine learning, analytics, and other applications.

Enables processing and analysis of data as it arrives, allowing for quick response instead of waiting for all data to be collected.


## Amazon Kinesis Data Streams

Amazon Kinesis Data Streams is a **real-time data streaming service** for ingesting data.

Can capture gigabytes of data per second from hundreds of thousands of sources (website clickstreams, database event streams, financial transactions, social media feeds, IT logs, location-tracking events).

The collected data is available in milliseconds.

You're responsible for creating the consumer and scaling the stream (it's a bit complicated to configure).
 

## Amazon Kinesis Data Firehose

Amazon Kinesis Data Firehose is **data transfer tool** to get information to data lakes, data stores, and analytics services reliably.

Supports various destinations: Amazon S3, Amazon Redshift, Amazon Elasticsearch Service, generic HTTP endpoints, and service providers like Datadog, New Relic, MongoDB, and Splunk.

Automatically scales based on the data throughput and requires minimal ongoing administration.

Can batch, compress, transform, and encrypt data streams before loading, optimizing storage usage and increasing security.

Compared to Amazon Kinesis Data Streams, Kinesis Data Firehose:
- easier to operate
- has higher latency from the moment that data is ingested (near real-time, within 1 minute)
- has limited supported third party endpoints.


## Amazon Kinesis Data Analytics

We can use Kinesis Data Analytics to **process information using standard SQL** (Kinesis Data Stream and Firehose do not process information as it goes through).

Amazon Kinesis Data Analytics allows real-time transformation and analysis of streaming data using Apache Flink (Apache Flink is an open-source framework and engine for processing data streams).

**Easy**. It's very simple to tie Data Analytics into your Kinesis pipeline. It's directly supported by Data Firehose and Data Streams.

**No Servers**. This is a fully managed, real-time serverless service. It will automatically handle scaling and provisioning of needed resources.

**Cost**. You only pay for the amount of resources you consume as your data passes through.
