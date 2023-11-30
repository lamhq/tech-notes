# Amazon Kinesis Services

Kinesis helps ingest, process, and analyze **real-time streaming data**.

With Amazon Kinesis, you can can ingest various types of real-time data such as video, audio, logs, clickstreams, and IoT telemetry data for machine learning, analytics, and other applications.

Amazon Kinesis enables processing and analysis of data as it arrives, allowing for quick response instead of waiting for all data to be collected.


## Amazon Kinesis Data Streams

Amazon Kinesis Data Streams is a **real-time** data streaming service for ingesting data.

It can capture gigabytes of data per second from hundreds of thousands of sources: website clickstreams, database event streams, financial transactions, social media feeds, IT logs, and location-tracking events.

The collected data is available in milliseconds.

You're responsible for creating the consumer and scaling the stream. It's a bit complicated to configure.
 

## Amazon Kinesis Data Firehose

Amazon Kinesis Data Firehose is data transfer tool to get information to data lakes, data stores, and analytics services reliably.

It supports various destinations including Amazon S3, Amazon Redshift, Amazon Elasticsearch Service, generic HTTP endpoints, and service providers like Datadog, New Relic, MongoDB, and Splunk.

It automatically scales based on the data throughput and requires minimal ongoing administration.

It can batch, compress, transform, and encrypt data streams before loading, optimizing storage usage and increasing security.

Compared to Amazon Kinesis Data Streams, Kinesis Data Firehose is easier to operate, but has higher latency from the moment that data is ingested (within 1 minute). Data Firehose has limited supported third party endpoints.


## Amazon Kinesis Data Analytics

Kinesis Data Stream or Firehose, it's not really going to process information as it goes through. We can use **Kinesis Data Analytics** paired with Firehose or Data Stream, to process our information using standard **SQL**.

Amazon Kinesis Data Analytics allows real-time transformation and analysis of streaming data using Apache Flink (Apache Flink is an open-source framework and engine for processing data streams).

**Easy**. It's very simple to tie Data Analytics into your Kinesis pipeline. It's directly supported by Data Firehose and Data Streams.

**No Servers**. This is a fully managed, real-time serverless service. It will automatically handle scaling and provisioning of needed resources.

**Cost**. You only pay for the amount of resources you consume as your data passes through.


## Amazon Kinesis Video Streams

Amazon Kinesis Video Streams allows secure streaming of video from connected devices to AWS for various purposes like analytics, machine learning, playback, etc.

The service automatically provisions and scales the infrastructure required to ingest streaming video data from millions of devices.

Kinesis Video Streams stores, encrypts, and indexes video data in streams, and provides access through APIs. It supports playback of both live and on-demand video viewing.

You can also use it to quickly build applications that take advantage of computer vision and video analytics through integration with Amazon Rekognition Video and libraries for ML frameworks (such as Apache MXNet, TensorFlow, and OpenCV)

Kinesis Video Streams also supports WebRTC, allowing real-time media streaming and interaction between web browsers, mobile apps, and connected devices. WebRTC is commonly used for activities like video chat and peer-to-peer media streaming.
