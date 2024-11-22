# The Session object

## Overview

The session is the way SQLAlchemy ORM interacts with the database.

It wraps a database connection via an engine, and provides an [identity map](#identity-map) for objects that you load via (or associate with) the session.

A session also wraps a transaction, and that transaction will be open until the session is committed or rolled back.


## Create a session

```py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine('sqlite:///:memory:')
Session = sessionmaker(bind=engine)
session = Session()
```


## Identity map

The identity map is a cache-like data structure that contains a unique list of objects determined by the object's table and primary key.
