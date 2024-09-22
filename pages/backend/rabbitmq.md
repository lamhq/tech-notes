# RabbitMQ

## Overview

RabbitMQ is an open-source message broker that facilitates communication between different parts of an application by sending and receiving messages

RabbitMQ is based on AMQP protocol.

Use cases:
- best used as message queue
- can also function as pub/sub
- schedule heavy tasks in background
- distribute load between multiple servers
- distributed systems: allow different components can work together seamlessly


## Routing Keys

Each message has a key that represents the address of the destination queue.

You can use semicolons `;` in routing keys to create namespaces.


## Exchange

Exchange is a router that receives messages from producers and put them in the corrrect queues based on specific rules.

![](https://www.rabbitmq.com/assets/images/hello-world-example-routing-cbe9a872b37956a4072a5e13f9d76e7b.png)

Types of Exchanges:

### Direct Exchange

Routes messages to queues based on an exact match between the routing key and the queue binding key. If there are multiple consumers, each message is delivered to a single consume.

![](https://www.tutlane.com/images/rabbitmq/rabbitmq_direct_exchange_process_flow_diagram.PNG)


### Topic Exchange

Routes messages to queues based on pattern matching between the routing key and the queue binding key.

![](https://www.tutlane.com/images/rabbitmq/rabbitmq_topic_exchange_process_flow_diagram.PNG)


### Fanout Exchange

Broadcasts messages to all queues bound to it, ignoring routing keys.

![](https://www.tutlane.com/images/rabbitmq/rabbitmq_fanout_exchange_process_flow_diagram.PNG)


### Headers Exchange

Uses message header attributes for routing instead of routing keys.

![](https://www.tutlane.com/images/rabbitmq/rabbitmq_headers_exchange_process_flow_diagram.PNG)


## Channels

Consumers use TCP connections to connect to queues.

Channels are virtual connections inside a single TCP connection. They allow multiple logical connections to share a single physical connection, which helps in efficient resource usage.

Commonly, a new channel is opened per thread or process in applications that use multiple threads/processes.

Channels allow multiple consumers to read from the same queue concurrently, improving the throughput and performance of your messaging system.


## Acknowledgements

Acknowledgements are mechanisms used to confirm that a message has been successfully received and processed by a consumer, allowing RabbitMQ to safely delete the message from the queue.

Acknowledgements ensure messages are never lost, provide reliability.


### Manual Acknowledgements

The consumer explicitly sends an acknowledgement after processing the message.
 
This provides more control and ensures that messages are only acknowledged once they are fully processed.

### Automatic Acknowledgements

An acknowledgement is sent automatically as soon as the message is delivered to the consumer.

This is simpler but can lead to message loss if the consumer crashes before processing the message.
