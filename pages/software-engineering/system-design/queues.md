# Queues

## Overview

A queue is a sophisticated software that is used to deliver messages asynchronously.

Input services, called producers/publishers, create messages and publish them to a message queue. 

Consumers/subscribers connect to the queue, pull the messages, and perform actions defined by the messages.

![](https://www.cloudamqp.com/img/blog/thumb-mq.jpg)

Pros:
- Improve scalability and reliability of system
- Queues enable asynchronous processing, allowing tasks to be queued up and processed later
- Decoupling Components: different parts of a system can communicate without being directly connected.

Cons:
- Increase system complexity due to asynchronous communication has no returned response
- Increase latency


## Example

Consider the following use case: your application supports photo customization, including cropping, sharpening, blurring, etc. Those customization tasks take time to complete.

The web servers publish photo processing jobs to the message queue.

Photo processing workers pick up jobs from the message queue and asynchronously perform photo customization tasks.

The producer and the consumer can be scaled independently:
- When the size of the queue becomes large, more workers are added to reduce the processing time.
- if the queue is empty most of the time, the number of workers can be reduced.

![](./queues/queue.drawio.svg)


## Mesaging Paradigms

How messages can be delivered from producers to consumers using queues.

### Message Queue

Messages are stored in a queue and processed in a first-in, first-out (FIFO) order.

A message is delivered exactly once.

Messages can arrive out of order.

Useful for tasks that need to be processed sequentially or when the producer and consumer operate at different speeds.

Example: RabbitMQ, Amazon SQS.


### Publish/Subscribe (Pub/Sub)

Messages are published to a topic and multiple subscribers can receive the messages.

Ensure at least once delivery.

Messages are always arrive in order.

Ideal for broadcasting messages to multiple consumers who are interested in specific topics.

Example: Apache Kafka, AWS SNS.
