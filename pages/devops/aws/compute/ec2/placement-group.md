# Placement Group

## Overview

Placement Group is a **logical grouping of EC2 instances**.

You can't merge placement groups.

Instance must be in stopped state to be moved to a placement group.

You can move or remove instance using AWS CLI or AWS SDK (not the console yet).

Only certain instance types can be launched into a placement group (compute optimized, GPU, memory optimized, storage optimized).


## Cluster Placement Groups

Grouping of instances within a single Availability Zone.

For low network latency, high network throughput.


## Spread Placement Groups

Group of instances where each instance is placed on distinct hardware.

For critical instances that should be kept separate from each other (primary database and secondary database).

High Availability.


## Partition Placement Groups

Suitable for large distributed and replicated workloads. Applications like Hadoop, HDFS, HBase, Cassandra, Kafka.

A group contains a number of partitions. Each partition is assigned to a set of racks, each with its own power supply and networking. Instances are scattered across these partitions.

No two partitions within a placement group share the same racks, allowing you to isolate the impact of hardware failure within your application.

Strikes a balance between high performance and high availability.