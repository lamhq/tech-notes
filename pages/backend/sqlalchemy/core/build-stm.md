# Build SQL Statements

Build SQL statement without defining schema.


## Defining tables

```py
from sqlalchemy.sql import table, column

tbl_obj = table('users', 
    column('id'),
    column('name')
)
```


## Querying data

```py
from sqlalchemy.sql import select

query = select(tbl_obj.c.id, tbl_obj.c.name).limit(10)
data = session.execute(query).all()
```


## Disable quoting

Allow raw table name when executing statements.

Use cases:
- Specify AWS Glue Data Catalog table as table name in the query

Disable quoting for custom table name:
```py
import types

identifier_preparer = session.connection().dialect.identifier_preparer
# extend the method `_requires_quotes`
org_mt = identifier_preparer._requires_quotes
new_mt = lambda self, value: False if value == '"your"."table"' else org_mt(value)
identifier_preparer._requires_quotes = types.MethodType(new_mt, identifier_preparer)
```

Restore the original behavior:
```py
identifier_preparer._requires_quotes = types.MethodType(org_mt, identifier_preparer)
```


## References

- [Select API](https://docs.sqlalchemy.org/en/20/core/selectable.html#sqlalchemy.sql.expression.Select)