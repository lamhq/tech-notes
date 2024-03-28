# Schema definition with ORM

## Declarative base

In SQLAlchemy ORM, we define a class that inherits from a special base class called the `declarative_base`.

The `declarative_base` combines a metadata container and a mapper that maps our class to a database table.

It also maps instances of the class to records in that table if they have been saved.


## Create a declarative base

Fastest way:

```py
from sqlalchemy.orm import declarative_base

Base = declarative_base()
```


## Tables

```py
from sqlalchemy import Column, Integer, Numeric, String

class Cookie(Base):
    __tablename__ = 'cookies'
    cookie_id = Column(Integer(), primary_key=True)
    cookie_name = Column(String(50), index=True)
    cookie_recipe_url = Column(String(255))
    cookie_sku = Column(String(55))
    quantity = Column(Integer())
    unit_cost = Column(Numeric(12, 2))
```

```py
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime

class User(Base): __tablename__ = 'users'
    user_id = Column(Integer(), primary_key=True)
    username = Column(String(15), nullable=False, unique=True)
    email_address = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    password = Column(String(25), nullable=False)
    created_on = Column(DateTime(), default=datetime.now)
    updated_on = Column(DateTime(), default=datetime.now, onupdate=datetime.now)
```

View table info:
```py
Cookie.__table__
```

References:
- [Column parameters](https://docs.sqlalchemy.org/en/14/core/metadata.html#sqlalchemy.schema.Column)


## Constraints

```py
class SomeDataClass(Base):
__tablename__ = 'somedatatable'
__table_args__ = (
    ForeignKeyConstraint(['id'], ['other_table.id']),
    CheckConstraint(unit_cost >= 0.00', name='unit_cost_positive')
)
```

The syntax is the same as [SQLAlchemy Core](../core/schema.md#constraints).


## Relationships

The ORM uses a `relationship` directive to provide a property that can be used to access the related object.

The relationship `directive` needs a target class for the relationship, and can optionally include a back reference to be added to target class.

### One-to-many
Define One-to-many relationship:
```py
from sqlalchemy import ForeignKey, Boolean
from sqlalchemy.orm import relationship, backref

class Order(Base): __tablename__ = 'orders'
    order_id = Column(Integer(), primary_key=True)
    user_id = Column(Integer(), ForeignKey('users.user_id'))
    shipped = Column(Boolean(), default=False)
    user = relationship("User", backref=backref('orders', order_by=order_id))
```

- We can get the `User` related to an `Order` by accessing the `user` property
- This also establishes an `orders` property on the `User` class via the `backref` keyword argument, which is ordered by the `order_id`


### One-to-one

Define one-to-one relationship:
```py
class LineItem(Base): __tablename__ = 'line_items'
    line_item_id = Column(Integer(), primary_key=True)
    order_id = Column(Integer(), ForeignKey('orders.order_id'))
    cookie_id = Column(Integer(), ForeignKey('cookies.cookie_id'))
    quantity = Column(Integer())
    extended_cost = Column(Numeric(12, 2))
    order = relationship("Order", backref=backref('line_items', order_by=line_item_id))
    cookie = relationship("Cookie", uselist=False)
```

The `uselist=False` keyword argument defines it as a one-to-one relationship.


### Self-reference

Define a table of managers and their reports:
```py
class Employee(Base):
    __tablename__ = 'employees'

    id = Column(Integer(), primary_key=True)
    manager_id = Column(Integer(), ForeignKey('employees.id'))
    name = Column(String(255), nullable=False)

    manager = relationship("Employee",
        backref = backref('reports'),
        remote_side = [id]
    )
```

We need to specify an option called `remote_side` to make the relationship a many to one.


## Create Schema from ORM classes

```py
from sqlalchemy import create_engine
engine = create_engine('sqlite:///:memory:')


Base.metadata.create_all(engine)
```


## List columns of a table

```py
available_cols = [col.key for col in Cookie.__table__.columns]
```
