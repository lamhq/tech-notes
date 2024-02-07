# Schema definition with SQLAlchemy API

## Create a MetaData object

```py
from sqlalchemy import MetaData
metadata_obj = MetaData()
```


## Define table

```py
from sqlalchemy import Table, Column, Integer, String
user_table = Table(
    "user_account",
    metadata_obj,
    Column("id", Integer, primary_key=True),
    Column("name", String(30)),
    Column("fullname", String),
)
```


## Foreign Key

```py
from sqlalchemy import ForeignKey
address_table = Table(
    "address",
    metadata_obj,
    Column("id", Integer, primary_key=True),
    Column("user_id", ForeignKey("user_account.id"), nullable=False),
    Column("email_address", String, nullable=False),
)
```


## Persisting Schema to database

```py
metadata_obj.create_all(engine)
```


## View Table info

```py
# Column('name', String(length=30), table=<user_account>)
user_table.c.name

# ['id', 'name', 'fullname']
user_table.c.keys()
```
