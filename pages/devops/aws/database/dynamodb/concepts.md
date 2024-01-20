# Concepts

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


### Best practices for partition keys

- Use high-cardinality attributes. e.g. e-mailid, employee_no, customerid, sessionid, orderid, and so on.
- Use composite attributes. e.g. customerid+productid+countrycode as the partition key and order_date as the sort key.
- Add random numbers or digits from a predetermined range for write-heavy use cases. e.g. add a random suffix to an invoice number such as INV00023-04593


## Read capacity unit (RCU)

Each API call to read data from your table is a read request.

Read requests can be strongly consistent, eventually consistent, or transactional.

For items up to 4 KB in size, one RCU can perform one strongly consistent read request per second.

Items larger than 4 KB require additional RCUs.

For items up to 4 KB in size, one RCU can perform 2 eventually consistent read requests per second.

Transactional read requests require 2 RCUs to perform one read per second for items up to 4 KB.

*For example, a strongly consistent read of an 8 KB item would require two RCUs, an eventually consistent read of an 8 KB item would require one RCU, and a transactional read of an 8 KB item would require four RCUs.*


## Write capacity unit (WCU)

Each API call to write data to your table is a write request.

For items up to 1 KB in size, one WCU can perform one standard write request per second.

Items larger than 1 KB require additional WCUs.

Transactional write requests require two WCUs to perform one write per second for items up to 1 KB.

*For example, a standard write request of a 1 KB item would require one WCU, a standard write request of a 3 KB item would require three WCUs, and a transactional write request of a 3 KB item would require six WCUs.*

## Replicated write capacity unit (rWCU)

When using DynamoDB global tables, your data is written automatically to multiple AWS Regions of your choice.

Each write occurs in the local Region as well as the replicated Regions.


## Transactional read/write requests

In DynamoDB, a transactional read or write differs from a standard read or write because it guarantees that all operations contained in a single transaction set succeed or fail as a set.


## Streams read request unit:

Each `GetRecords` API call to DynamoDB Streams is a streams read request unit.

Each streams read request unit can return up to 1 MB of data.


## Capacity modes

There're two capacity mode: provisioned (predictable workloads) and on-demand (sporadic workloads).

You can switch between the different capacity modes twice per 24 hours per table.


## DynamoDB Provisioned Capacity

With provisioned capacity mode, you specify the number of data reads and writes per second that you require for your application.

When you create your table, you specify your requirements using Read Capacity Units (RCUs) and Write Capacity Units (WCUs).

WCUs and RCUs are spread between partitions evenly.


## DynamoDB On-Demand Capacity

With on-demand, you don’t need to specify your requirements.

DynamoDB instantly scales up and down based on the activity of your application.

Great for unpredictable / spikey workloads or new workloads that aren’t well understood.

You pay for what you use (pay per request).
