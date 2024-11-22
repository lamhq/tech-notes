# Types

## Overview

There are four categories of types we can use inside of SQLAlchemy:
- Generic
- SQL standard
- Vendor specific
- User defined


Here are some generic types and their associated type representations in both Python and SQL:

| SQLAlchemy  | Python             | SQL                         |
|-------------|--------------------|-----------------------------|
| BigInteger  | int                | BIGINT                      |
| Boolean     | bool               | BOOLEAN OF SMALLINT         |
| Date        | datetime.date      | DATE (SQLite: STRING)       |
| DateTime    | datetime.datetime  | DATETIME (SQLite: STRING)    |
| Enum        | str                | ENUM or VARCHAR             |
| Float       | float or Decimal   | FLOAT or REAL               |
| Integer     | int                | INTEGER                     |
| Interval    | datetime.timedelta | INTERVAL or DATE from epoch |
| LargeBinary | byte               | BLOB or BYTEA               |
| Numeric     | decimal.Decimal    | NUMERIC or DECIMAL          |
| Unicode     | unicode            | UNICODE or VARCHAR          |
| Text        | str                | CLOB or TEXT                |
| Time        | datetime.time      | DATETIME                    |

```py
from sqlalchemy import Integer, String, DateTime
```

Reference: [Generic “CamelCase” Types](https://docs.sqlalchemy.org/en/14/core/type_basics.html#generic-camelcase-types)