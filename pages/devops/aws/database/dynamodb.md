# Amazon DynamoDB

## Overview

Amazon DynamoDB is a key-value database service.

Data is synchronously replicated across 3 facilities (AZs) in a region, stored on SSD.

DynamoDB is a serverless service – there are no instances to provision or manage.

Can be used for storing session state data.

DynamoDB automatically scales to adjust for changes in capacity while maintaining consistent performance. 

You can scale up or scale down tables' throughput capacity with minimal downtime or performance degradation.

Offer Multi-AZ redundancy and Cross-Region Replication.

Strongly consistent or eventually consistent reads, support ACID transactions.

The aggregate size of an item cannot exceed 400KB including keys and all attributes.

Can store pointers to objects in S3, including items over 400KB.


## Anti-Patterns

Amazon DynamoDB is not ideal for the following situations:

- Traditional RDS apps.
- Joins and/or complex transactions.
- BLOB data.
- Large data with low I/O rate.


## Partitions

Amazon DynamoDB stores data in partitions.

A partition contain table's data, it is replicated across multiple AZs within a Region.

DynamoDB allocates additional partitions to a table in the following situations:

- If you increase the table’s provisioned throughput settings beyond what the existing partitions can support.
- If an existing partition fills to capacity and more storage space is required.

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-dynamodb-partitions-and-primary-keys.jpeg)

DynamoDB evenly distributes provisioned throughput (RCUs and WCUs) among partitions

If your access pattern exceeds 3000 RCU or 1000 WCU for a single partition key value, your requests might be throttled.


## Primary Keys

DynamoDB stores and retrieves data based on a Primary key.

There are two types of Primary key: Partition key and Composite key.

**Partition key** (unique attribute)
- Partition key determines the partition or physical location on which the data is stored (through an internal hash function)
- If you are using the Partition key as your Primary key, then no two items can have the same partition key.

**Composite key** (Partition key + Sort key in combination)
- 2 items may have the same Partition key, but they must have a different Sort key.
- All items with the same Partition key are stored together, then sorted according to the Sort key value.
- Allows you to store multiple items with the same partition key.

Best practices for partition keys:
- Use high-cardinality attributes. e.g. e-mailid, employee_no, customerid, sessionid, orderid, and so on.
- Use composite attributes. e.g. customerid+productid+countrycode as the partition key and order_date as the sort key.
- Add random numbers or digits from a predetermined range for write-heavy use cases. e.g. add a random suffix to an invoice number such as INV00023-04593


## Consistency Models

DynamoDB supports eventually consistent and strongly consistent reads.

Eventually consistent reads:
- When you read data from a DynamoDB table, the response might not reflect the results of a recently completed write operation.
- The response might include some stale data.
- If you repeat your read request after a short time, the response should return the latest data.

Strongly consistent reads:
- When you request a strongly consistent read, DynamoDB returns a response with the most up-to-date data, reflecting the updates from all prior write operations that were successful.
- A strongly consistent read might not be available if there is a network delay or outage. In this case, DynamoDB may return a server error (HTTP 500).
- Strongly consistent reads may have higher latency than eventually consistent reads.
- Strongly consistent reads are not supported on global secondary indexes.
- Strongly consistent reads use more throughput capacity than eventually consistent reads.

DynamoDB uses eventually consistent reads by default.

You can configure strongly consistent reads with the `GetItem`, `Query` and `Scan` APIs by setting the `–consistent-read` (or `ConsistentRead`) parameter to `true`.


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

DynamoDB Transactions provide ACID transactions across one or more tables within a single AWS account and region.

It checks for a pre-requisite condition before writing to a table.

With the transaction write API, you can group multiple Put, Update, Delete, and ConditionCheck actions and submit the actions as a single `TransactWriteItems` operation that either succeeds or fails as a unit.

Performs two underlying reads or writes of every item in the transaction: one to prepare the transaction and one to commit the transaction.

3 options for reads: eventual consistency, strong consistency, and transactional

2 options for writes: standard and transactional

Up to 100 actions per transaction or 4 MB of data.

No additional cost.


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