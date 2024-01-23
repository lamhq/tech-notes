# Multi-AZ (High Availability)

## Overview

Multi-AZ RDS creates a replica in another AZ and synchronously replicates to it (disaster recovery only).

Synchronous Replication – highly durable

Only database engine on primary instance is active. You have a unique DNS endpoint.

Always span two availability zones within a single region

AWS recommends the use of provisioned IOPS storage for multi-AZ RDS DB instances.

You cannot choose which AZ in the region will be chosen to create the standby DB instance (but can view).

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-rds-multi-az.jpeg)


## Automatic failover

Automatic failover to standby when a problem is detected.

Depending on the instance class it can take 1 to a few minutes to failover to a standby DB instance.

It is recommended to implement DB connection retries in your application.


## Read Replicas Support

Amazon RDS Read Replicas for MySQL, MariaDB, PostgreSQL, and Oracle support Multi-AZ deployments.

This allows you to scale reads whilst also having multi-AZ for DR.

Combining Read Replicas with Multi-AZ enables you to build a resilient disaster recovery strategy and simplify your database engine upgrade process.

A Read Replica in a different region than the source database can be used as a standby database and promoted to become the new production database in case of a regional disruption.

For database engine upgrade process, you can create a Read Replica and upgrade it. When the upgrade is complete, you can stop applications, promote the Read Replica to a standalone database instance, and switch over your applications, no additional steps are needed.


## Maintenance

The process for implementing maintenance activities is as follows:

- Perform operations on standby.
- Promote standby to primary.
- Perform operations on new standby (demoted primary).

You can manually upgrade a DB instance to a supported DB engine version from the AWS Console. Version upgrades will be conducted on both the primary and standby at the same time causing an outage of both DB instance.

Snapshots and automated backups are performed on the standby to avoid I/O suspension on the primary instance.

DB Instance scaling, os patching, system upgrades are applied first on the standby.

By default upgrades will take effect during the next maintenance window. You can optionally force an immediate upgrade.