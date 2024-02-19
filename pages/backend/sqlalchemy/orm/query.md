# Querying data

## Find all

```py
session.query(User).all()
```

```py
stmt = select(User).where(User.name == "spongebob")
with Session(engine) as session:
    for row in session.execute(stmt):
        print(row)
```

```py
session.execute(
    select(User.name, Address)\
        .where(User.id == Address.user_id)\
        .order_by(Address.id)
).all()
```

### Order


## Find one

```py
user = session.scalars(select(User)).first()
```

## Find one by Primary key

```py
some_squidward = session.get(User, 4)
some_squidward
```

## Check object equal

```py
some_squidward is squidward
```

## Select individual columns

```py
row = session.execute(select(User.name, User.fullname)).first()
row
# ('spongebob', 'Spongebob Squarepants')
```

Check the [documentation](https://docs.sqlalchemy.org/en/14/tutorial/data_select.html#) for the full list.