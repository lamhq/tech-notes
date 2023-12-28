# Amazon Kinesis Video Streams

## Overview

Kinesis Video Streams allows users to **stream media content** from a large number of devices (webcam, security cameras, smartphones) to AWS for analytics, machine learning, playback...

It elastically scales to ingest streaming media to millions of devices.

It stores, encrypts, and indexes media in your streams, allows you to access your media through APIs.

By default, Kinesis Video Streams will store a video stream for 24 hours, can be extended up to 7 days.

Supports HTTPS Live Streams (HLS) and Dynamic Adaptive Streaming Over HTTPS (DASH) for **video playback**.

Supports Web Real-Time Communication (WebRTC) for peer-to-peer **video conferencing**.


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
