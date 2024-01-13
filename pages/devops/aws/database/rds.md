# Amazon Relational Database Service

## Overview

Amazon Relational Database Service (Amazon RDS) is a managed service that you can use to launch and manage relational databases on AWS

It is best suited to structured, relational data store requirements, OLTP workloads.

RDS is a managed service and you do not have access to the underlying EC2 instance (no root access).

*The exception to the above rule is Amazon RDS Custom which allows access to the underlying operating system. This is new, available for limited DB engines, and does not appear on the exam yet.*

The Amazon RDS managed service includes the following:

- Security and patching of the DB instances.
- Automated backup for the DB instances.
- Software updates for the DB engine.
- Easy scaling for storage and compute.
- Multi-AZ option with synchronous replication.
- Automatic failover for Multi-AZ option.
- Read replicas option for read heavy workloads.


## Database engines

Amazon RDS supports the following database engines:

- Commercial: Oracle, Microsoft SQL Server
- Open Source: MySQL, PostgreSQL, MariaDB
- Cloud Native: Amazon Aurora

Each database instance runs only one database engine.


## High Availability (Multi-AZ)

Amazon RDS automatically creates a primary DB instance and synchronously replicates the data to a standby instance in a different AZ.

Only database engine on primary instance is active. Automatic failover to standby when a problem is detected. Used for disaster recovery.

Automated backups are taken from standby. Database engine version upgrades happen on primary.

With multi-AZ, you have a unique DNS endpoint.

Depending on the instance class it can take 1 to a few minutes to failover to a standby DB instance.

It is recommended to implement DB connection retries in your application.


## Read replicas

Read replica are read-only copies of your primary database. Replication is asynchronous.

Useful for read-heavy applications.

A read replica serves only queries against the database.

Each read replica has its own DNS endpoint.

Read replicas require automated backups enabled on the primary (retention period > 0).

Can be within an AZ, cross-AZ, or cross-Region

Support multiple read replicas. 5 for each DB Instance. MySQL, MariaDB, PostgreSQL, Oracle, SQL Server.

Database engine version upgrade is independent from source instance.

Read replicas can be promited to be their own databases. But this breaks the replication.


## Scaling

You can scale relational database by:
- **Vertical scaling**: increase database size for greater performance.
- **Scaling storage**: increase storage size.
- **Create read replicas**: creating read-only copies of your data.
- **Using Aurora serverless**: offload scaling to AWS. Good for unpredictable workloads.

Scaling storage can happen while the RDS instance is running without outage however there may be performance degradation.

Scaling compute will cause downtime.

You can choose to have changes take effect immediately, however the default is within the maintenance window.

All RDS DB types support a maximum DB size of **64 TiB** except for Microsoft SQL Server (**16 TiB**).


## Events and Notifications

Amazon RDS uses AWS SNS to send RDS events via SNS notifications.

You can use API calls to the Amazon RDS service to list the RDS events in the last 14 days (DescribeEvents API).

You can view events from the last 14 days using the CLI.

Using the AWS Console you can only view RDS events for the last 1 day.


## Billing

Your're charged for:
- DB instance hours (partial hours are charged as full hours).
Storage GB/month.
- I/O requests/month – for magnetic storage.
- Provisioned IOPS/month – for RDS provisioned IOPS SSD.
- Egress data transfer.
- Backup storage (DB backups and manual snapshots).

For multi-AZ you are charged for:
- Multi-AZ DB hours.
- Provisioned storage.
- Double write I/Os.

For multi-AZ you are not charged for DB data transfer during replication from primary to standby.

On-demand and reserved instance pricing is available.

Reserved instances are defined based on the following attributes which must not be changed:
- DB engine.
- DB instance class.
- Deployment type (standalone, multi-AZ_).
- License model.
- Region.

Reserved instances:
- Can be moved between AZs in the same region.
- Are available for multi-AZ deployments.
- Can be applied to Read Replicas if DB instance class and region are the same.
- Scaling is achieved through changing the instance class for compute and modifying storage capacity for additional storage allocation.


## Amazon RDS Proxy

RDS Proxy establishes a database connection **pool** and reuses connections in this pool without the memory and CPU overhead of opening a new database connection each time.

RDS Proxy can handle database **failover**, allowing applications to remain connected to the proxy endpoint for the duration of the failover.

Amazon RDS Proxy allows you to use **AWS IAM** to connect to a secured database without providing an encrypted connection string that contains authentication credentials. Amazon RDS Proxy supplies the connection string and securely store credentials in AWS Secrets Manager.

You can control the number of database connections that are created to protect the database against **over subscription**.
