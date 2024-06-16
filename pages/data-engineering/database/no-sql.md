# NoSQL Database

## Overview

NoSQL databases cater to semi-structured data types: key-value, wide column, document (tree), and graph.


## Use cases

### In-memory Key-Value Data

Same as a key-value store, but the data is in the memory instead of on the disk.

It eliminates the disk IO overhead and serves as a fast cache.


### Time Series Data

A time series is a series of data points, indexed and ordered by timestamp.

The timestamp is the key in the Time Series datastores.

A time series can be modeled as:
- Key-value: associated pairs of timestamps and values
- Wide column: with the timestamp as the key for the table


### Immutable Ledger Data

Immutable Ledger is for maintaining an immutable and (cryptographically) verifiable transaction log owned by a central trusted authority.

Options:
- Amazon QLDB
- Azure SQL Ledger
- Hyperledger Fabric

In analytics use cases, a columnar database can be used for time-series data as well.


### Geospatial Data

A Geospatial database is a database to store geographic data (such as countries, cities, etc.). It is optimized for geospatial queries and geometric operations.

A wide column, key-value, document, or relational database with geospatial queries is commonly used for this purpose:
- PostGIS extension to PostgreSQL
- GeoJSON objects in MongoDB

In analytics use cases, a columnar database may suit better.


### Text Search Data

Text search can either be plain or rich (e.g. PDF), stored in a document database, or stored in a blob store.

Elastic Search has been a popular solution.
