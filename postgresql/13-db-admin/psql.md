# psql

You can use psql to:

- execute scripts
- import and export data
- restore tables
- do other database administration
- generate reports


## Environment Variables

you can specify your connection settings using environment variables:

- `PGHOST`
- `PGPORT`
- `PGUSER`
- `PGPASSWORD`

## Specifying password using file `.pgpass`

Edit the file `~/.pgpass`, add following content:

```
localhost:5432:mobilesc_dev:postgres:abc@123!
```


## Connect to db server

```shell
psql -h <host> -p <port> -U <username> -W <password> <database>
```


## Interactive

Run psql interactively by typing `psql` from your OS command line

For SQL statements, terminate with a semicolon. If you press Enter without a semicolon, psql will assume that your statement continues to the next line.

Typing `\?` while in the psql console brings up a list of available commands.

Typing `\h` followed by the command will bring up the relevant sections of the PostgreSQL documentation pertaining to the command.

As with many command-line tools, you can use the up arrows in psql to recall commands.


## Noninteractive

To execute a file, use the `-f` option, as in the following:

```sh
psql -f some_script_file
```

To execute SQL on the fly, use the `-c` option:

```sql
psql -d postgresql_book -c "DROP TABLE IF EXISTS dross; CREATE SCHEMA staging;"
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


## Retrieving Details of Database Objects

List all tables and their sizes on disk in the `pg_catalog` schema that begins with the letters `pg_t`:

```sh
\dt+ pg_catalog.pg_t*
```

If you need further detail on a particular object, use the `\d+` command:


## Crosstabs

TBC


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


## Importing and Exporting Data

psql has a `\copy` command that lets you import data from and export data to a text file.

The tab is the default delimiter, but you can specify others. Newline breaks must separate the rows.

Don’t confuse the `\copy` command in psql with the COPY statement provided by the SQL language. Because psql is a client utility, all paths are interpreted relative to the connected client. The SQL copy is server-based and runs under the context of the postgres service OS account.


### Import

Importing data with psql:

```sh
\connect postgresql_book
\cd /postgresql_book/ch03
\copy staging.fCOPYactfinder_import FROM DEC_10_SF1_QTH1_with_ann.csv CSV
```

- we launch interactive psql
- connect to our database
- use `\cd` to change the current directory to the folder containing our file
- and import our data using the \copy command
- we augment our statement with `CSV` to tell psql that our data is comma-separated instead.

If your file has nonstandard delimiters such as pipes, indicate the delimiter as follows:

```sh
\copy sometable FROM somefile.txt DELIMITER '|';
```

You can replace null values with something of your own choosing by adding a `NULL AS`:

```sh
\copy sometable FROM somefile.txt NULL As '';
```

### Export

Export the loaded data back to a tab-delimited file:

```sh
\connect postgresql_book
\copy (SELECT * FROM staging.factfinder_import  WHERE s01 ~ E'^[0-9]+' ) TO '/test.tab' 
  WITH DELIMITER E'\t' CSV HEADER
```

Export header columns:

```sh
\connect postgresql_book
\copy staging.factfinder_import TO '/test.csv'
  WITH CSV HEADER QUOTE '"' FORCE QUOTE *
```

- `FORCE QUOTE *` double quotes all columns.


### Dump database schema

```bash
pg_dump -U postgres -h localhost mobilesc_db -s > schema.sql
```
