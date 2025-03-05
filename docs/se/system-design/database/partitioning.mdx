# Partitioning

## Overview

Partitioning is a technique that divides a single database table into smaller, more manageable pieces called partitions.

Each partition holds a subset of the table's data based on specific criteria.


## Types of Partitioning

- **Horizontal Partitioning**: Splits the table into rows. Each partition contains a subset of the rows.
- **Vertical Partitioning**: Splits the table into columns. Each partition contains a subset of the columns.


## Benefits

- Enhances query performance on tables by reducing the amount of data scanned.
- Helps build smaller indexes that can fit into memory.
- Simplifies maintenance tasks like backups and indexing within a single database instance.


## Downsides

- Complexity of maintainance. You need to remember to add/remove partitions based your partitioning strategy.
- Querying data from all partitions is expensive
- Harder to maintain uniqueness across partitions


## Partitioning strategies

### List Partitioning

Data is divided based on a predefined list of values. Each partition contains rows that match one of the specified values.

Useful when you have a limited number of discrete values, such as categorizing data by country or department.

**Example**: Partitioning a customer table by country, where each partition contains customers from a specific country.

**Cons**:
- Uneven data distribution
- Need to move data between tables when a record change its value.


### Range Partitioning

Data is divided based on a range of values. Each partition holds rows where the partition key falls within a specific range.

Ideal for data that naturally falls into ranges, such as dates or numerical values.

**Example**: Partitioning a sales table by month, where each partition contains sales data for a specific month.

**Pros**:
- You can get rid of old data

**Cons**:
- Uneven data distribution


### Hash Partitioning

Data is divided based on a hash function applied to the partition key. The hash function distributes rows evenly across partitions (e.g., modulo function).

Effective for evenly distributing data when there is no natural range or list to partition by.

**Example**: Partitioning a user table by user ID, where the hash function ensures an even distribution of users across partitions.

**Pros**:
- Uneven data distribution

**Cons**:
- Works only if data is accessed by key
- Changing number of partitions is hard