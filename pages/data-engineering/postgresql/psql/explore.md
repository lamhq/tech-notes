# Database exploration

## List databases

To list all databases in the current PostgreSQL database server, you use `\l` command:

```sh
\l
```


## Switch database

```sh
\c dbname
```


## List schemas

```sh
\dn
```


## Switch schema
```sh
set schema 'icecatalogschema';
```


## List tables

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


## List functions

```sh
\df
```


## List views

```sh
\dv
```

## List users and their roles

```sh
\du
```
