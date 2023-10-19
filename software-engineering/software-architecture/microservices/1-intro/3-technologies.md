# Enabling Technology

When starting to use microservices, focus on identifying issues caused by the distributed system and finding technology that can help address them.

Understanding the tools available for microservices is crucial for successful implementation.


## Log Aggregation and Distributed Tracing

Implementing a log aggregation system is strongly recommended as a prerequisite for adopting microservices.

Log aggregation systems collect and aggregate logs from all services, providing a central place for analysis and alerting.

> **Humio** is mentioned as a recommended log aggregation tool, but simple logging services provided by public cloud vendors can also be used

Implementing **correlation IDs** can help isolate logs associated with a specific flow of service calls, making troubleshooting easier.

As the system grows in complexity, tools for exploring system behavior become essential, such as **analyzing traces** across multiple services and **detecting bottlenecks**.

> Open source tools like **Jaeger** focus on distributed tracing, while products like **Lightstep** and **Honeycomb** provide advanced capabilities for exploring the state of a running system.

![](images/logging.png)


## Containers and Kubernetes

Running each microservice instance in isolation is ideal to prevent issues in one microservice from affecting another.

Containers provide a lightweight way to provision isolated execution for service instances, resulting in faster spin-up times and cost-effectiveness.

Container orchestration platforms like **Kubernetes** help manage containers across multiple machines, distribute container instances, and improve robustness and throughput

Consider using a managed service on a public cloud provider to run the Kubernetes cluster instead of managing it yourself.


## Streaming

Microservices require ways to share data between them.

Products that allow for easy streaming and processing of large volumes of data have become popular in microservice architectures.

Apache Kafka is a popular choice for streaming data in a microservice environment, offering features like message permanence, compaction, and scalability.

Kafka has added stream-processing capabilities with KSQLDB and can be used with dedicated solutions like Apache Flink.

Debezium is an open source tool that helps stream data from existing datasources over Kafka, enabling traditional datasources to be part of a stream-based architecture.