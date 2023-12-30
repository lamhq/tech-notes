# Amazon Relational Database Service

## Overview

Amazon Relational Database Service (RDS) is a managed database service that lets you run relational database systems in the cloud.

RDS takes care of:
- setting up the database system
- performing backups
- ensuring high availability
- patching the database software and the underlying OS


## Advantages

- **Up & running in minutes**: you can provision an RDS instance and have it up and running in minutes.
- **Failover capability**: In the event of a failure, RDS will automatically fail over to a standby instance in another AZ.
- **Automated backup**: you can have your database backup every day/week


## Database Instance

To deploy a database using RDS, you start by configuring a database instance that sit in a VPC.

AWS fully manages database instances. You can't connect to them using SSH, and they don’t show up under your EC2 instances.


## Database Instance Classes

When you create your DB instance, you choose the instance class (processing power, memory, network bandwidth, disk throughput).

Amazon RDS supports three **instance classes**:
- **Standard**: meet the needs of most databases
- **Memory Optimized**: optimized for memory-intensive applications (3,904 GB of memory)
- **Burstable Performance**: for development, test, nonproduction databases

You can switch your instance to a different class


## Storage

The DB instance uses EBS volumes as its storage layer. You can choose between three types of EBS **volume storage**:
- **General purpose SSD** (gp2): the larger your volume, the better performance you’ll get, minimum 20 GB
- **Provisioned IOPS SSD** (io1): lets you allocate the number of IOPS you need.
- **Magnetic storage** (not recommended): for older instances


## Database engines

Amazon RDS is available on six database engines:

- Commercial: Oracle, Microsoft SQL Server
- Open Source: MySQL, PostgreSQL, MariaDB
- Cloud Native: Amazon Aurora

Each database instance runs only one database engine.


## High Availability (Multi-AZ)

Amazon RDS automatically creates a primary DB instance and synchronously replicates the data to a standby instance in a different AZ.

Used for disaster recovery, not for performance.

In the event of a failure, RDS will automatically fail over to the standby instance.

With multi-AZ, you have a unique DNS endpoint.


## Read replicas

A read replica is a read-only copy of your primary database. A read replica serves only queries against the database.

Useful for read-heavy applications.

Data from the master is asynchronously replicated to each read replica, there’s a delay when syncing data from master to read replicas. This make read replicas **unsuitable for disaster recovery**. 

When you create a read replica, RDS gives you a read-only endpoint, which is a domain name that resolves only to your read replica.

Automatic backup is required to deploy a read replica.

A read replica can be **cross-AZ** or **cross-region**.

Support multiple read replicas. 5 for each DB Instance. MySQL, MariaDB, PostgreSQL, Oracle, SQL Server.

Read replicas can be promited to be their own databases. But this breaks the replication.


## Backup and Recovery

You can take EBS volume **snapshots** of your database instances. Snapshots include all databases on the instance and are stored in S3.

Snapshots are kept in multiple zones in the same region for redundancy.

Taking a snapshot suspends all I/O operations for a few seconds. Be sure to do it during off-peak times.

Snapshot is **restored** to a new instance. The time to restore a snapshot can take several minutes, depending on its size. The more provisioned IOPS you allocate to your new instance, the faster the recovery time.


## Automated Snapshots

RDS can automatically create snapshots of your instances daily during a 30-minute backup window (customizable).

Enabling automatic backups enables point-in-time recovery, which archives database change logs to S3 every 5 minutes. Restoring to a point-in-time can take hours, depending on how much data is in the transaction logs.

RDS keeps automated snapshots for a limited period of time and then deletes them. The retention period is between 1 day and 35 days, default is 7 days, 0 to disable.

You can also manually take a snapshot of your database instance.


## Scaling

You can scale relational database by:
- **Vertical scaling**: increase database size for greater performance.
- **Scaling storage**: resize storage size, but it's only able to go up, not down.
- **Create read replicas**: creating read-only copies of your data.
- **Using Aurora serverless**: offload scaling to AWS. Good for unpredictable workloads.


## Amazon RDS Proxy

RDS Proxy establishes a database connection **pool** and reuses connections in this pool without the memory and CPU overhead of opening a new database connection each time.

RDS Proxy can handle database **failover**, allowing applications to remain connected to the proxy endpoint for the duration of the failover.

Amazon RDS Proxy allows you to use **AWS IAM** to connect to a secured database without providing an encrypted connection string that contains authentication credentials. Amazon RDS Proxy supplies the connection string and securely store credentials in AWS Secrets Manager.

You can control the number of database connections that are created to protect the database against **over subscription**.