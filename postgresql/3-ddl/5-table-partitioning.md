# Table Partitioning

## Overview

Partitioning refers to splitting what is logically one large table into smaller physical pieces. Partitioning can provide several benefits:

- Query performance can be improved dramatically
- When queries or updates access a large percentage of a single partition, performance can be improved by using a sequential scan of that partition instead of using an index
- Bulk loads and deletes can be accomplished by adding or removing partitions
- Seldom-used data can be migrated to cheaper and slower storage media.

PostgreSQL offers built-in support for the following forms of partitioning:

- **Range Partitioning**: The table is partitioned into “ranges” defined by a key column or set of columns, with no overlap between the ranges of values assigned to different partitions.
- **List Partitioning**: The table is partitioned by explicitly listing which key value(s) appear in each partition.
- **Hash Partitioning**: The table is partitioned by specifying a modulus and a remainder for each partition.


## Declarative Partitioning

The table that is divided is referred to as a partitioned table. The declaration includes the *partitioning method* as described above, plus a list of columns or expressions to be used as the *partition key*.

The partitioned table itself is a “virtual” table having no storage of its own. Instead, the storage belongs to partitions, which are otherwise-ordinary tables associated with the partitioned table.

All rows inserted into a partitioned table will be routed to the appropriate one of the partitions based on the values of the partition key column(s).

Updating the partition key of a row will cause it to be moved into a different partition if it no longer satisfies the partition bounds of its original partition.

Although all partitions must have the same columns as their partitioned parent, partitions may have their own indexes, constraints and default values, distinct from those of other partitions.

It is not possible to turn a regular table into a partitioned table or vice versa. However, it is possible to add an existing regular or partitioned table as a partition of a partitioned table, or remove a partition from a partitioned table turning it into a standalone table.


## Example

Suppose we are constructing a database for a large ice cream company. Conceptually, we want a table like:

```sql
CREATE TABLE measurement (
    city_id         int not null,
    logdate         date not null,
    peaktemp        int,
    unitsales       int
);
```

To reduce the amount of old data that needs to be stored, we decide to keep only the most recent 3 years worth of data. At the beginning of each month we will remove the oldest month's data.

To use declarative partitioning in this case, use the following steps:

1. Create the `measurement` table as a partitioned table by specifying the `PARTITION BY` clause, which includes the partitioning method (`RANGE` in this case) and the list of column(s) to use as the partition key.

```sql
CREATE TABLE measurement (
    city_id         int not null,
    logdate         date not null,
    peaktemp        int,
    unitsales       int
) PARTITION BY RANGE (logdate);
```

2. Create partitions. Each partition's definition must specify bounds that correspond to the partitioning method and partition key of the parent.

It is possible to specify a tablespace and storage parameters for each partition separately.

```sql
CREATE TABLE measurement_y2006m02 PARTITION OF measurement
    FOR VALUES FROM ('2006-02-01') TO ('2006-03-01');

CREATE TABLE measurement_y2007m12 PARTITION OF measurement
    FOR VALUES FROM ('2007-12-01') TO ('2008-01-01')
    TABLESPACE fasttablespace;
```

Inserting data into the parent table that does not map to one of the existing partitions will cause an error; an appropriate partition must be added manually.

3. Create an index on the key column(s), as well as any other indexes you might want, on the partitioned table. This automatically creates a matching index on each partition, and any partitions you create or attach later will also have such an index. 

```sql
CREATE INDEX ON measurement (logdate);
```

4. Ensure that the `enable_partition_pruning` configuration parameter is not disabled in `postgresql.conf`. If it is, queries will not be optimized as desired.


## Partition Maintenance

It is common to want to remove partitions holding old data and periodically add new partitions for new data. 

The simplest option for removing old data is to drop the partition that is no longer necessary:

```sql
DROP TABLE measurement_y2006m02;
```

Another option that is often preferable is to remove the partition from the partitioned table but retain access to it as a table in its own right:

```sql
ALTER TABLE measurement DETACH PARTITION measurement_y2006m02;
```

Similarly we can add a new partition to handle new data:

```sql
CREATE TABLE measurement_y2008m02 PARTITION OF measurement
    FOR VALUES FROM ('2008-02-01') TO ('2008-03-01')
    TABLESPACE fasttablespace;
```

It is sometimes more convenient to create the new table outside the partition structure, and make it a proper partition later:

```sql
CREATE TABLE measurement_y2008m02
  (LIKE measurement INCLUDING DEFAULTS INCLUDING CONSTRAINTS)
  TABLESPACE fasttablespace;

ALTER TABLE measurement_y2008m02 ADD CONSTRAINT y2008m02
   CHECK ( logdate >= DATE '2008-02-01' AND logdate < DATE '2008-03-01' );

ALTER TABLE measurement ATTACH PARTITION measurement_y2008m02
    FOR VALUES FROM ('2008-02-01') TO ('2008-03-01' );   
```