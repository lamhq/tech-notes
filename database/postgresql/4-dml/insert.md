# Insert

```sql
INSERT INTO table_name(column1, column2, ...)
VALUES (value1, value2, ...);
```

The `INSERT` statement returns a command tag with the following form:

```sql
INSERT oid count
```

- Typically, the `INSERT` statement returns `OID` with value `0`.
- The `count` is the number of rows that the `INSERT` statement inserted successfully.


## `RETURNING` clause

If you want to return the entire inserted row, you use an asterisk (`*`) after the `RETURNING` keyword:

```sql
INSERT INTO table_name(column1, column2, …)
VALUES (value1, value2, …)
RETURNING *;

INSERT INTO table_name(column1, column2, …)
VALUES (value1, value2, …)
RETURNING id;

INSERT INTO table_name(column1, column2, …)
VALUES (value1, value2, …)
RETURNING output_expression AS output_name;
```


## INSERT Multiple Rows

```sql
INSERT INTO table_name (column_list)
VALUES
    (value_list_1),
    (value_list_2),
    ...
    (value_list_n);

INSERT INTO table_name (column_list)
VALUES
    (value_list_1),
    (value_list_2),
    ...
    (value_list_n)
RETURNING * | output_expression;
```
