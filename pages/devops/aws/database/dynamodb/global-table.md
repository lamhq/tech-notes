# Global Tables

## Overview

Global Tables are managed multi-master, multi-region replication. 

It's a way to replicate your tables from one to another region. For disaster recovery or high availability.

Great for globally distributed applications.

Need to turn on on DynamoDB Streams to enable this.

Replication latency under 1 second.

Work transparently. No code rewrites.


## Definitions

A **global table** is a collection of one or more replica tables, all owned by a single AWS account.

A **replica table** is a single DynamoDB table that functions as a part of a global table. 
  - Each replica stores the same set of data items.
  - Any given global table can only have one replica table per region.


## How it works?

When you create a global table, you specify the AWS regions where you want the table to be available.

DynamoDB performs all the necessary tasks to create identical tables in these regions and propagate ongoing data changes to all of them.

You can add replica tables to the global table, so that it can be available in additional AWS regions.

With a global table, each replica table stores the same set of data items. DynamoDB does not support partial replication of only some of the items.

An application can read and write data to any replica table. If your application only uses eventually consistent reads, and only issues reads against one AWS region, then it will work without any modification.

However, if your application requires strongly consistent reads, then it must perform all its strongly consistent reads and writes in the same region. DynamoDB does not support strongly consistent reads across AWS regions.

It is important that each replica table and secondary index in your global table has identical write capacity settings to ensure proper replication of data.