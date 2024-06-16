# Choose the right data storage

## Guide

Goal: choose the right databases for the right data type and the right operation.

It is better to think about the use case and pick the datastore suitable for your application.

A datastore that serves multiple use cases may help reduce the overhead.

For analytics use cases, a tabular columnar database is often more suitable than a NoSQL database.

Datastores with in-built operations suitable for the use case are preferred (instead of implementing those operations in each application).


## Database Decision Tree

- Structured Data
  - OLTP workload: ACID, transactions
    - **Relational Databases**
  - OLAP workload: Analytics
    - **Columnar Databases**
- Semi structured Data:
  - Dictionary:
    - **Key-value Databases**
      - For Caching:
        - **In-memory Databases**
  - 2D Key-Value:
    - **Wide Column Databases**
      - Time Series:
        - **Time Series Database**
      - Audit Trail:
        - **Immutable Ledger Database**
      - Location & Geo-entities:
        - **Geospatial Database**
  - Entity-Relationships:
    - **Graph Databases**
  - Nested Objects: XML, JSON
    - **Document Database**
      - Full Text Search:
        - **Text Search Databases**
- Unstructured Data: images, videos, recordings, documents
  - **Blob storage**

![](https://www.ml4devs.com/images/illustrations/sql-vs-nosql-cheatsheet.webp)


## SQL vs. NoSQL

![](https://www.ml4devs.com/images/illustrations/sql-vs-nosql-comparision.webp)

### Scaling

RDBMS scale vertically. You need to upgrade hardware (more powerful CPU, higher storage capacity) to handle the increasing load. RDBMS did not scale horizontally for Big Data.

NoSQL datastores offer horizontal scale at various CAP Theorem tradeoffs. NoSQL is better at handling partitioned data, so you can scale by adding more machines.


### Data Model

- RDBMS databases are used for normalized structured (tabular). Data strictly adhering to a relational schema. Not all data fits into strict RDBMS schema.
- NoSQL datastores are used for non-relational data, e.g. key-value, document tree, graph. 

### Transaction Guarantees

- All RDBMS databases support ACID transactions
- Most NoSQL datastores offer BASE transactions. Only a few NoSQL datastores are ACID-complaint.


### Performance

RDBMS are designed for fast transactions updating multiple rows across tables with complex integrity constraints. It will optimize your query (SQL) and find the best execution plan.

NoSQL datastores are designed for efficiently handling a lot more data than RDBMS. NoSQL offers performance at a higher scale (typically by giving up strong consistency). 


## References

- [SQL vs. NoSQL Database: When to Use, How to Choose](https://www.ml4devs.com/articles/datastore-choices-sql-vs-nosql-database/)
