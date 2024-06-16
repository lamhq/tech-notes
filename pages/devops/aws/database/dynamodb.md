# Amazon DynamoDB

## Overview

Amazon DynamoDB is a key-value database service.

Data is synchronously replicated across 3 facilities (AZs) in a region, stored on SSD.

DynamoDB is a serverless service – there are no instances to provision or manage.

Can be used for storing session state data.

DynamoDB automatically scales to adjust for changes in capacity while maintaining consistent performance. 

You can scale up or scale down tables' throughput capacity with minimal downtime or performance degradation.

Offer Multi-AZ redundancy and Cross-Region Replication.

Support Strongly consistent or eventually consistent reads, ACID transactions.

The aggregate size of an item cannot exceed 400KB including keys and all attributes.

Can store pointers to objects in S3, including items over 400KB.

Eventually consistent reads:
- Consistency across all copies of data is usually reached within a second.
- Repeating a read after a short time should return the updated data.
- Best read performance.

Strongly consistent reads:
- A strongly consistent read returns a result that reflects all writes that received a successful response prior to the read.
- You don't need to wait for all the updates complete before reading the data.


## Anti-Patterns

Amazon DynamoDB is not ideal for the following situations:

- Traditional RDS apps.
- Joins and/or complex transactions.
- BLOB data.
- Large data with low I/O rate.


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

DynamoDB Streams captures a time-ordered sequence of item-level modifications in any DynamoDB table and stores this information in a (encrypted) log for up to 24 hours.

Applications can access this log and view the data items as they appeared before and after they were modified, in near-real time.

Accessed using a dedicated endpoint.

By default, just the Primary key is recorded.

Before and after images can be captured.

Events are recorded in near real-time.

Applications can take actions based on contents.

The records are broken into shards to make it manageable.

A stream can be an event source for Lambda.

You can combine with Lambda functions for functionality like stored procedures based on a DynamoDB streams event.


## DynamoDB Time To Live (TTL)

Automatically deletes an item after an expiry date / time.

Expired items are marked for deletion.

Great for removing irrelevant or old data such as:
- Session data.
- Event logs.
- Temporary data.

No extra cost and does not use WCU / RCU.

TTL is a background task operated by DynamoDB.

A TTL helps reduce storage and manage the table size over time.

The TTL is enabled per row (you define a TTL column and add the expiry date / time there).

DynamoDB typically deletes expired items within 48 hours of expiration.

Deleted items are also deleted from the LSI / GSI.

DynamoDB streams can help recover expired items.