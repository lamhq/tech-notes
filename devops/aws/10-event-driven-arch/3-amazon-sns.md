# Amazon Simple Notification Service (Amazon SNS)

Amazon SNS is a managed service that provides message delivery from publishers to subscribers.

Publishers communicate asynchronously with subscribers by sending messages to a topic, which is a logical access point and communication channel.

Clients can subscribe to the SNS topic and receive published messages by using a supported endpoint type, such as Amazon Kinesis Data Firehose, Amazon SQS, AWS Lambda, HTTP, email, mobile push notifications, and mobile text messages through Short Message Service (SMS).

It is possible for subscribers to subscribe to a single topic or to multiple topics.

![](amazon-sns.jpg)


## Use cases

Amazon SNS is recommended for applications that need to react to high throughput or low-latency messages.

It is suitable for handling messages published by other applications or microservices.

Amazon SNS offers nearly unlimited throughput, making it ideal for scenarios with high message volumes.

It can be used for applications requiring high fan-out, which means sending messages to thousands or millions of endpoints.

Messages in Amazon SNS can be unstructured and in any format, offering flexibility in data representation.

Amazon SNS supports forwarding messages to various types of targets, including AWS Lambda, Amazon SQS, HTTP/S endpoints, Short Message Service (SMS), mobile push, and email.

The typical latency for Amazon SNS is under 30 milliseconds, making it suitable for low-latency requirements.

Amazon SNS is a versatile and high-throughput messaging service suitable for various use cases, especially when you need to handle a large volume of messages quickly and efficiently.