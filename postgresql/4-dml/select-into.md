# PostgreSQL SELECT INTO

The PostgreSQL `SELECT INTO` statement creates a new table and inserts data returned from a query into the table.

The new table will have columns with the names the same as columns of the result set of the query.

Unlike a regular `SELECT` statement, the `SELECT INTO` statement does not return a result to the client.

Syntax of the PostgreSQL SELECT INTO statement:

```sql
SELECT
    select_list
INTO [ TEMPORARY | TEMP | UNLOGGED ] [ TABLE ] new_table_name
FROM
    table_name
WHERE
    search_condition;
```

The `TEMP` or `TEMPORARY` keyword is optional; it allows you to create a temporary table instead.

The `UNLOGGED` keyword if available will make the new table as an unlogged table.

Besides the `WHERE` clause, you can use other clauses such as `INNER JOIN`, `LEFT JOIN`, `GROUP BY`, and `HAVING`.