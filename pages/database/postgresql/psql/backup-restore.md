# Backup and Restore

## Export database schema

Export database schema to a sql file (password is specified when running the command):

```shell
PGPASSWORD=<your_password> pg_dump -U postgres -h localhost mobilesc_db -s > schema.sql
```


## Restore database

Execute a sql file:

```sh
psql -f some_script_file
```

Execute inline SQL command with `-c` option:

```sql
psql -d postgresql_book -c "DROP TABLE IF EXISTS dross; CREATE SCHEMA staging;"
```
