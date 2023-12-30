# Amazon Aurora

## Overview

Amazon Aurora is a fully managed relational database engine that's compatible with **MySQL** and **PostgreSQL**.

Up to **5x** better performance than MySQL, **3x** better than PostgreSQL databases.

Storage start with **10 GB**. Auto scales in 10 GB increments to **128 TB**.

Compute resources can scale up to 96 vCPUs and 768 GB memory.

Data is continuously backs up to S3.

High availability. 2 copies of data in each AZ, minimum 3 AZs, total 6 copies.


## Scaling Aurora

Transparently handle data loss:
- up to **2 copies** without affecting write availability
- up to **3 copies** without affecting read availability

Self-healing. Data blocks and disks are continuously scanned for errors and repaired automatically.


## Replicas

3 types of Aurora Repicas available:

- **Aurora Replicas**. 15 read replicas with Aurora. Include automatic failover feature
- **MySQL Replicas**. 5 read replicas with Aurora MySQL
- **PostgreSQL**. 5 read replicas with Aurora PostgreSQL


## Multi-AZ

Amazon Aurora gives you two options for multi-AZ: **single-master** and **multi-master**.

### Single-Master

An Amazon Aurora single-master cluster consists of a primary instance, and may include Aurora replicas.

A cluster is synchronously replicated across three AZs.

In the event the primary instance fails:
- If no Aurora rep- licas exist, Aurora will create a new primary instance to replace the failed one
- If an Aurora replica does exist, Aurora will promote the replica to the primary. The entire process typically takes less than two minutes.


### Multi-Master

In a multi-master cluster, all instances can write to the database in a shared cluster volume.

When one instance fails, no failover occurs, as long as at least one database instance is running, you can read from and write to the database.


## Backups

Automated backups are always enabled. Backups do not impact database performance.

Snapshots taking does not impact on performance.

You can share Aurora snapshots with other AWS accounts.
