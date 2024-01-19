# Multi-AZ

Amazon Aurora gives you two options for Multi-AZ: **single-master** and **multi-master**.

## Single-Master

A single-master cluster consists of a primary instance, optionally Aurora replicas.

A cluster is synchronously replicated across three AZs.

In the event the primary instance fails:
- If no replicas exist, Aurora will create a new primary instance to replace the failed one
- If a replica exists, Aurora will promote the replica to the primary (less than two minutes).


## Multi-Master

Higher availability than Single-Master.

All the nodes in the cluster are read/write nodes.

When one instance fails, no failover occurs, as long as at least one database instance is running, you can read from and write to the database.

The failure of a writer node merely requires the application (using the writer) to open connections to another writer.

Provides ACID transactions across a cluster of database nodes with configurable **read after write consistency**.

Available on Aurora MySQL 5.6-compatible edition.