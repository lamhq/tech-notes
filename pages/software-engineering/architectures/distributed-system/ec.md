# Eventual consistency

## Overview
Eventual consistency is a **consistency model** used in distributed computing to achieve high availability that informally guarantees that, if no new updates are made to a given data item, eventually all accesses to that item will return the last updated value.

Here's how it works:
- When an update occurs, it is propagated to all replicas of the data store over time.
- During this propagation, queries for the data may return the old value until the new value is fully propagated.
- The system does not guarantee immediate consistency but ensures that if no new updates are made, eventually all replicas will be consistent.

This model is used in systems where availability and partition tolerance are prioritized over immediate consistency. 

For example, Amazon's DynamoDB and Apache Cassandra are designed with eventual consistency in mind to provide high availability and fault tolerance.

Eventually-consistent services are often classified as providing BASE semantics, in contrast to traditional ACID.


## Conflict resolution

In order to ensure replica convergence, a system must reconcile differences between multiple copies of distributed data. This consists of two parts:
- exchanging versions or updates of data between servers 
- choosing an appropriate final state when concurrent updates have occurred, called reconciliation.

A widespread approach to reconciliation is "last writer wins". Another is to invoke a user-specified conflict handler. Timestamps and vector clocks are often used to detect concurrency between updates

When multiple writes occur at the same time, they need to be reconciled to ensure data consistency:
- **Read repair**: If there's a data inconsistency found during a read operation, the system will correct it on-the-fly before returning the data to the user. This ensures the user always gets the correct data, but it can slow down the read operation because the system must fix the data first.
- **Write repair**: When a write operation occurs, the system checks for inconsistencies and fixes them as part of the write process. This can slow down the write operation because it involves additional steps to ensure consistency.
- **Asynchronous repair**: This method decouples the correction process from both read and write operations. The system will periodically check for inconsistencies and fix them in the background. This doesn't slow down reads or writes directly but requires a separate process to maintain consistency.


## Strong eventual consistency

**Strong Eventual Consistency (SEC)** is a consistency model in distributed computing that ensures that, eventually, all replicas of the data will converge to the same state if they have received the same set of updates, regardless of the order in which those updates were received.

If the system is monotonic, the application will never suffer rollbacks:
- **Monotonic**: once a certain state has been reached by a node in the system, it will not regress to an earlier state. This property prevents the system from experiencing rollbacks, which can be disruptive and confusing for users.

A common approach to ensure SEC is conflict-free replicated data types:
- **Conflict-Free Replicated Data Types (CRDTs)** are data structures designed to handle the distributed nature of the data across nodes without conflicts. They allow for concurrent updates that don't interfere with one another, and they ensure convergence to a consistent state without needing complex resolution strategies.
- CRDTs are a key part of achieving SEC because they provide a way to manage updates that might happen out of order or concurrently, without resulting in conflicts that need to be resolved.