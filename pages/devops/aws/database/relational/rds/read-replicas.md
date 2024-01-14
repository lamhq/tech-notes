# Read Replicas

## Overview

Read replica are read-only copies of your primary database.

Asynchronous replication – highly scalable.

All read replicas are accessible and can be used for read scaling.

Useful for read-heavy applications.

A read replica has its own DNS endpoint and only serves queries against the database.

No backups configured by default.

Can be within an Availability Zone, Cross-AZ, or Cross-Region

Database engine version upgrade is independent from source instance

Can be manually promoted to a standalone database instance.

Support multiple read replicas, 5 for each DB Instance: MySQL, MariaDB, PostgreSQL, Oracle, SQL Server.

Database engine version upgrade is independent from source instance.

Read replicas are created from a snapshot of the master instance.

Must have automated backups enabled on the primary (retention period > 0).

Read replicas must be explicitly deleted. If a source DB instance is deleted without deleting the replicas each replica becomes a standalone single-AZ DB instance.

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-rds-read-replicas.jpeg)


## Multi-AZ

Read replicas can have multi-AZ enabled and you can create read replicas of multi-AZ source DBs.

In a multi-AZ failover the read replicas are switched to the new primary.


## Promotion

You can promote a read replica to primary.

Promotion of read replicas takes several minutes.

Promoted read replicas retain:
- Backup retention window.
- Backup window.
- DB parameter group.

Existing read replicas continue to function as normal.


## Limitations

The read replicas storage type and instance class can be different from the source but the compute should be at least the performance of the source.

You cannot change the DB engine.

You can take snapshots of **PostgreSQL read replicas** but cannot enable automated backups.

You can enable automatic backups on MySQL and MariaDB read replicas.

You can enable writes to the MySQL and MariaDB Read Replicas.

You can have 5 read replicas of a production DB. You cannot have more than four instances involved in a replication chain.

You can have read replicas of read replicas for MySQL and MariaDB but not for PostgreSQL.
