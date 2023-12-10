# Amazon Aurora

## What Is Aurora?

Amazon Aurora is a fully managed relational database engine that's compatible with MySQL and PostgreSQL.

Up to **5x** better performance than MySQL, **3x** better than PostgreSQL databases.

Start with 10 GB. Auto scales in 10 GB increments to 128 TB.

Compute resources can scale up to 96 vCPUs and 768 GB memory.

High availability. 2 copies of data in each AZ, minimum 3 AZs (total 6 copies). continuously backs up your data to Amazon S3


## Scaling Aurora

Aurora is designed to transparently handle the loss of up to **2 copies** of data without affecting database write availability and up to **3 copies** without affecting read availability.

Aurora storage is also self-healing. Data blocks and disks are continuously scanned for errors and repaired automatically.


## Replicas

3 types of Aurora Repicas available:

- Aurora Replicas: You can currently have 15 read replicas with Aurora.
- MySQL Replicas: You can currently have 5 read replicas with
Aurora MySQL.
- PostgreSQL: You can currently have 5 read replicas with Aurora PostgreSQL.

Consider Amazon Aurora if your workloads require high availability. It replicates six copies of your data across three Availability Zones and continuously backs up your data to Amazon S3.

The underlying storage grows automatically as needed. An Aurora cluster volume can grow to a maximum size of 128 tebibytes (TiB).


## Backups

Automated backups are always enabled on Amazon Aurora DB Instances. Backups do not impact database performance.

You can also take snapshots with Aurora. This also does not impact on performance.

You can share Aurora snapshots with other AWS accounts.
