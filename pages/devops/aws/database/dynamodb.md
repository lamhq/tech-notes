# Amazon DynamoDB

## Overview

Amazon DynamoDB is a key-value database service.

Data spreads across 3 geographically distinct data centers, stored on SSD storage.

You get **eventually consistent reads** by default. You can opt in for **strongly consistent reads**.

**Serverless**: you do not have to provision, patch, manage servers, install, maintain, or operate software.. 

**Automatic Scaling**: As the size of your database shrinks or grows, DynamoDB automatically scales to adjust for changes in capacity while maintaining consistent performance. 

You can scale up or scale down tables' throughput capacity with minimal downtime or performance degradation.


## Scaling

You have to know the access patterns of your database is predictable or unpredictable.

There're two capacity mode: provisioned and on-demand:
- **provisioned**: for **predictable workloads**.
- **on-demand**: for **sporadic workloads**.

You can switch between the different capacity modes twice per 24 hours per table.


## Pricing

### Provisioned Capacity Mode
- You specify the expected number of reads and writes per second for your application
- Ideal for: predictable traffic

### On-Demand Capacity Mode

- Pay per reads and writes on your tables
- Less cost effective than provisioned
- Ideal for: unknown workloads, unpredictable traffic


## Security

- Encryption at rest using KMS.
- Support Direct Connect (DX)
- Work with IAM policies & roles
- You can connect to DynamoDB using a Site-to-site VPN.
- Integrate with CloudWatch, CloudTrail, VPC endpoints


## Backup & Restore

**On-demand backup**:
- DynamoDB has on-demand backup and restore.
- You can do full backups at any time. No impact on table performance or availability.
- You get consistent within seconds and retained until deleted.
- Operates within same region as the source table.

**Point-in-time Recovery** (PITR):
- Protects against accidental writes or deletes
- You can restore to any point in the last 35 days. Latest restorable: 5 minutes in the past.
- It's done using incremental backups.
- not enabled by default.


## DynamoDB Accelerator (DAX)

- Fully managed, highly available, in-memory cache
- 10× performance improvement than using just DynamoDB on its own (microseconds)
- Compatible with DynamoDB API calls. No need for developers to manage caching logic. Application interact with DAX only
- Is not designed for applications that are write-intensive.
- Run within an Amazon VPC
- Full control. You determine the node size and count for the cluster, TTL for the data, and maintenance windows for changes and updates

![](https://d1.awsstatic.com/product-marketing/DynamoDB/dax_high_level.e4af7cc27485497eff5699cdf22a9502496cba38.png)


## DynamoDB Transactions

If you have any scenario that mentions ACID requirements, think of DynamoDB Transactions.

DynamoDB transactions provide developers atomicity, consistency, isolation, and durability (ACID) across one or more tables within a single AWS account and region.

3 options for reads: eventual consistency, strong consistency, and transactional

2 options for writes: standard and transactional

Up to 100 actions per transaction or 4 MB of data.


## DynamoDB Streams

DynamoDB Streams are time-ordered sequence of item-level changes in a table.

Every time your data changes (insert, update, delete), it comes with a sequence number. These squences are stored in DynamoDB Streams. They are stored for 24 hours.

The records are broken into shards to make it manageable.

You can combine with Lambda functions for functionality like stored procedures.


## Global Tables

Global Tables are managed multi-master, multi-region replication. 

It's a way to replicate your tables from one to another region. For disaster recovery or high availability.

Great for globally distributed applications.

Need to turn on on DynamoDB Streams to enable this.

Replication latency under 1 second.

Work transparently. No code rewrites.