# Amazon Kinesis Video Streams

## Overview

Kinesis Video Streams allows users to **stream media content** from a large number of devices (webcam, security cameras, smartphones) to AWS for analytics, machine learning, playback...

It stores, encrypts, and indexes media in your streams, allows you to access your media through APIs.

It elastically scales to ingest streaming media to millions of devices.

Stores data for 24 hours by default, up to 7 days.

Stores data in shards – 5 transaction per second for reads, up to a max read rate of 2MB per second and 1000 records per second for writes up to a max of 1MB per second.

Can have multiple shards in a stream.

Supports HTTPS Live Streams (HLS) and Dynamic Adaptive Streaming Over HTTPS (DASH) for **video playback**.

Supports Web Real-Time Communication (WebRTC) for peer-to-peer **video conferencing**.

Supports encryption at rest with server-side encryption (KMS) with a customer master key.


## Use cases

- **Smart Home**. Think Amazon Ring. You can stream video content from your Ring devices to Kinesis Video Streams and then run analysis on the data.
- **Smart City**. Many cities have devices like CCTV cameras at traffic lights and junctions that can be monitored automatically using Kinesis Streams.
- **Industrial Automation**. You can use Kinesis Streams to ingest time-encoded data (e.g., LIDAR and RADAR signals and temperature sensors) and then provide industrial automation.


## Concepts

Kinesis Video Streams uses a producer-consumer model.

### Producer

The data source that feeds data into a Kinesis stream is called the producer.

Producer may send nonvideo data, such as audio, subtitles, or GPS coordinates as part of the Kinesis video stream.

### Consumer

The application that reads data from the stream is called a consumer. Data can be used for playback or processing.

Consumers may be:
- Video players
- Custom applications
- AWS services such as SageMaker or Rekognition Video.
