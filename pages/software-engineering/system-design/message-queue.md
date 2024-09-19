# Message Queue

## Overview

A message queue is a durable component, stored in memory, that supports asynchronous communication.

Input services, called producers/publishers, create messages, and publish them to a message queue. 

Consumers/subscribers, connect to the queue, and perform actions defined by the messages.

![](https://www.cloudamqp.com/img/blog/thumb-mq.jpg)

Popular message queue implementations include RabbitMQ, Apache Kafka, and Amazon SQS


## Benefits

Message queues are a powerful tool for decoupling system components, especially in distributed and microservices architectures:
- **Asynchronous Communication**: Message queues allow different parts of a system to communicate asynchronously. The sender (producer) can send a message to the queue without waiting for the receiver (consumer) to process it immediately. This decouples the timing between the producer and consumer, allowing them to operate independently
- **Decoupling Components**: By using message queues, the producer does not need to know the details about the consumer. This separation allows each component to evolve independently
- **Scalability**: Message queues help manage load spikes by buffering messages. Producers can continue to send messages even if consumers are temporarily overloaded. This ensures that the system remains responsive under high load conditions


## Example

Consider the following use case: your application supports photo customization, including cropping, sharpening, blurring, etc. Those customization tasks take time to complete.

The web servers publish photo processing jobs to the message queue.

Photo processing workers pick up jobs from the message queue and asynchronously perform photo customization tasks.

The producer and the consumer can be scaled independently:
- When the size of the queue becomes large, more workers are added to reduce the processing time.
- if the queue is empty most of the time, the number of workers can be reduced.

![](./message-queue/queue.drawio.svg)