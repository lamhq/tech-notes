# Placement Group

## Overview

Placement Group is a **logical grouping of EC2 instances**.

You can't merge placement groups.

Instance must be in stopped state to be moved to a placement group.

You can move or remove instance using AWS CLI or AWS SDK (not the console yet).

Only certain instance types can be launched into a placement group (compute optimized, GPU, memory optimized, storage optimized).

An instance can be launched in one placement group at a time; it cannot span multiple placement groups.

The capacity reservation can be used by instances in a placement group. However, it is not possible to explicitly reserve capacity for a placement group.


## Cluster Placement Groups

Instances are placed into a low-latency group within a single AZ.

Pros: Get the most out of enhanced networking Instances.

Cons: Finite capacity: recommend launching all you might need up front.

For low network latency, high network throughput.


## Spread Placement Groups

Instances are spread across underlying hardware.

Launching instances in a spread placement group reduces the risk of simultaneous failures that might occur when instances share the same underlying hardware.

Pros: Can span multiple AZs. High Availability.

Cons: Maximum of 7 instances running per group, per AZ.

For small number of critical instances that should be kept separate from each other (e.g. primary database and secondary database).


## Partition Placement Groups

Instances are grouped into logical segments called partitions which use distinct hardware.

Each partition within a placement group has its own set of racks. Each rack has its own network and power source. No two partitions within a placement group share the same racks, allowing you to isolate the impact of hardware failure within your application.

Strikes a balance between high performance and high availability.

Pros: Reduces likelihood of correlated failures for large workloads.

Cons: Partition placement groups are not supported for Dedicated Hosts.

Suitable for large distributed and replicated workloads. Applications like Hadoop, HDFS, HBase, Cassandra, Kafka.
