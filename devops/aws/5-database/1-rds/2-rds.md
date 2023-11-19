# Amazon Relational Database Service

## Intro

Amazon RDS is a service that enables you to run relational databases in the AWS Cloud.

Amazon RDS is a managed service that automates tasks such as hardware provisioning, database setup, patching, and backups.

Amazon RDS provides a number of different security options. Many Amazon RDS database engines offer encryption at rest and in transit.


## When to use a RDS database?

For online transaction processing (OLTP) workloads.

RDS is not suitable for analyzing large amounts of data. Use a data warehouse like Redshift, which is optimized for OLAP.


## Database engines

Amazon RDS is available on six database engines:

- Commercial: Oracle, Microsoft SQL Server
- Open Source: MySQL, PostgreSQL, MariaDB
- Cloud Native: Amazon Aurora


## Advantages

- **Up & running in minutes**: you can provision an RDS instance and have it up and running in minutes.
- **Multi-AZ**: RDS create an exact copy of your production database in another AZ. It's for disaster recovery, not for improving performance, you cannot connect to the standby when the primary database is active.
- **Failover capability**: you lose one AZ, RDS will automatically failover to another AZ.
- **Automated backup**: you can have your database backup every day/week


## DB Instances

A DB instance can contain multiple databases with the same engine.

Underneath the DB instance is an EC2 instance, this instance is managed through the Amazon RDS console.

When you create your DB instance, you choose the instance type and size.

Amazon RDS supports three instance families:

- Standard, which include general-purpose instances
- Memory Optimized, which are optimized for memory-intensive applications
- Burstable Performance, which provides a baseline performance level, with the ability to burst to full CPU usage.

The DB instance uses Amazon Elastic Block Store (EBS) volumes as its storage layer. You can choose between three types of EBS volume storage.

- General purpose (SSD)
- Provisioned IOPS (SSD)
- Magnetic storage (not recommended)


## Multi-AZ

An exact copy of your production database in another Availability
Zone.

Used for disaster recovery.

In the event of a failure, RDS will automatically fail over to the standby instance.

With multi-AZ, you have a unique DNS endpoint. It's to failover to the standby database.


## Read replica

A read replica is a read-only copy of your primary database.

Used to increase or scale read performance.

Great for read-heavy workloads and takes the load off your primary database for read-only workloads.

Automatic backup is required to deploy a read replica.

A read replica can be cross-AZ or cross-region.

Support multiple read replicas. 5 for each DB Instance. MySQL, MariaDB, PostgreSQL, Oracle, SQL Server.

Each read replica has its own DNS endpoint. One for primary, one for your read replica.

Read replicas can be promited to be their own databases. But this breaks the replication.


## Amazon RDS Proxy

By using Amazon RDS Proxy, your applications can pool and share database connections to improve their ability to scale.

By using RDS Proxy, you can also enforce AWS Identity and Access Management (IAM) authentication for databases, and securely store credentials in AWS Secrets Manager.

RDS Proxy establishes a database connection pool and reuses connections in this pool without the memory and CPU overhead of opening a new database connection each time.

To protect the database against oversubscription, you can control the number of database connections that are created.