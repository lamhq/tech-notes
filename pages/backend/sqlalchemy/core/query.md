# Querying data

## Create a select statement

Select all columns:
```py
from sqlalchemy.sql import select

s = select([cookies])
```

Select multiple columns:
```py
s = select([cookies.c.cookie_name, cookies.c.quantity])
```

Know more about [`select()`](#the-select-function) function.


## Create a ResultProxy

A ResultProxy is a wrapper around a DBAPI cursor object.

In below example, `rp` object is a `ResultProxy`:
```py
from sqlalchemy.sql import select

s = select([cookies])
rp = connection.execute(s)
```

## Fetching data

We can iterate over a `ResultProxy` to access each returned items:
```py
rp = connection.execute(s)
for record in rp:
    print(record.cookie_name)
    # equivalent to record[0]
```

Or you can use the following methods from `ResultProxy` to fetch results:
- `first()`
- `fetchone()`
- `fetchall()`
- `scalar()`: Returns a single value if a query results in a single record with one column.
- `keys()`:  get a list of the column names.

Tips:
- Use the `first` method for getting a single record
- Use the iterable version of the `ResultProxy` over the `fetchall` and `fetchone` methods.
- Avoid the `fetchone` method, as it leaves connections open if you are not careful.
- Use the `scalar` method sparingly, as it raises errors if a query ever returns more than one row with one column.


## Orderring

```py
s = select([cookies.c.cookie_name, cookies.c.quantity]) \
    .order_by(cookies.c.quantity)
```

Sort in descending order:
```py
s.order_by(desc(cookies.c.quantity))
```
or:
```py
s.order_by(cookies.c.quantity.desc())
```

## Limiting

```py
s.limit(2)
```


## Using SQL Functions
Sum:
```py
from sqlalchemy.sql import func

s = select([func.sum(cookies.c.quantity)])
```

Count:
```py
s = select([func.count(cookies.c.cookie_name)])
```

Renaming columns:
```py
s = select([
    func.count(cookies.c.cookie_name).label('inventory_count')
])
```

Check [Available SQL functions](https://docs.sqlalchemy.org/en/14/core/functions.html#selected-known-functions).


## Filtering
Exact value:
```py
s = select([cookies]).where(cookies.c.cookie_name == 'chocolate chip')
```

Like:
```py
s = select([cookies]).where(cookies.c.cookie_name.like('%chocolate%'))
```

Other column's methods:
| Method                    | Purpose                                                                 |
|---------------------------|-------------------------------------------------------------------------|
| `between (cleft, cright)` | Find where the column is between cleft and cright                       |
| `concat (column two)`     | Concatenate column with column_two                                      |
| `distinct()`              | Find only unique values for the column                                  |
| `in_([list])`             | Find where the column is in the list                                    |
| `notin_([list])`          |                                                                         |
| `is_(None)`               | Find where the column is None (commonly used for Null checks with None) |
| `isnot(None)`             |                                                                         |
| `contains(string)`        | Find where the column has string in it (case-sensitive)                 |
| `endswith(string)`        | Find where the column ends with string (case-sensitive)                 |
| `like(string)`            | Find where the column is like string (case-sensitive)                   |
| `notlike(string)`         |                                                                         |
| `startswith(string)`      | Find where the column begins with string (case-sensitive)               |
| `ilike(string)`           | Find where the column is like string (this is not case-sensitive)       |


## Operators

- Comparison: `==`, `!=`, `<`, `>`, `<=`, `>=`
- Boolean: `&`, `|`, `~`
- Arithmetic: `+`, `-`, `*`, `/`


`== None` will be converted to `IS NULL`.

String concatenation:
```py
s = select([cookies.c.cookie_name, 'SKU-' + cookies.c.cookie_sku])
```


## Conjuntions
To combine filter conditions:
```py
from sqlalchemy import and_, or_, not_

s = select([cookies]).where(
    and_(
        cookies.c.quantity > 23,
        cookies.c.unit_cost < 0.40
    )
)
```


## Raw queries

The `text()` function allows us to write SQL statements as textual SQL.

Useful when you already know the SQL query and you don't need to use the SQLAlchemy expression language or ORM features.

The return value of `text()` function can be passed to the `execute()` method of a connection or engine.

```py
from sqlalchemy import text

stmt = text("SELECT * FROM users WHERE name = :name")
result = conn.execute(stmt, name="Alice")

for row in result:
    print(row)
```


### Sending Parameters

```py
with engine.connect() as conn:
    result = conn.execute(text("SELECT x, y FROM some_table WHERE y > :y"), {"y": 2})
    for row in result:
        print(f"x: {row.x}  y: {row.y}")
```

Sending Multiple Parameters:

```py
with engine.connect() as conn:
    conn.execute(
        text("INSERT INTO some_table (x, y) VALUES (:x, :y)"),
        [{"x": 11, "y": 12}, {"x": 13, "y": 14}],
    )
    conn.commit()
```

## `select()` function

The `select()` function allows you to create SQL SELECT statements. It returns a `Select` object.

The `select` function expects a list of columns to select; however, it also accepts Table objects and selects all the columns on the table.

You can then use various methods and attributes of the `Select` object to modify the statement: `where()`, `order_by()`, `limit()`, `offset()`, `group_by()`, `having()`, `join()`, `from_()`, `alias()`, `scalar_subquery()`, `exists()`, etc.

You can also use the `Select` object as a subquery or a table expression in other SQL statements.
