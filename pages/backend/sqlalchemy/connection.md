# Establishing Database Connection

## The Engine

The Engine is a object acts as a central source of connections to a particular database.

It provides both a factory as well as a connection pool for database connections. 


## Create a connection

```py
from sqlalchemy import create_engine

engine = create_engine("sqlite+pysqlite:///:memory:", echo=True)
```

The main argument to `create_engine` is a string URL (in this case: `sqlite+pysqlite:///:memory:`), indicates three important facts:
- The database we are communicating (`sqlite`)
- The DBAPI (`pysqlite`)
- Where to locate the database. In this case, it's an in-memory-only SQLite database: (`/:memory:`)

The Engine connect to the database only the first time it is asked to perform a task against the database (lazy initialization).
