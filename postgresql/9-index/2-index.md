# Indexes

You can create indexes on tables (with the exception of foreign tables) as well as materialized views.

Index names must be unique within a given schema.

## PostgreSQL Indexes

### B-Tree

If PostgreSQL automatically creates an index for you or you don’t bother specifying the index method, B-Tree will be chosen. 

It is currently the only indexing method for primary keys and unique keys.


### BRIN

Block range index (BRIN) is designed specifically for very large tables where using an index such as B-Tree would take up too much space and not fit in memory.

The approach of BRIN is to treat a range of pages as one unit. 

BRIN indexes are much smaller than B-Tree and other indexes and faster to build. But they are slower to use and can’t be used for primary keys or certain other situations.


### GiST

Generalized Search Tree (GiST) is an index optimized for FTS

GiST is a lossy index, in the sense that the index itself will not store the value of what it’s indexing, but merely a bounding value such as a box for a polygon. 

This creates the need for an extra lookup step if you need to retrieve the value or do a more fine-tuned check.


### GIN

Generalized Inverted Index (GIN) is geared toward the built-in full text search and binary json data type of PostgreSQL.

GIN is a descendent of GiST but without the lossiness. GIN is faster than GiST.

The index is larger and updating the index is slower than a comparable GiST index.


## Functional Indexes

```sql
CREATE INDEX index_name ON table_name [USING method]
(
  column_name [ASC | DESC] [NULLS {FIRST | LAST }],
  ...
);
```

Create a functional index for uppercase value of the fullname column:

```sql
CREATE INDEX idx ON featnames_short 
USING btree (upper(fullname) varchar_pattern_ops);
```

The planner will be able to use the index for this query:

```sql
SELECT fullname 
FROM featnames_short 
WHERE upper(fullname) LIKE 'S%';
```


## Partial Indexes

Partial indexes are indexes that cover only rows fitting a predefined `WHERE` condition. Partial indexes let you place uniqueness constraints only on some rows of the data.

```sql
CREATE TABLE subscribers (
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL, type varchar(50),
  is_active boolean
);
```

We add a partial index to guarantee uniqueness only for active subscribers:

```sql
CREATE UNIQUE INDEX uq ON subscribers 
USING btree(lower(name)) WHERE is_active;
```

In order for the index to be considered by the planner, the conditions used when creating the index must be a part of your WHERE condition, and any functions used in the index must also be used in the query filter. 

## Multicolumn Indexes

```sql
CREATE INDEX idx ON subscribers 
USING btree (type, upper(name) varchar_pattern_ops);
```

If you have a multicolumn B-Tree index, there is no need for an index on a single column

## List all indexes belong to a table

```sql
SELECT 
  idx.indrelid :: REGCLASS AS table_name, 
  i.relname AS index_name, 
  idx.indisunique As is_unique, 
  idx.indisprimary AS is_primary 
FROM 
  pg_index As idx 
  JOIN pg_class AS i ON i.oid = idx.indexrelid 
WHERE 
  idx.indrelid = 'line_items'::regclass;
```


## List all indexes of the schema `public`

```sql
SELECT
    tablename,
    indexname
FROM
    pg_indexes
WHERE
    schemaname = 'public'
    AND indexname ILIKE 'IDX_%'
ORDER BY
    tablename,
    indexname;
```