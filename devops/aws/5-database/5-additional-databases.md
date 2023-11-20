# AWS Database Services

AWS has a variety of different database options for different use cases. 

## Graph

You can use Amazon Neptune to build and run applications that work with highly connected datasets, such as recommendation engines, fraud detection, and knowledge graphs.

Use Cases: Fraud detection, social networking, recommendation engines

## Ledger

Amazon Quantum Ledger Database (Amazon QLDB) is a ledger database service. 

You can use Amazon QLDB to review a complete history of all the changes that have been made to your application data.

Use Cases: Systems of record, supply chain, registrations, banking transactions

## Blockchain

Amazon Managed Blockchain is a service that you can use to create and manage blockchain networks with open-source frameworks.

Blockchain is a distributed ledger system that lets multiple parties run transactions and share data without a central authority.


## In-memory

**ElastiCache** is a service that adds caching layers on top of your databases to help improve the read times of common requests. 

It supports two types of data stores: Redis and Memcached.

Use Cases: Caching, session management, gaming leaderboards, geospatial applications.


## Time series

Amazon Timestream

Use Cases: IoT applications, DevOps, industrial telemetry

## Key-value

Amazon DynamoDB.

Use Cases: High-traffic web apps, e-commerce systems, gaming applications.


## Breaking Up Applications and Databases

Today, with larger applications, you no longer see just one database supporting it. Instead, these applications are being broken into smaller services, each with their own purpose-built database supporting it.

This shift removes the idea of a one-size-fits-all database and replaces it with a complimentary database strategy. You can give each database the appropriate functionality, performance, and scale that the workload requires.