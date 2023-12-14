# Placement Group

## Overview

Placement Group is a logical grouping of EC2 instances.

You can't merge placement groups.

Instance must be in stopped state to be moved to a placement group.

You can move or remove instance using AWS CLI or AWS SDK (not the console yet).

Only certain instance types can be launched into a placement group (compute optimized, GPU, memory optimized, storage optimized).


## Cluster Placement Groups

For low network latency, high network throughput.

Grouping of instances within a single Availability Zone.


## Spread Placement Groups

For critical instances that should be kept separate from each other.

Grouping of instances that are each placed on distinct underlying hardware.

Example: primary database and secondary database


## Partition Placement Groups

For Multiple EC2 instances, HDFS, HBase, Cassandra.

EC2 devides each group into logical segments called partitions.
Each partition placement group has its own set of racks. Each rack has its own network and power source. 

No two partitions within a placement group share the same racks, allowing you to isolate the impact of hardware failure within your application.