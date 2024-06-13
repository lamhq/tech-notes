# Choose the right data storage

## Database Decision Tree

Choose the right databases for the right data type and the right job:
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


## References

- [SQL vs. NoSQL Database: When to Use, How to Choose](https://www.ml4devs.com/articles/datastore-choices-sql-vs-nosql-database/)
