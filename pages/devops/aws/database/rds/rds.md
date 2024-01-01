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

Database instances are accessed via endpoints retrieved via the DB instance description.

By default, customers are allowed to have up to a total of **40**  instances (only 10 of these can be Oracle or MS SQL unless you have your own licenses).


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

Only database engine on primary instance is active. Automatic failover to standby when a problem is detected. Used for disaster recovery.

Automated backups are taken from standby. Database engine version upgrades happen on primary.

With multi-AZ, you have a unique DNS endpoint.


## Read replicas

Read replica are read-only copies of your primary database.

Useful for read-heavy applications.

A read replica serves only queries against the database.

Each read replica has its own DNS endpoint.

Replication is asynchronous.

Read replicas require automated backups enabled on the primary (retention period > 0).

Can be within an AZ, cross-AZ, or cross-Region

Support multiple read replicas. 5 for each DB Instance. MySQL, MariaDB, PostgreSQL, Oracle, SQL Server.

Database engine version upgrade is independent from source instance.

Read replicas can be promited to be their own databases. But this breaks the replication.


## Backup and Recovery (snapshot)

You can take EBS volume **snapshots** of your database instances. Snapshots include all databases on the instance and are stored in S3.

Snapshots are kept in multiple zones in the same region for redundancy.

Taking a snapshot suspends all I/O operations for a few seconds. Be sure to do it during off-peak times.

Snapshot is **restored** to a new instance. The time to restore a snapshot can take several minutes, depending on its size. The more provisioned IOPS you allocate to your new instance, the faster the recovery time.

Snapshots can be shared with other AWS accounts.


## Automated Snapshots

RDS can automatically create snapshots of your instances daily during a 30-minute backup window (customizable).

Enabling automatic backups enables **point-in-time recovery**, which archives database change logs to S3 every 5 minutes. Restoring to a point-in-time can take hours, depending on how much data is in the transaction logs.

RDS keeps automated snapshots for a limited period of time and then deletes them. The retention period is between 1 day and 35 days, default is 7 days, 0 to disable.

You can also manually take a snapshot of your database instance.


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


## Maintenance windows

Maintenance windows are configured to allow DB instances modifications to take place such as scaling and software patching (some operations require the DB instance to be taken offline briefly).

You can define the maintenance window or AWS will schedule a 30-minute window.


## Events and Notifications

Amazon RDS uses AWS SNS to send RDS events via SNS notifications.

You can use API calls to the Amazon RDS service to list the RDS events in the last 14 days (DescribeEvents API).

You can view events from the last 14 days using the CLI.

Using the AWS Console you can only view RDS events for the last 1 day.


## Encryption

Encryption at rest is supported for all DB types and uses AWS KMS.

When using encryption at rest, the following elements are also encrypted:
- All DB snapshots.
- Backups.
- DB instance storage.
- Read Replicas.

To encrypt an existing DB, you need to create a snapshot, copy it, encrypt the copy, then build an encrypted DB from the snapshot.

RDS supports SSL encryption in-transit between applications and RDS DB instances. RDS generates a certificate for the instance.


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


## Monitoring, Logging and Reporting

You can subscribe to **Amazon RDS Events** to be **notified when changes occur** with a DB instance, DB snapshot, DB parameter group, or DB security group.

Amazon RDS Performance Insights allows to **assess the load on your database** and determine when and where to act.

You can look at automated recommendations from **Amazon RDS Recommendations** for database resources, such as DB instances, read replicas, and DB parameter groups.

You can view metrics sent from Amazon RDS in Amazon CloudWatch Metrics and perform actions based on the metric and a threshold you set.

You can monitor, store, and access your **database log files** in CloudWatch Logs.


## Authorization and Access Control

Amazon RDS supports identity-based policies using IAM.

IAM database authentication works with MySQL and PostgreSQL. With this authentication method, you don’t need to use a password when you connect to a DB instance. Instead, you use an authentication token.

Benefits of IAM database authentication:
- Network traffic to and from the database is encrypted using Secure Sockets Layer (SSL).
- You can use IAM to centrally manage access to your database resources, instead of managing access individually on each DB instance.
- For applications running on Amazon EC2, you can use profile credentials specific to your EC2 instance to access your database instead of a password, for greater security.


## Amazon RDS Proxy

RDS Proxy establishes a database connection **pool** and reuses connections in this pool without the memory and CPU overhead of opening a new database connection each time.

RDS Proxy can handle database **failover**, allowing applications to remain connected to the proxy endpoint for the duration of the failover.

Amazon RDS Proxy allows you to use **AWS IAM** to connect to a secured database without providing an encrypted connection string that contains authentication credentials. Amazon RDS Proxy supplies the connection string and securely store credentials in AWS Secrets Manager.

You can control the number of database connections that are created to protect the database against **over subscription**.
