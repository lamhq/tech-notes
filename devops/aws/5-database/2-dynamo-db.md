# Amazon DynamoDB

## What Is Amazon DynamoDB?

Amazon DynamoDB is a key-value database service.

- **Serverless**: DynamoDB is serverless, which means that you do not have to provision, patch, manage servers, install, maintain, or operate software.. 
- **Automatic Scaling**: As the size of your database shrinks or grows, DynamoDB automatically scales to adjust for changes in capacity while maintaining consistent performance. 

By using DynamoDB, you can offload the administrative burdens of operating and scaling a distributed database so that you can reduce your need to handle hardware provisioning, setup and configuration, replication, software patching, or cluster scaling.

DynamoDB also offers encryption at rest, which reduces your operational burden and the complexity involved in protecting sensitive data. 

You can scale up or scale down your tables' throughput capacity with minimal downtime or performance degradation.

All of your data is stored on solid-state disks (SSDs) and is automatically replicated across multiple Availability Zones in an AWS Region, providing built-in high availability and data durability. 


## Core Components

A table is a collection of items. Each table contains zero or more items. An item is a group of attributes that is uniquely identifiable among all of the other items. An attribute is a fundamental data element, something that does not need to be broken down any further. 

*For example, a table called People that you could use to store personal contact information about friends, family, or anyone else of interest. In a People table, each item represents a person. An item in a People table contains attributes called PersonID, LastName, FirstName, and so on.*


## Amazon DynamoDB Streams

DynamoDB Streams captures a time-ordered sequence of item-level modifications in any DynamoDB table, and stores this information in a log for up to 24 hours.

Encryption at rest is applied to the data in DynamoDB Streams for security.

DynamoDB Streams helps ensure the following:
- Each stream record appears exactly one time in the stream.
- For each item that is modified in a DynamoDB table, the stream records appear in the same sequence as the actual modifications to the item.

DynamoDB Streams writes stream records in near-real time so that you can build applications that consume these streams and take action based on the contents.

You can enable a stream on a new table during its creation using the AWS CLI or one of the AWS SDKs.

DynamoDB Streams operates asynchronously, and enabling a stream doesn't affect the performance of the table.