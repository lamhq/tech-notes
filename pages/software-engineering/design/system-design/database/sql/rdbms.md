# Relational Databases (RDBMS)

## Overview

RDBMS are optimized for OLTP workloads requiring fast reading and updating a large number of rows.

RDBMSs are row-oriented databases.

The data is organized in tables. Tables are normalized for reduced data redundancy and better data integrity.

Tables may have primary and foreign keys:
- Primary Key is a minimal set of attributes (columns) that uniquely identifies a record (row) in a table.
- Foreign Key establishes relationships between tables. It is a set of attributes in a table that refers to the primary key of another table.

Query and transactions are expressed using Standard Query Language (SQL).

Relational databases are optimized for transaction operations. 

Indexes are optimized for frequent low-latency writes of ACID Transactions.

Database options:
- Cloud Agnostic: Oracle, Microsoft SQL Server, IBM DB2, PostgreSQL, and MySQL
- AWS: Hosted PostgreSQL and MySQL in Relational Database Service (RDS)
- Microsoft Azure: Hosted SQL Server as Azure SQL Database
- Google Cloud: Hosted PostgreSQL and MySQL in Cloud SQL, and also horizontally scaling Cloud Spanner


## ACID Transactions

**Atomicity**: Any transaction that updates multiple rows is treated as a single unit. A successful transaction performs all updates. A failed transaction performs none of the updates, i.e., the database is left unchanged.

**Consistency**: Every transaction brings the database from one valid state to another. It guarantees to maintain all database invariants and constraints.

**Isolation**: Concurrent execution of multiple transactions leaves the database in the same state as if the transactions were executed sequentially.

**Durability**: Committed transactions are permanent, and survive even a system crash.
