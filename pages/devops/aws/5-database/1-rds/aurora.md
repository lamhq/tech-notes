# Amazon Aurora

## Overview

Amazon Aurora is a fully managed relational database engine that's compatible with **MySQL** and **PostgreSQL**.

Up to **5x** better performance than MySQL, **3x** better than PostgreSQL databases.

Storage start with **10 GB**. Auto scales in 10 GB increments to **128 TB**.

Compute resources can scale up to 96 vCPUs and 768 GB memory.

Data is continuously backs up to S3.

Consider Amazon Aurora if your workloads require high availability (2 copies of data in each AZ, minimum 3 AZs, total 6 copies).


## Scaling Aurora

Transparently handle data loss:
- up to **2 copies** without affecting database write availability
- up to **3 copies** without affecting read availability

Self-healing. Data blocks and disks are continuously scanned for errors and repaired automatically.


## Replicas

3 types of Aurora Repicas available:

- **Aurora Replicas**. 15 read replicas with Aurora. Include automatic failover feature
- **MySQL Replicas**. 5 read replicas with Aurora MySQL
- **PostgreSQL**. 5 read replicas with Aurora PostgreSQL


## Backups

Automated backups are always enabled. Backups do not impact database performance.

Snapshots taking does not impact on performance.

You can share Aurora snapshots with other AWS accounts.
