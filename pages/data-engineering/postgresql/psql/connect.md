# Connecting to database

## Specify connection setting

You can specify your connection settings for `psql` by setting these environment variables:

- `PGHOST`
- `PGPORT`
- `PGUSER`
- `PGPASSWORD`


## Specifying password

To specify password to connect to database without expose it in the command line, add following line to the file `~/.pgpass`, :

```
localhost:5432:mobilesc_dev:postgres:abc@123!
```


## Connect to db server

```sh
psql -h host -d database -U user -W

psql 'postgresql://user:pwd@host:port/database'
```
