# Query data

## Fetching Rows

```py
with engine.connect() as conn:
    result = conn.execute(text("SELECT x, y FROM some_table"))
    for row in result:
        print(f"x: {row.x}  y: {row.y}")
```


## Accessing result

### Tuple Assignment

```py
result = conn.execute(text("select x, y from some_table"))

for x, y in result:
    # ...
```


### Attribute Name

```py
result = conn.execute(text("select x, y from some_table"))

for row in result:
    y = row.y

    # illustrate use with Python f-strings
    print(f"Row: {row.x} {y}")
```


### Integer Index

```py
result = conn.execute(text("select x, y from some_table"))

  for row in result:
      x = row[0]
```


## Sending Parameters

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
