# Backup and Restore

`pg_dump` and `pg_dumpall` don't have password options.

You may also want to create a `~/.pgpass` file to store all passwords. Alternatively, you can set a password in the `PGPASSWORD` environment variable.

## Back up data

### `pg_dump`

- Use `pg_dump` to back up specific databases
- `pg_dump` can selectively back up tables, schemas, and databases.
- `pg_dump` can back up to plain SQL, as well as compressed, TAR, and directory formats.
- Compressed, TAR, and directory format backups can take advantage of the parallel restore feature of `pg_restore`.
- **Directory backups** allow parallel `pg_dump` of a large database.
- **The directory format optio**n backs up each table as a separate file in a folder and gets around file size limitations, results in multiple files.

#### Use `pg_dump` with no password prompt

```sh
PGPASSWORD=YOUR_PASSRORD pg_dump -h <host> -p <port> -U <user> mobilesc_db -s > schema.sql
```

#### Create a plain-text SQL backup

```sh
pg_dump -h <host> -p <port> -U <user> -F p --column-inserts \
  -f <output>.sql <database>
```

#### Create a plain-text single database backup

```sh
pg_dump -h localhost -p 5432 -U someuser -C -F p -b -v -f mydb.backup mydb
```

#### Create a compressed, single database backup

```sh
pg_dump -h localhost -p 5432 -U someuser -F c -b -v -f mydb.backup mydb
```

#### Create a compressed backup of tables whose names start with `pay` in any schema

```sh
pg_dump -h localhost -p 5432 -U someuser -F c -b -v -t *.pay* -f pay.backup mydb
```

#### Create a compressed backup of all objects in the `hr` and `payroll` schemas

```sh
pg_dump -h localhost -p 5432 -U someuser -F c -b -v \
  -n hr -n payroll -f hr.backup mydb
```

#### Create a compressed backup of all objects in all schemas, excluding the public schema

```sh
pg_dump -h localhost -p 5432 -U someuser -F c -b -v -N public \
  -f all_sch_except_pub.backup mydb
```

#### Create a directory format backup

```sh
pg_dump -h localhost -p 5432 -U someuser -F d -f /somepath/a_directory mydb
```

#### Directory format parallel backup

```sh
pg_dump -h localhost -p 5432 -U someuser -j 3 -Fd -f /somepath/a_directory mydb
```


### pg_dumpall

Use `pg_dumpall` to back up all databases on a server into a single plain-text file.

Restoring from a huge plain-text backup tries our patience.

#### Back up all globals and tablespace definitions only

```sh
pg_dumpall -h localhost -U postgres --port=5432 -f myglobals.sql -- globals-only
```

#### Back up specific global settings

```sh
pg_dumpall -h localhost -U postgres --port=5432 -f myroles.sql --roles- only
```


### pg_basebackup

Use `pg_basebackup` to do system-level disk backup of all databases.

`pg_basebackup` is the most efficient way of doing a full postgresql server cluster backup.

If you have a reasonably sized database, as in 500 GB or more, you should be using `pg_basebackup` as part of your backup strategy.


## Restoring Data

- Use `psql` to restore plain-text backups generated with `pg_dumpall` or `pg_dump`.
- Use `pg_restore` to restore compressed, TAR, and directory backups created with `pg_dump`.

### psql

#### restore a backup and ignore errors

```sh
psql -U postgres -f data.sql
```

#### stopping if any error is found

```sh
psql -U postgres --set ON_ERROR_STOP=on -f myglobals.sql
```

#### restore to a specific database

```sh
psql -U postgres -d mydb -f select_objects.sql
```


### pg_restore

- You can perform parallel restores using the `-j`, significantly picking up the pace of what could otherwise be a lengthy process.
- `pg_restore` allows you to selectively restore, even from within a backup of a full database.
- If you have data in the database, and you want to replace it with what’s in the backup, you need to add the `--clean` switch 


To perform a restore using `pg_restore`, first create a new database, the restore:

```sh
pg_restore --dbname=mydb --jobs=4 --verbose mydb.backup
```

#### Create and restore the database in one step

```sh
pg_restore --dbname=postgres --create --jobs=4 --verbose mydb.backup
```

you can take advantage of the --section option to restore just the structure without the data:

```sh
pg_restore --dbname=mydb2 --section=pre-data --jobs=4 mydb.backup
```


## Import/export CSV file (psql)

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

## Import/export CSV file (SQL)

### Export data from a table to CSV

```sql
COPY persons TO 'C:\tmp\persons_db.csv' DELIMITER ',' CSV HEADER;

COPY persons(first_name,last_name,email) 
TO 'C:\tmp\persons_partial_db.csv' DELIMITER ',' CSV HEADER;
```


### Import csv to table

First, create a new table named persons:

```sql
CREATE TABLE persons (
  id SERIAL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  dob DATE,
  email VARCHAR(255),
  PRIMARY KEY (id)
)
```

Second, prepare a CSV data file with the following format:

![](https://www.postgresqltutorial.com/wp-content/uploads/2015/05/csv-data.jpg)

To import this CSV file into the `persons` table, you use `COPY` statement as follows:

```sql
COPY sample_table_name
FROM 'C:\sampledb\sample_data.csv' 
DELIMITER ',' 
CSV HEADER;
```