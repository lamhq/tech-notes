# Connecting to a Database

## The Engine

To connect to a database, we need to create a SQLAlchemy engine.

The Engine is a object acts as a central source of connections to a particular database.

It provides both a factory as well as a connection pool for database connections.

## Connection string

A connection string is a specially formatted string that provides:
- Database type/engine (Postgres, MySQL, etc.)
- Dialect for the database type (Psycopg2, PyMySQL, etc.)
- Optional authentication details (username and password)
- Location of the database (file or hostname of the database server)
- Optional database server port
- Optional database name


## Create an engine

### SQLite

```py
from sqlalchemy import create_engine

# a SQLite database file named `cookies.db` stored in the current directory
engine = create_engine('sqlite:///cookies.db')

# an in-memory database
engine2 = create_engine('sqlite:///:memory:')

# full path to the database file
engine3 = create_engine('sqlite:////home/cookiemonster/cookies.db')

# specify enfine and dialect
engine4 = create_engine("sqlite+pysqlite:///:memory:", echo=True, future=True)
```

### PostgreSQL

```py
from sqlalchemy import create_engine

engine = create_engine('postgresql+psycopg2://albert:LpcCfWmYezV5UDSq@localhost:5432/test_db')
```

Specify the default schema:
```py
url = URL.create(
    drivername='postgresql+psycopg2',
    host='localhost',
    port=5432,
    database='test_db',
    username='albert',
    password='LpcCfWmYezV5UDSq'
)
schema = 'public'
engine = create_engine(
    url,
    connect_args={ 'options': F'-csearch_path={schema}' }
)
```

### Show output log

If you want to see the details of what is happening here, you can add `echo=True` to your `create_engine` statement as a keyword argument after the connection string. Make sure to only do this for testing, and don’t use `echo=True` in production!


### References

- Available [parameters](https://docs.sqlalchemy.org/en/14/core/engines.html#sqlalchemy.create_engine.params.case_sensitive) of `create_engine` function.


## Create a connection

Create a connection from the engine:
```py
connection = engine.connect()
```


## Using connection

```py
from sqlalchemy import text

with engine.connect() as conn:
    result = conn.execute(text("select 'hello world'"))
    print(result.all())
```
