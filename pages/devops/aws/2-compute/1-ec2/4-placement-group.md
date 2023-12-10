# Placement Group

- AWS recommends homogenous instances within cluster placement groups.
- You can't merge placement groups.
- You can move existing instances to a placement group. Instance must be in stopped state.
- You can move or remove instance using AWS CLI or AWS SDK (not the console yet).


## Cluster Placement Groups

Grouping of instances within a single Availability Zone.

Recommended for applications that need low network latency, high network throughput.

Only certain instance types can be launched into a cluster placement group.


## Spread Placement Groups

Grouping of instances that are each placed on distinct underlying hardware.

Recommended for applications that have a small number of critical instances that should be kept separate from each other.

Example: primary database and secondary database


## Partition Placement Groups

EC2 devides each group into logical segments called partitions.

Each partition placement group has its own set of racks. Each rack has its own network and power source. 

No two partitions within a placement group share the same racks, allowing you to isolate the impact of hardware failure within your application.

Use cases: Multiple EC2 instances, HDFS, HBase, Cassandra.