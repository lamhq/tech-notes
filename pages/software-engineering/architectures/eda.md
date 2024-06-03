# Event-Driven Architectures

## Overview

Event-Driven Architectures use asynchronous communication. This leads to loosely coupled components.


## Components

- Event: An immutable notification of a change in state, such as `OrderPlaced` or `UserRegistered`
- Event Producer: Component that creates and publishes events; it shouldn't have knowledge of downstream consumers of the events
- Event Consumer: Component that consumes and processes based on events
- Event Broker: Accepts events and either pushes to (or is pulled from by) consumers


## Patterns

There are several event-driven architecture patterns:
- Event notification: it's a notification that something has occurred
- Event-carried state transfer: similar to Event Notification but also contains the state
- Event sourcing: when every single change of state  is a submitted event such that the events make up the state of the whole system
- Command and Query Responsibility Segregation (CQRS): a pattern to segregate reading and writing. The informational events are segregated from the actual commands to make changes


## Communication types

### Pub/Sub

Allows a producer to publish to specific topics without a notion of what is subscribed.

Consumers can subscribe to that particular event topic.

Amazon SNS is the AWS-managed service for this.


### Point-to-point

When a producer will send a message for a particular consumer, it might push the event to a queue.

The consumer can then pull from that queue.


### Streaming

Similar to a queue system.

Data is continuously pushed to a stream and consumers need to pull that data.


## Choreographed vs. orchestration

**Choreography** is when the events flow through different services in a system without a higher level of control.

For example, an `OrderPlaced` event then causes
an `OrderPicked` and packed event,
which itself causes an `OrderShipped` event.

Orchestration is when there is a central system
controlling the interactions.

You may design a single order orchestrator that calls each service in the right order and ensures each action is taken as appropriate.


## Pitfalls

### Duplicated Events

In an event-driven system, events can be delivered to consumers at least once.

Events needs to be handled using the concept of idempotency.

Idempotency is a concept that ensures that performing the same operation multiple times has the same effect as performing it once.

For example, if an order processing service receives an order creation event twice, it should create the order only once (even if the event is duplicated).

### Variable Latency

Latency varies between services and over time.

This is a side effect of distributed systems and asynchronous workflows.

### Eventual Consistency

There isn't a centralized atomic database

Data is eventually consistent when it's asynchronously processed and stored.


## Use Cases

- Microservices
- E-commerce systems
- Real-time monitoring
- Social networks
- Supply chain management
- Infrastructure automation
