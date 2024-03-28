# Defining Schema

In SQLAlchemy Core, we created a metadata container and then declared a Table object associated with that metadata.

## Database Metadata

Database metadata in SQLAlchemy is a collection of objects that describe the structure and features of databases.

It includes information such as tables, columns, indexes, constraints, and relationships.

Metadata is represented by the `MetaData` class, which is a container object that can be associated with an engine or a connection.


## Create a MetaData object

```py
from sqlalchemy import MetaData
metadata = MetaData()
```


## Tables

```py
from datetime import datetime
from sqlalchemy import Table, Column, Integer, String, DateTime

users = Table('users', metadata,
    Column('user_id', Integer(), primary_key=True),
    Column('username', String(15), nullable=False, unique=True),
    Column('email_address', String(255), nullable=False),
    Column('phone', String(20), nullable=False),
    Column('password', String(25), nullable=False),
    Column('created_on', DateTime(), default=datetime.now),
    Column('updated_on', DateTime(), default=datetime.now, onupdate=datetime.now)
)
```


## Constraints

```py
from sqlalchemy import PrimaryKeyConstraint, UniqueConstraint, CheckConstraint
```

### Primary key

A column can be made a primary key simply by setting `primary_key=True`.

You can define composite primary keys by assigning the setting `primary_key` to `True` on multiple columns.

Primary keys can also be defined after the columns in the table constructor:
```py
PrimaryKeyConstraint('user_id', name='user_pk')
```

### Unique constraint

We can assign unique constraints on column:
```py
Column("name", String(30), nullable=False, unique=True)
```

Or define them manually:
```py
UniqueConstraint('username', name='uix_username')
```

### Check constraint

Check constraint is used to ensure that the data supplied for a column matches a set of user-defined criteria.

```py
CheckConstraint('unit_cost >= 0.00', name='unit_cost_positive')
```

### Relationships and ForeignKeyConstraints

```py
from sqlalchemy import ForeignKey

orders = Table('orders', metadata,
    Column('order_id', Integer(), primary_key=True),
    Column('user_id', ForeignKey('users.user_id')),
    Column('shipped', Boolean(), default=False)
)

line_items = Table('line_items', metadata,
    Column('line_items_id', Integer(), primary_key=True),
    Column('order_id', ForeignKey('orders.order_id')),
    Column('quantity', Integer()),
    Column('extended_cost', Numeric(12, 2))
)
```

You can also define a ForeignKeyConstraint explicitly.  The following code shows how to create the `ForeignKeyConstraint` for the `order_id` field between the `line_items` and `orders` table:

```py
ForeignKeyConstraint(['order_id'], ['orders.order_id'])
```

## Indexes

Define an index named `ix_cookies_cookie_name` implicitly:
```py
Column('cookie_name', String(50), index=True)
```

Explicitly:
```py
from sqlalchemy import Index

Index('ix_cookies_cookie_name', 'cookie_name')
```


## Persisting the Tables

```py
metadata.create_all(engine)
```


## View Table info

```py
# Column('name', String(length=30), table=<user_account>)
users.c.name

# ['id', 'name', 'fullname']
users.c.keys()
```
