# Indexes

## Overview

An index is a data structure which allows you to perform fast queries on specific columns in a table.

You select columns that you want included in the index and run your searches on the index instead of the entire dataset.

There are 2 types of index supported for speeding up queries in DynamoDB:

- Local Secondary Index.
- Global Secondary Index.


## Local Secondary Index (LSI)

An LSI provides an alternative sort key to use for scans and queries.

It has the same partition key as your original table (different sort key).

It gives you a different view of your data, organized by an alternative sort key.

Any queries based on this sort key are much faster using the index than the main table.

*Example: a user ID as a partition key and account creation date as the sort key.*

Benefit: you can query on additional values in the table other than the partition key / sort key.

### Requirements

You can have up to five LSIs per table.

The sort key consists of exactly one scalar attribute.

The attribute that you choose must be a scalar String, Number, or Binary.

An LSI must be created at table creation time.

It can only be created when you are creating your table.

You cannot add, remove, or modify it later.

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-dynamodb-local-secondary-index-lsi.jpeg)


## Global Secondary Index (GSI)

A GSI has a different partition key as well as a different sort key.

It gives a completely different view of the data.

It speeds up any queries relating to this alternative partition and sort key.

*Example: an email address as the partition key, and last login date as the sort key.*

With a GSI the index is a new "table", and you can project attributes on it.

- The partition key and sort key of the original table are always projected (KEYS_ONLY).
- Can specify extra attributes to project (INCLUDE).
- Can use all attributes from main table (ALL).

You can create when you create your table or at any time later.

It is possible to add / modify GSI at any time.

You must define RCU / WCU for the index

If writes are throttled on the GSI, the main table will be throttled (even if there’s enough WCUs on the main table). LSIs do not cause any special throttling considerations.

*Tip: You typically need to ensure that you have at least the same, or more, RCU/WCU specified in your GSI as in your main table to avoid throttling on your main table.*

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-dynamodb-global-secondary-index-gsi.jpeg)