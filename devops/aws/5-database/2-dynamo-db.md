# Amazon DynamoDB

## What Is Amazon DynamoDB?

Amazon DynamoDB is a fully managed NoSQL database service.

DynamoDB lets you offload the administrative burdens of operating and scaling a distributed database so that you don't have to worry about hardware provisioning, setup and configuration, replication, software patching, or cluster scaling. 

You can scale up or scale down your tables' throughput capacity without downtime or performance degradation.

DynamoDB automatically spreads the data and traffic for your tables over a sufficient number of servers to handle your throughput and storage requirements, while maintaining consistent and fast performance.

All of your data is stored on solid-state disks (SSDs) and is automatically replicated across multiple Availability Zones in an AWS Region, providing built-in high availability and data durability. 


## Core Components

A table is a collection of items. Each table contains zero or more items. An item is a group of attributes that is uniquely identifiable among all of the other items. An attribute is a fundamental data element, something that does not need to be broken down any further. 

*For example, a table called People that you could use to store personal contact information about friends, family, or anyone else of interest. In a People table, each item represents a person. An item in a People table contains attributes called PersonID, LastName, FirstName, and so on.*