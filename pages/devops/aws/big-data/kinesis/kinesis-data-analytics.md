
# Amazon Kinesis Data Analytics

## Overview

Amazon Kinesis Data Analytics is the easiest way to **process and analyze real-time, streaming data**.

Can use **standard SQL** queries to process streaming data.

Provides **real-time data transformation and analysis** using **Apache Flink** (an open-source framework and engine for processing data streams).

Support destinations:
- S3
- RedShift
- Elasticsearch
- Kinesis Data Streams

Can configure destinations to persist the results.

Only pay for the amount of resources you consume as your data passes through.

IAM can be used to provide Kinesis Analytics with permissions to read records from sources and write to destinations.

Use cases:
- Generate time-series analytics.
- Feed real-time dashboards.
- Create real-time alerts and notifications.


## Components

A Kinesis Data Analytics application consists of three components:
- Input – the streaming source for your application.
- Application code – a series of SQL statements that process input and produce output.
- Output – one or more in-application streams to hold intermediate results.


## Data sources

Can ingest data from Kinesis Streams and Kinesis Firehose.

Supports two types of inputs: streaming data sources and reference data sources:

- A streaming data source is continuously generated data that is read into your application for processing.
- A reference data source is static data that your application uses to enrich data coming in from streaming sources.
