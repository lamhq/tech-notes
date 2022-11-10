# PostgreSQL SELECT DISTINCT

## Introduction

The `DISTINCT` clause keeps one row for each group of duplicates. 

The `DISTINCT` clause can be applied to one or more columns in the select list of the `SELECT` statement.

```sql
SELECT
  DISTINCT column1, column2
FROM
  table_name;
```

To keep the "first" row of each group of duplicates, use `DISTINCT ON (expression)`:

```sql
SELECT
   DISTINCT ON (column1) column_alias,
   column2
FROM
   table_name
ORDER BY
   column1,
   column2;
```

It is a good practice to always use the `ORDER BY` clause with the `DISTINCT ON(expression)` to make the result set predictable.

Notice that the `DISTINCT ON` expression must match the leftmost expression in the `ORDER BY` clause.