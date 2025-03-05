# Eventual consistency

## Overview

Eventual consistency is a **consistency model** used in distributed computing to achieve high availability.

Eventual consistency ensures that, given enough time without new updates, all replicas of a data item will converge to the same value.

Services that are eventually consistent are typically described as following BASE principles, which differ from the traditional ACID principles.

For example, Amazon's DynamoDB and Apache Cassandra are designed with eventual consistency in mind to provide high availability and fault tolerance.


## How it works

When an update occurs, it is propagated to all replicas of the data store over time.

During this propagation, queries for the data may return the old value until the new value is fully propagated.

The system does not guarantee immediate consistency, it will become consistent eventually.

Systems can continue to operate even if some replicas are temporarily out of sync.


## Conflict resolution

In order to ensure replica convergence, a system must reconcile differences between multiple copies of distributed data.

This consists of two parts:
- exchanging versions or updates of data between servers 
- choosing an appropriate final state when concurrent updates have occurred, called **reconciliation**.

When multiple writes occur at the same time, they need to be reconciled to ensure data consistency:
- **Read repair**: the system will correct data inconsistency during a read operation before returning the data to the user. it can slow down the read operation.
- **Write repair**: the system checks for inconsistencies and fixes them as part of the write process. This can slow down the write operation.
- **Asynchronous repair**: the system will periodically check for inconsistencies and fix them in the background. This doesn't slow down reads or writes directly but requires a separate process to maintain consistency.
