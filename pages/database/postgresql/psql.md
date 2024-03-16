# psql

## Get help on psql commands

To know all available psql commands:

```sh
\?
```

To get help on specific PostgreSQL statement, you use the `\h` command:

```sh
\h ALTER TABLE
```


## Executing Shell Commands

In psql, you can call out to the OS shell with the `\!` command


## Dynamic SQL Execution

Suppose you wanted to construct SQL statements to run based on the output of a query, you can execute generated SQL in a single step with the new `\gexec` command. Iteration is first by row then by column.

Using gexec to create tables and insert data:

```sql
SELECT
  'CREATE TABLE ' || person.name || '( a integer, b integer)' As create,
  'INSERT INTO ' || person.name || ' VALUES(1,2) ' AS insert
FROM (VALUES ('leo'),('regina')) AS person (name) 
\gexec
```

Using gexec to retrieve counts of records in each table:

```sql
SELECT 
  'SELECT ' || quote_literal(table_name) || ' AS table_name, COUNT(*) As count FROM ' || quote_ident(table_name) AS cnt_q
FROM information_schema.tables
WHERE table_name IN ('leo','regina') \gexec
```
