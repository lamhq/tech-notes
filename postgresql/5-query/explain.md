# PostgreSQL EXPLAIN

The `EXPLAIN` shows how tables involved in a statement will be scanned by index scan or sequential scan, etc., and if multiple tables are used, what kind of join algorithm will be used.

The following shows the syntax of the EXPLAIN statement:

```sql
EXPLAIN [ ( option [, ...] ) ] sql_statement;
```

where `option` can be one of the following:

```sql
ANALYZE [ boolean ]
VERBOSE [ boolean ]
COSTS [ boolean ]
BUFFERS [ boolean ]
TIMING [ boolean ]  
SUMMARY [ boolean ]
FORMAT { TEXT | XML | JSON | YAML }
```

- `ANALYZE`: causes the `sql_statement` to be executed first and then actual run-time statistics in the returned information including total elapsed time expended within each plan node and the number of rows it actually returned. You should wrap the `EXPLAIN ANALYZE` in a transaction for `INSERT`, `UPDATE`, or `DELETE` statement.
- `FORMAT`: Specify the output format of the query plan such as `TEXT`, `XML`, `JSON`, and `YAML`.


## Examples

```sql
EXPLAIN SELECT * FROM film;

EXPLAIN SELECT * FROM film WHERE film_id = 100;

EXPLAIN (COSTS FALSE) SELECT * FROM film WHERE film_id = 100;

EXPLAIN
SELECT
  f.film_id,
  title,
  name category_name
FROM
  film f
  INNER JOIN film_category fc 
    ON fc.film_id = f.film_id
  INNER JOIN category c 
    ON c.category_id = fc.category_id
ORDER BY
  title;
```
