# Performance Tuning Queries in PostgreSQL

## Finding Slow Queries

### `pg_stats_statements`

The [pg_stats_statements](https://www.postgresql.org/docs/current/pgstatstatements.html) module tracks execution statistics of SQL statements

```sql
SELECT *
FROM
  pg_stat_statements
ORDER BY
  total_time DESC;
```


## `auto_explain`

The [auto_explain](http://www.postgresql.org/docs/current/static/auto-explain.html) module is also helpful for finding slow queries but has 2 distinct advantages

- `log_nested_statements`: logs the actual execution plan and supports logging nested statements
- `log_min_duration`: controls which query execution plans are logged, based on how long they perform. for example if you set this to 1000, all statments that run longer than 1 second will be logged.


## Index Tuning

Ensure indexes are being properly used. As a prerequsite, we need to turn on the [Statistics Collector](https://www.postgresql.org/docs/current/monitoring-stats.html).

### Missing Indexes

If you have The Statistics Collector turned on, you can run the following query:

```sql
SELECT
  relname,
  seq_scan - idx_scan AS too_much_seq,
  CASE
    WHEN
      seq_scan - coalesce(idx_scan, 0) > 0
    THEN
      'Missing Index?'
    ELSE
      'OK'
  END,
  pg_relation_size(relname::regclass) AS rel_size, seq_scan, idx_scan
FROM
  pg_stat_all_tables
WHERE
  schemaname = 'public'
  AND pg_relation_size(relname::regclass) > 80000
ORDER BY
  too_much_seq DESC;
```

This finds tables that have had more Sequential Scans than Index Scans, This isn’t going to tell you which columns to create the index.

### Unused Indexes

To find unused indexes you can run the following command:

```sql
SELECT
  indexrelid::regclass as index,
  relid::regclass as table,
  'DROP INDEX ' || indexrelid::regclass || ';' as drop_statement
FROM
  pg_stat_user_indexes
  JOIN
    pg_index USING (indexrelid)
WHERE
  idx_scan = 0
  AND indisunique is false;
```


## Understanding Execution Plans

### `EXPLAIN`

When using `EXPLAIN` for tuning, I recommend always using the `ANALYZE` option, the `ANALYZE` option actually executes the statement.

```sql
EXPLAIN ANALYZE SELECT
  "item"."id" AS "item_id"
FROM
  "feed_items" "item"
WHERE
  "item"."type" = 'target'
  AND "item"."company_id" = 5
  AND NOT ("item"."cat_id" = 367)
  AND NOT ("item"."dep_id" = 450)
  AND ("item"."deleted_at" IS NULL)
ORDER BY
  "item"."last_interaction" DESC,
  "item"."updated_at" DESC
LIMIT 10;
```

```
Limit  (cost=170.16..170.19 rows=10 width=20) (actual time=2.215..2.226 rows=10 loops=1)
   ->  Sort  (cost=170.16..173.06 rows=1158 width=20) (actual time=2.205..2.211 rows=10 loops=1)
         Sort Key: last_interaction DESC, updated_at DESC
         Sort Method: top-N heapsort  Memory: 26kB
         ->  Seq Scan on feed_items item  (cost=0.00..145.14 rows=1158 width=20) (actual time=0.102..1.714 rows=954 loops=1)
               Filter: ((deleted_at IS NULL) AND (cat_id <> 367) AND (dep_id <> 450) AND ((type)::text = 'target'::text) AND (company_id = 5))
               Rows Removed by Filter: 2653
 Planning Time: 0.718 ms
 Execution Time: 2.613 ms
```


### Nodes

Each indented block with a preceeding “->” (along with the top line) is called a node.

A node is a logical unit of work with an associated cost and execution time. The costs and times presented at each node are cumulative and roll up all child nodes.

The very top line (node) shows a cumulative cost and actual time for the entire statement. This is important because you can easily drill down to determine which node(s) are the bottleneck(s).

```
Limit  (cost=170.16..170.19
...
```


### Cost

```
cost=146.63..148.65
```

The first number (`146.63`) is start up cost (cost to retrieve first record) and the second number (`148.65`) is the cost incurred to process entire node (total cost from start to finish).

The cost is effectively how much work PostgreSQL estimates it will have to do to run the statement. This number is not how much time is required  (although there is usually direct correlation to time required for execution).

Cost is a combination of 5 work components used to estimate the work required:

- sequential fetch
- non-sequential (random) fetch
- processing of row
- processing operator (function)
- processing index entry

The optimizer makes its decision on which execution plan to use based on the the cost. Lower costs are preferred by the optimizer.


### Actual time

```
actual time=55.009..55.012
```

In milliseconds, the first number is start up time (time to retrieve first record) and the second number is the time taken to process entire node (total time from start to finish).

### References

- http://www.depesz.com/2013/04/16/explaining-the-unexplainable/
- https://wiki.postgresql.org/images/4/45/Explaining_EXPLAIN.pdf


## Query Tuning

Now that you know which statements are performing poorly and able see their execution plans, it is time to start tweaking the query to get better performance

### Indexes

- Eliminate Sequential Scans (Seq Scan) by adding indexes (unless table size is small)
- Use covering index where possible
- If using a multi-column index, put the columns which contain highly distinct values to the left most side of the index
- Create many indexes and compare them with `EXPLAIN ANALYZE`

### WHERE clause

- Avoid LIKE
- Avoid function calls in `WHERE` clause
- Avoid large `IN()` statements

### JOINs

- Use a simple equality statement in the ON clause (i.e. `a.id = b.person_id`)
- Convert subqueries to JOIN statements when possible as this usually allows the optimizer to understand the intent and possibly chose a better plan
- Use JOINs properly: Are you using GROUP BY or DISTINCT just because you are getting duplicate results? This usually indicates improper JOIN usage and may result in a higher costs
- Avoid [correlated subqueries](https://en.wikipedia.org/wiki/Correlated_subquery) where possible
- Use `EXISTS` when checking for existence of rows based on criterion because it “short-circuits”

### General guidelines

- Avoid `COUNT(*)`
- Avoid `ORDER BY`, `DISTINCT`, `GROUP BY`, `UNION` when possible because these cause high startup costs