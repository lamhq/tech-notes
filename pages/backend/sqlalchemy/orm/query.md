# Querying data

## Find all

Query all data as a list:
```py
session.query(User).all()
```

Other methods of query object:
- `first()`: Returns the first record object if there is one.
- `one()`: Queries all the rows, and raises an exception if anything other than a single result is returned.
- `scalar()`: Returns the first element of the first result, `None` if there is no result, or an error if there is more than one result.


Using iterable:
```py
for cookie in session.query(Cookie):
    print(cookie)
```

Using the iterable approach allows interacting with each record object individually.

Tips:
- Use the iterable over `all()`
- Use `first()` rather than `one()` or `scalar()`
- Use `scalar()` sparingly


## Find one by Primary key

```py
some_squidward = session.get(User, 4)
some_squidward
```

## Selecting columns

```py
session.query(Cookie.cookie_name, Cookie.quantity).first()
```

String concatenation:
```py
session.query(Cookie.cookie_name, 'SKU-' + Cookie.cookie_sku).all()
```

Computed column:
```py

from sqlalchemy import cast
query = session.query(
    Cookie.cookie_name,
    cast(
        (Cookie.quantity * Cookie.unit_cost),
        Numeric(12,2)
    ).label('inv_cost')
)
```

Check the [documentation](https://docs.sqlalchemy.org/en/14/tutorial/data_select.html#) for the full list.


## Ordering

```py
session.query(Cookie).order_by(Cookie.quantity)
```

Sort in descending order:
```py
session.query(Cookie).order_by(Cookie.quantity.desc())
```

## Limiting

Using array slice notation:
```py
session.query(Cookie)[:2]
```

Using `limit()`:
```py
session.query(Cookie).order_by(Cookie.quantity).limit(2)
```

## Using SQL Functions

Sum:
```py
from sqlalchemy import func

inv_count = session.query(func.sum(Cookie.quantity)).scalar()
print(inv_count)
```

Renaming column:
```py
rec_count = session.query(
    func.count(Cookie.cookie_name).label('inventory_count')
    ).first()

print(rec_count.keys())
print(rec_count.inventory_count)
```


## Filtering

```py
session.query(Cookie) \
    .filter(Cookie.cookie_name == 'chocolate chip') \
    .first()
```

Using `filter_by`:
```py
session.query(Cookie) \
    .filter_by(cookie_name='chocolate chip') \
    .first()
```

Like:
```py
session.query(Cookie) \
    .filter(Cookie.cookie_name.like('%chocolate%'))
```


## Conjunctions

To combine filter conditions:
```py
query = session.query(Cookie).filter(
    Cookie.quantity > 23,
    Cookie.unit_cost < 0.40
)
```

Using `or()` conjunction:
```py
from sqlalchemy import and_, or_, not_

query = session.query(Cookie).filter(
    or_(
        Cookie.quantity.between(10, 50),
        Cookie.cookie_name.contains('chip')
    }
)
```


## Join

```py
results = session.query(
        Order.order_id,
        User.username,
        User.phone,
        Cookie.cookie_name,
        LineItem.quantity,
        LineItem.extended_cost
    ).join(User).join(LineItem).join(Cookie) \
    .filter(User.username == 'cookiemon') \
    .all()
print(results)
```

Using `outerjoin`:
```py
query = session.query(User.username, func.count(Order.order_id)) \
    .outerjoin(Order) \
    .group_by(User.username)

for row in query:
    print(row)
```

Using a specific foreign key:
```py
results = session.query(
        Order.order_id,
        User.username,
    ).join(User, User.id==Order.user_id) \
    .join(LineItem).join(Cookie) \
    .filter(User.username == 'cookiemon') \
    .all()
print(results)
```

## Grouping

```py
query = session.query(User.username, func.count(Order.order_id)) \
    .outerjoin(Order) \
    .group_by(User.username)

for row in query:
    print(row)
```


## Raw Queries

```py
from sqlalchemy import text

query = session.query(User).filter(text("username='cookiemon'")) 

print(query.all())
```

## Check object equal

```py
some_squidward is squidward
```


## References

- [Query API](https://docs.sqlalchemy.org/en/14/orm/query.html)