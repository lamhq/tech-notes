# Concepts

## The `text()` construct

Allows us to write SQL statements as textual SQL.

Useful when you already know the SQL query and you don't need to use the SQLAlchemy expression language or ORM features

The return value of `text()` function can be passed to the `execute()` method of a connection or engine.

```py
from sqlalchemy import text

stmt = text("SELECT * FROM users WHERE name = :name")
result = conn.execute(stmt, name="Alice")

for row in result:
    print(row)
```

## The `select()` construct

The select() construct allows you to create SQL SELECT statements in a Pythonic way.

You can then use various methods and attributes of the `Select` object to modify the statement, such as `where()`, `order_by()`, `limit()`, `offset()`, `group_by()`, `having()`, `join()`, `from_()`, `alias()`, `scalar_subquery()`, `exists()`, etc. You can also use the `Select` object as a subquery or a table expression in other SQL statements.


## Database Metadata

Database metadata in SQLAlchemy is a collection of objects that describe the structure and features of databases.

It includes information such as tables, columns, indexes, constraints, and relationships.

Metadata is represented by the `MetaData` class, which is a container object that can be associated with an engine or a connection.

```python
from sqlalchemy import MetaData, Table, Column, Integer, String

# create a metadata object
metadata = MetaData()

# create a table object with metadata
users = Table('users', metadata,
    Column('id', Integer, primary_key=True),
    Column('name', String(50)),
    Column('email', String(50))
)

# create the table in the database
metadata.create_all(engine)
```


## Table reflection

Table reflection refers to the process of generating Table and related objects by reading the current state of a database.