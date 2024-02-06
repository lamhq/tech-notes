# psql

## Connection Environment Variables

You can specify your connection settings for psql using environment variables:

- `PGHOST`
- `PGPORT`
- `PGUSER`
- `PGPASSWORD`


## Specifying password

To specify password to connect to database without expose it in the command line, add following line to the file `~/.pgpass`, :

```
localhost:5432:mobilesc_dev:postgres:abc@123!
```


## Dump database schema

This command will dump database schema to a sql file with no password prompt:

```shell
PGPASSWORD=YOUR_PASSRORD pg_dump -U postgres -h localhost mobilesc_db -s > schema.sql
```

## Execute sql file

To execute a file, use the `-f` option, as in the following:

```sh
psql -f some_script_file
```

To execute SQL on the fly, use the `-c` option:

```sql
psql -d postgresql_book -c "DROP TABLE IF EXISTS dross; CREATE SCHEMA staging;"
```

## Get help on psql commands

To know all available psql commands:

```sh
\?
```

To get help on specific PostgreSQL statement, you use the `\h` command:

```sh
\h ALTER TABLE
```

## Connect to db server

```shell
psql -h host -d database -U user -W

psql 'postgresql://user:pwd@host:port/database'
```

## Switch connection to a new database

```sh
\c dbname username

\c dbname
```

## List available databases

To list all databases in the current PostgreSQL database server, you use `\l` command:

```sh
\l
```

## List available tables

```sh
\dt
```

## Describe a table

```sh
\d table_name
```

List all tables and their sizes on disk in the `public` schema that begins with the letters `pg_t`:

```sh
\dt+ public.pg_t*
```

## List available schema

```sh
\dn
```

## List available functions

```sh
\df
```

## List available views

```sh
\dv
```

## List users and their roles

```sh
\du
```

## Executing Shell Commands

In psql, you can call out to the OS shell with the `\!` command


## Watching Statements

The `\watch` command is used to repeatedly run an SQL statement at fixed intervals so you can monitor the output.

Watching connection traffic every 10 seconds:

```sql
SELECT datname, query
FROM pg_stat_activity
WHERE state = 'active' AND pid != pg_backend_pid();
\watch 10
```

To kill a watch, use `CTRL-X` `CTRL-C`.

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
