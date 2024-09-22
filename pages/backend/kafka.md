# Apacha Kafka

## Overview

Apache Kafka is a distributed publish-subscribe messaging system and a robust queue.

It can handle a high volume of data and enables you to pass messages from one end-point to another.

Kafka is very fast and guarantees zero downtime and zero data loss.

Kafka messages are persisted on the disk and replicated within the cluster to prevent data loss.


## Advantages

**Reliability**. Kafka is distributed, partitioned, replicated and fault tolerance.

**Scalability**. Kafka messaging system scales easily without down time..

**Durability**. Kafka uses Distributed commit log which means messages persists on disk as fast as possible, hence it is durable..

**Performance**. Kafka has high throughput for both publishing and subscribing messages. It maintains stable performance even many TB of messages are stored.


## Use Cases

**Monitoring**. Kafka can aggregate statistics from distributed applications, creating centralized feeds of operational data

**Log Aggregation**. Kafka can collect logs from multiple services and make them available in a standard format to multiple con-sumers.

**Stream Processing**. Kafka can stream data to analytics platforms, enabling real-time insights and dashboards.

**Event Sourcing**. Kafka can capture and store events from various systems, providing a reliable source of truth for monitoring and auditing purposes.


![](https://dezyre.gumlet.io/images/blog/apache-kafka-architecture-/apache_kafka_architecture.webp?w=720&dpr=2.0)


## Brokers

A **broker** is a server that handles the storage, management, and retrieval of data.

It receives data from producers, stores it, and serves it to consumers.

Data is replicated across multiple brokers to ensure high availability and fault tolerance.


## Cluster

A **cluster** is a group of brokers working together to manage and distribute data.

One broker acts as the controller to handle administrative tasks, while others manage data storage and retrieval.


## Events

Events are produced by producers and consumed by consumers.

An **event** (or message) consists of a key, a value, and metadata including a timestamp. 


## Topics

Topics are essentially logs of events, where each event is immutable and appended to the end of the log.

For example, a topic could be used to store temperature readings from sensors.


## Partitions

A **partition** is a division of a topic.

Each partition is an ordered, immutable sequence of events that is continually appended to a structured commit log.

Each partition within a cluster has a leader broker for handling requests and follower brokers for replication.

Each partition is fully stored on a single broker and is also replicated to other brokers.


## Producers

A **producer** is a client application that publishes events to a topics.

Producers send data to the appropriate partition within a topic based on the event key, ensuring that events with the same key are sent to the same partition.


## Consumer Groups

A **consumer group** is a group of consumers that work together to consume events from one or more topics.

Each partition in a topic is consumed by exactly one consumer in the group, which allows for load balancing and fault tolerance.


## Consumer Offsets

A **consumer offset** is a marker that indicates the position of the last event consumed by a consumer in a partition.

Kafka tracks offsets to ensure that consumers can resume from where they left off in case of a failure or restart.
