# Amazon Kinesis Services

Amazon Kinesis Family helps collect, process, and analyze real-time streaming data. you can get timely insights and react quickly to new information.

Amazon Kinesis offers cost-effective processing of streaming data at any scale.

With Amazon Kinesis, you can can ingest various types of real-time data such as video, audio, logs, clickstreams, and IoT telemetry data for machine learning, analytics, and other applications.

Amazon Kinesis enables processing and analysis of data as it arrives, allowing for quick response instead of waiting for all data to be collected.


## Amazon Kinesis Data Streams

Amazon Kinesis Data Streams is a massively scalable and durable real-time data streaming service.

It can capture gigabytes of data per second from hundreds of thousands of sources: website clickstreams, database event streams, financial transactions, social media feeds, IT logs, and location-tracking events.

The collected data is available in milliseconds.

Kinesis Data Streams is used for real-time analytics, such as real-time dashboards, anomaly detection, dynamic pricing, and more.


## Amazon Kinesis Data Firehose

Amazon Kinesis Data Firehose is designed to load streaming data into data lakes, data stores, and analytics services reliably.

It supports various destinations including Amazon S3, Amazon Redshift, Amazon Elasticsearch Service, generic HTTP endpoints, and service providers like Datadog, New Relic, MongoDB, and Splunk.

It is a fully managed service that automatically scales based on the data throughput and requires minimal ongoing administration.

It can batch, compress, transform, and encrypt data streams before loading, optimizing storage usage and increasing security.

Compared to Amazon Kinesis Data Streams, Kinesis Data Firehose is easier to operate, but has higher latency from the moment that data is ingested.

The batch interval can be set to receive new data within a specific time frame (e.g., 60 seconds).


## Amazon Kinesis Data Analytics

Amazon Kinesis Data Analytics allows real-time transformation and analysis of streaming data using Apache Flink.

Apache Flink is an open-source framework and engine for processing data streams.

Amazon Kinesis Data Analytics simplifies the process of building, managing, and integrating Apache Flink applications with other AWS services.

It handles all the necessary requirements for running streaming applications continuously. The service automatically scales to handle the volume and throughput of incoming data.

There are no servers to manage, no minimum fee or setup cost. Users only pay for the resources consumed by their streaming applications.


## Amazon Kinesis Video Streams

Amazon Kinesis Video Streams allows secure streaming of video from connected devices to AWS for various purposes like analytics, machine learning, playback, etc.

The service automatically provisions and scales the infrastructure required to ingest streaming video data from millions of devices.

Kinesis Video Streams stores, encrypts, and indexes video data in streams, and provides access through APIs. It supports playback of both live and on-demand video viewing.

You can also use it to quickly build applications that take advantage of computer vision and video analytics through integration with Amazon Rekognition Video and libraries for ML frameworks (such as Apache MXNet, TensorFlow, and OpenCV)

Kinesis Video Streams also supports WebRTC, allowing real-time media streaming and interaction between web browsers, mobile apps, and connected devices. WebRTC is commonly used for activities like video chat and peer-to-peer media streaming.
