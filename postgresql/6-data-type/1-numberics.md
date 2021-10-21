# Numerics

## Serials

`Serial` and its bigger sibling, `bigserial`, are auto-incrementing integers often used as primary keys of tables

When you create a table and specify a column as `serial`, PostgreSQL first creates an `integer` column and then creates a sequence object named `table_name_column_name_seq` located in the same schema as the table.

It then sets the default of the new integer column to read its value from the sequence. If you drop the column, PostgreSQL also drops the companion sequence object.

You can use the same sequence across multiple tables. The cross-table sharing of the same sequence comes in handy when you’re assigning a universal key in your database.

**Using existing sequence for new tables:**

```sql
CREATE SEQUENCE s START 1;
CREATE TABLE stuff(
  id bigint DEFAULT nextval('s') PRIMARY KEY, 
  name text
);
```

## Generate Series Function

PostgreSQL has a nifty function called `generate_series`. It allows you to effectively mimic a for loop in SQL

The function comes in two forms:
- One is a numeric version that creates a sequence of integers incremented by some value
- one that creates a sequence of dates or timestamps incremented by some time interval.

```
generate_series(default, max, step)
```

```sql
SELECT x FROM generate_series(1,51,13) As x;
```

```
x
----
1
14 
27 
40
```