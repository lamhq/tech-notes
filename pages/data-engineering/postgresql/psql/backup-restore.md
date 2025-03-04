# Backup and Restore

## Export database schema

Export database schema to a sql file (password is specified when running the command):

```sh
PGPASSWORD=<your_password> pg_dump -U postgres -h localhost mobilesc_db -s > schema.sql
```


## Restore database

Execute a sql file:

```sh
psql -f some_script_file
```
