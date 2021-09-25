# Database Creation

Any role with `CREATEDB` privilege can create new databases.

A template database is a database that serves as a skeleton for new databases. 

When you create a new database, PostgreSQL copies all the database settings and data from the template database to the new database.

Create the database:

```sql
CREATE DATABASE mydb;

CREATE DATABASE my_db TEMPLATE my_template_db;
```

Create the database and set the owner:

```sql
CREATE DATABASE mydb WITH owner = mydb_admin;
```


## Using Schemas

Schemas organize your database into logical groups.

Object names must be unique within a schema, but you can have same-named objects in different schemas.

Another common way to organize schemas is by roles. 

Suppose that you have to put in data that one customer cannot see information from another.

To comply, you set up one schema per customer and create the same tables in each as follows:

```sql
CREATE SCHEMA customer1;
CREATE SCHEMA customer2;
```

You then move the records into the schema that corresponds with the client. The final touch is to create different login roles for each schema with the same name as the schema.

### `search_path`

When you execute something like `SELECT * FROM dogs`, how does PostgreSQL know which schema you're referring to? 

The simple answer is to always prepend the schema name onto the table name with a dot, such as in `SELECT * FROM customer1.dogs`.

Another method is to set the `search_path` variable to be something like `customer1, public`. When the query executes, the planner searches for the dogs table first in the `customer1` schema. If not found, it continues to the `public` schema and stops there.

PostgreSQL has a little-known variable called `user` that retrieves the role currently logged in. `SELECT user` returns this name. With that, we can set the `search_path` variable to:

```sql
ALTER DATABASE mydb SET search_path='$user', public;
```

> Warning: `ALTER DATABASE .. SET search_path` will not take effect for existing connections. You’ll need to reconnect.