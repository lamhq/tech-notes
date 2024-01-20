# Read Replicas

## Overview

Read replica are read-only copies of your primary database.

Replication is asynchronous, highly scalable.

Read replicas are created from a snapshot of the master instance.

All read replicas are accessible and can be used for read scaling.

A read replica has its own DNS endpoint and only serves queries against the database.

Useful for read-heavy applications.

Can be within an Availability Zone, Cross-AZ, or Cross-Region

Support multiple read replicas, 5 for each DB Instance: MySQL, MariaDB, PostgreSQL, Oracle, SQL Server.

Database engine version upgrade is independent from source instance.

No backups configured by default.

Must have automated backups enabled on the primary (retention period > 0).

Read replicas must be explicitly deleted. If a source DB instance is deleted without deleting the replicas each replica becomes a standalone single-AZ DB instance.

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-rds-read-replicas.jpeg)


## Promotion

A read replica can be manually promoted to a standalone database instance.

Promotion takes several minutes.

Promoted read replicas retain:
- Backup retention window.
- Backup window.
- DB parameter group.

Existing read replicas continue to function as normal.


## Multi-AZ Deployments

See [Read Replicas Support in Multi-AZ](./multi-az.md#read-replicas-support).


## Limitations

Storage type and instance class of read replicas can be different from the source

The compute of read replicas should be at least the performance of the source.

You can have 5 read replicas of a production DB. 

Cannot have more than 4 instances involved in a replication chain.

Cannot change the DB engine.

Can take snapshots of PostgreSQL read replicas but cannot enable automated backups.

You can enable automatic backups on MySQL and MariaDB read replicas.

You can enable writes to the MySQL and MariaDB Read Replicas.

You can have read replicas of read replicas for MySQL and MariaDB but not for PostgreSQL.
