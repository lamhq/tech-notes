# Manipulating Data

## INSERT

```py
from sqlalchemy import insert
stmt = insert(user_table).values(name="spongebob", fullname="Spongebob Squarepants")
with engine.connect() as conn:
    result = conn.execute(stmt)
    conn.commit()
```

### Bulk INSERT

```py
with engine.connect() as conn:
    result = conn.execute(
        insert(user_table),
        [
            {"name": "sandy", "fullname": "Sandy Cheeks"},
            {"name": "patrick", "fullname": "Patrick Star"},
        ],
    )
    conn.commit()
```

### INSERT…FROM SELECT

```py
select_stmt = select(user_table.c.id, user_table.c.name + "@aol.com")
insert_stmt = insert(address_table).from_select(
    ["user_id", "email_address"], select_stmt
)
print(insert_stmt)
```


### INSERT…RETURNING

```py
insert_stmt = insert(address_table).returning(
    address_table.c.id, address_table.c.email_address
)
print(insert_stmt)
```

with **INSERT…FROM SELECT**:

```py
select_stmt = select(user_table.c.id, user_table.c.name + "@aol.com")
insert_stmt = insert(address_table).from_select(
    ["user_id", "email_address"], select_stmt
)
print(insert_stmt.returning(address_table.c.id, address_table.c.email_address))
```
