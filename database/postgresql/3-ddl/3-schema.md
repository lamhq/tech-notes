# Schemas

A database contains one or more named *schemas*, which in turn contain tables. 

Schemas also contain other kinds of named objects, including data types, functions, and operators. The same object name can be used in different schemas without conflict.

There are several reasons why one might want to use schemas:

- To allow many users to use one database without interfering with each other.
- To organize database objects into logical groups to make them more manageable.
- Third-party applications can be put into separate schemas so they do not collide with the names of other objects.


## Creating a Schema

```sql
CREATE SCHEMA myschema;
```

To create or access objects in a schema, write a qualified name consisting of the schema name and table name separated by a dot:

```
schema.table
```

So to create a table in the new schema, use:

```sql
CREATE TABLE myschema.mytable (
 ...
);
```

To drop a schema including all contained objects, use:

```sql
DROP SCHEMA myschema CASCADE;
```


## The Public Schema

By default created tables without specifying any schema names (and other objects) are automatically put into a schema named "public".


## The Schema Search Path

Tables are often referred to by unqualified names, which consist of just the table name.

The system determines which table is meant by following a **search path**, which is a list of schemas to look in.

To show the current search path, use the following command:

To put our new schema in the path, we use:

```sql
SET search_path TO myschema,public;
```

The search path works in the same way for data type names, function names, and operator names as it does for table names. 


## Schemas and Privileges

By default, users cannot access any objects in schemas they do not own. To allow that, the owner of the schema must grant the `USAGE` privilege on the schema.

A user can also be allowed to create objects in someone else's schema. To allow that, the `CREATE` privilege on the schema needs to be granted. Note that by default, everyone has `CREATE` and `USAGE` privileges on the schema public. This allows all users that are able to connect to a given database to create objects in its public schema.


## The System Catalog Schema

In addition to `public` and user-created schemas, each database contains a `pg_catalog` schema, which contains the system tables and all the built-in data types, functions, and operators.

If it is not named explicitly in the path then it is implicitly searched **before** searching the path's schemas.

You can explicitly place `pg_catalog` at the end of your search path if you prefer to have user-defined names override built-in names.

Since system table names begin with `pg_`, it is best to avoid such names to ensure that you won't suffer a conflict.