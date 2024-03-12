# Reflection

## Table reflection

Table reflection refers to the process of generating Table and related objects by reading the current state of a database.

```py
some_table = Table("some_table", metadata, autoload_with=engine)
```

`some_table` object now contains the information about the Column objects present in the table.
