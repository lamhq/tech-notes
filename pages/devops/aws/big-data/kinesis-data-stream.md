# Amazon Kinesis Data Streams

## Overview

Amazon Kinesis Data Streams is a **data pipeline** that can aggregate, buffer, and reliably store data from producers until a consumer is ready to process it.

It's a **real-time data streaming** service. The collected data is available (for consumer to read) in milliseconds.

Kinesis Data Streams can capture gigabytes of data per second from thousands of sources: website clickstreams, database event streams, financial transactions, social media feeds, IT logs, location-tracking events...

Multiple consumers can read from a stream concurrently (fan-out).

You're responsible for creating the consumer and scaling the stream (it's a bit complicated to configure).


## Limitations

- Kinesis Data Streams **does not transform data**
- Maximum retention period is 7 days


## Ingest data

How you get data into a stream depends on the type of data and the source.

If you want to stream server or application logs, you can use the **Amazon Kinesis Agent**. 

You can integrate Kinesis into your applications using the Kinesis Producer Library (KPL) to send data directly from your application into a Kinesis stream.


## Scaling

The maximum throughput of a stream depends on the number of shards you configure. If you need more capacity, you can increase the number of shards.

Each shard supports up to five read transactions per second, with a maximum data rate of 2 MB per second.

For writes, you can push up to 1,000 records per second, with a data rate of 1 MB per second.