# Amazon Relational Database Service

## Relational databases

In a relational database, data is stored in a way that relates it to other pieces of data. 

Relational databases use structured query language (SQL) to store and query data.


## Amazon Relational Database Service

Amazon RDS is a service that enables you to run relational databases in the AWS Cloud.

Amazon RDS is a managed service that automates tasks such as hardware provisioning, database setup, patching, and backups.

Amazon RDS provides a number of different security options. Many Amazon RDS database engines offer encryption at rest (protecting data while it is stored) and encryption in transit (protecting data while it is being sent and received).


## Amazon RDS database engines

Amazon RDS is available on six database engines:

- Commercial: Oracle, MicrosoftSQL Server
- Open Source: MySQL, PostgreSQL, MariaDB
- Cloud Native: Amazon Aurora


## Amazon Aurora

Amazon Aurora is an enterprise-class relational database.

It is compatible with MySQL and PostgreSQL relational databases. It is up to five times faster than standard MySQL databases and up to three times faster than standard PostgreSQL databases.

Consider Amazon Aurora if your workloads require high availability. It replicates six copies of your data across three Availability Zones and continuously backs up your data to Amazon S3.


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


## Back Up Your Data

### Automatic backups

Automated backups are turned on by default. 

This backs up your entire DB instance (not just individual databases on the instance), and your transaction logs.

When you create your DB instance, you set a period of time that automatic backups occur. Typically, you want to set these windows during a time when your database experiences little activity because it can cause increased latency and downtime.

You can retain your automated backups between 0 and 35 days.

The 0 days setting actually disables automatic backups from happening. Keep in mind that if you set it to 0, it will also delete all existing automated backups. This is not ideal, as the benefit of having automated backups is having the ability to do point-in-time recovery.

If you restore data from an automated backup, you have the ability to do point-in-time recovery. Point-in-time recovery creates a new DB instance using data restored from a specific point in time. This restoration method provides more granularity by restoring the full backup and rolling back transactions up to the specified time range.

### Manual snapshots

If you want to keep your automated backups longer than 35 days, use manual snapshots.

Manual snapshots are similar to taking EBS snapshots, except you manage them in the RDS console.

These are backups that you can initiate at any time, that exist until you delete them.

If you restore data from a manual snapshot, it creates a new DB instance using the data from the snapshot.

### Which Backup Option Should I Use?

The answer, almost always, is both. Automated backups are beneficial for the point-in-time recovery. Manual snapshots allow you to retain backups for longer than 35 days. 


## Get Redundancy with Amazon RDS Multi-AZ

When you enable Amazon RDS Multi-AZ, Amazon RDS creates a redundant copy of your database in another AZ. You end up with two copies of your database: a primary copy in a subnet in one AZ and a standby copy in a subnet in a second AZ. 

The primary copy of your database provides access to your data so that applications can query and display that information. 

The data in the primary copy is synchronously replicated to the standby copy. The standby copy is not considered an active database, and does not get queried by applications.

If there's an availability issue, such as the primary database losing connectivity, Amazon RDS triggers an automatic failover.

When you create a DB instance, a domain name system (DNS) name is provided. AWS uses that DNS name to failover to the standby database. In an automatic failover, the standby database is promoted to the primary role and queries are redirected to the new primary database.

The reason you can select multiple subnets for an Amazon RDS database is because of the Multi-AZ configuration. You'll want to ensure that you have used subnets in different AZs for your primary and standby copies.