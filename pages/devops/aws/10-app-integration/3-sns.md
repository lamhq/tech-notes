# Amazon Simple Notification Service (Amazon SNS)

## Overview

SNS is a **push-based messaging service** (any messages sent by a producer and arrives at a SNS Topic will immediately be sent to all consumers).

It proactively delivers messages to the endpoints that subcribed to it.

One message to many receivers.

![](https://docs.aws.amazon.com/images/sns/latest/dg/images/sns-delivery-protocols.png)


## Use cases

Can be used to **alert** a system or a person.

Recommended for applications that need to react to high throughput or low-latency messages.

Offers nearly unlimited throughput, ideal for scenarios with high message volumes.

Can be used for applications requiring high fan-out (sending messages to thousands or millions of endpoints0.


## Features

- **Subscribers**. They can be: Kinesis Data Firehose, SQS, Lambda, email, HTTP(s), mobile push notifications, SMS.
- **Message size**. Can be up to **256 KB**.
- **DLQ Support**. Messages that fail to delivered can be stored in an SQS DLQ.
- **Support FIFO or Standard**. FIFO only support SQS FIFO queues as a subscriber.
- **Encryption**. Messages are encrypted in transit by default, can enable "at-rest" via AWS KMS.
- **Access Policies**. define who can publish/subcribe to a topic, useful for cross account access.
- **SNS Fanout**: Messages published to SNS topic are replicated to multiple endpoint subscriptions. Allow for fully decoupled parallel asynchronous processing
- **Large Message Payloads**: It's a SNS Extended Library allows for sending messages up to 2 GB in size. The payload is stored in Amazon S3, then SNS publishes a reference to the object.
- **Delivery policy**: You can use a delivery policy to define how Amazon SNS retries the delivery of messages when server-side errors occur. **Only HTTP/S supports custom policies**.
- **Message Filtering**: allow defining JSON policies to define which messages get sent to specific subscribers based on contents and attributes of messages.

![](./images/sns-filter-policy.png)


## Architectures for SNS Fanout

The Fanout scenario is when a message published to an SNS topic is replicated and pushed to multiple endpoints, such as Kinesis Data Firehose delivery streams, Amazon SQS queues, HTTP(S) endpoints, and Lambda functions. This allows for parallel asynchronous processing.

For example, you can develop an application that publishes a message to an SNS topic whenever an order is placed for a product.

Then, SQS queues that are subscribed to the SNS topic receive identical notifications for the new order.

An EC2 instance attached to one of the SQS queues can handle the processing or fulfillment of the order. And you can attach another EC2 instance to a data warehouse for analysis of all orders received.

![](https://docs.aws.amazon.com/images/sns/latest/dg/images/sns-fanout.png)
