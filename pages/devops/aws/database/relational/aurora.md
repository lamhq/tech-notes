# Amazon Aurora

## Overview

Amazon Aurora is a database engine of Amazon RDS that's compatible with **MySQL** and **PostgreSQL**.

Up to **5x** better performance than MySQL, **3x** better than PostgreSQL databases.

Storage start with **10 GB**. Auto scales in 10 GB increments to **128 TB**.

Compute resources can scale up to 96 vCPUs and 768 GB memory.

Data is continuously backs up to S3.


## Fault Tolerance

High availability. Each 10GB chunk of database volume is replicated to 6 copies, accross 3 AZs.

Can transparently handle data loss:
- up to **2 copies** without affecting write availability
- up to **3 copies** without affecting read availability

Self-healing. Data blocks and disks are continuously scanned for errors and repaired automatically.

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-aurora-fault-tolerance.jpeg)


## Scalability

Aurora Auto Scaling dynamically adjusts the number of Aurora Replicas provisioned for an Aurora DB cluster using single-master replication.

Aurora Auto Scaling is available for both Aurora MySQL and Aurora PostgreSQL.

Aurora Auto Scaling enables your Aurora DB cluster to handle sudden increases in connectivity or workload.

When the connectivity or workload decreases, Aurora Auto Scaling removes unnecessary Aurora Replicas so that you don’t pay for unused provisioned DB instances.


## Architecture

An Aurora cluster consists of a set of compute (database) nodes and a shared storage volume.

The storage volume consists of six storage nodes placed in three AZs for high availability and durability of user data.

Every database node in the cluster is a writer node that can run read and write statements.

There is no single point of failure in the cluster.

Applications can use any writer node for their read/write and DDL needs.

A database change made by a writer node is written to six storage nodes in three Availability Zones, providing data durability and resiliency against storage node and Availability Zone failures.

The writer nodes are all functionally equal, and a failure of one writer node does not affect the availability of the other writer nodes in the cluster.


## Global Database

Aurora Global Database allows you to use a single Aurora database that span multiple AWS regions, enabling low latency global reads and providing fast recovery from the rare outage that might affect an entire AWS Region. 

An Aurora global database has a primary DB cluster in one Region, and up to five read-only secondary DB clusters in different Regions.

The primary DB cluster perform write operations, Aurora replicates data to secondary regions with latency typically under a second.

A database in a secondary region can be promoted to full read/write capabilities in less than 1 minute.

![](https://digitalcloud.training/wp-content/uploads/2022/01/aurora-global-database.jpeg)
