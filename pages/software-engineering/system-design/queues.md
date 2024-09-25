# Queues

## Overview

A queue is a sophisticated software that is used to deliver messages asynchronously.

Input services, called producers/publishers, create messages and publish them to a message queue. 

Consumers/subscribers connect to the queue, pull the messages, and perform actions defined by the messages.

![](https://www.cloudamqp.com/img/blog/thumb-mq.jpg)

Pros:
- Improve scalability and reliability of system
- Enable asynchronous processing, allowing tasks to be queued up and processed later
- Decoupling Components: different parts of a system can communicate without being directly connected.

Cons:
- Increase system complexity due to asynchronous communication has no returned response
- Increase latency


## Mesaging Paradigms

How messages can be delivered from producers to consumers.

### Message Queue

Messages are persisted in a queue.

One or more consumers can consume the messages in the queue.

A message can only be consumed by one consumer at a time.

Once a consumer reads a message in the queue, it disappears from that queue.

Useful for tasks that need to be processed sequentially or when the producer and consumer operate at different speeds.

Example: RabbitMQ, Amazon SQS.

![](https://www.tutorialspoint.com/apache_kafka/images/point_to_point_messaging_system.jpg)


### Publish/Subscribe (Pub/Sub)

Messages are published to a topic.

Consumers can subscribe to one or more topic and consume all the messages in that topic.

Ideal for broadcasting messages to multiple consumers who are interested in specific topics.

Example: Apache Kafka, AWS SNS.


## Message Queue Example

### Background Tasks

Consider the following use case: your application supports photo customization, including cropping, sharpening, blurring, etc. Those customization tasks take time to complete.

The web servers publish photo processing jobs to the message queue.

Photo processing workers pick up jobs from the message queue and asynchronously perform photo customization tasks.

The producer and the consumer can be scaled independently:
- When the size of the queue becomes large, more workers are added to reduce the processing time.
- if the queue is empty most of the time, the number of workers can be reduced.

![](./queues/queue.drawio.svg)


### Prevent Data Races

Imagine you have an e-commerce application where multiple users can place orders simultaneously. Each order updates the inventory count of a product. If two threads try to update the inventory at the same time, a data race can occur.

**Without Message Queue:**
1. **Thread A** reads the current inventory (10 units).
2. **Thread B** reads the current inventory (10 units).
3. **Thread A** updates the inventory to 9 units.
4. **Thread B** updates the inventory to 9 units (incorrectly, as it should be 8).

**With Message Queue:**
1. Each order request is placed into a message queue.
2. A single worker thread processes each message sequentially.
3. **Worker Thread** reads the current inventory (10 units).
4. **Worker Thread** updates the inventory to 9 units.
5. **Worker Thread** reads the next message and updates the inventory to 8 units.

By using a message queue, you ensure that only one thread processes each order at a time, eliminating the possibility of a data race and ensuring consistent updates to the inventory.
