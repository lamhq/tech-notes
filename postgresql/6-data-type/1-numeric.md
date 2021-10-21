# Numeric Types

## Integer Types

The types `smallint`, `integer`, and `bigint` store whole numbers, that is, numbers without fractional components.


## Arbitrary Precision Numbers

The type `numeric` can store numbers with a very large number of digits. It is especially recommended for storing monetary amounts and other quantities where exactness is required.

If you require exact storage and calculations (such as for monetary amounts), use the numeric type

The **precision** of a `numeric` is the number of digits to both sides of the decimal point. The **scale** of a `numeric` is the count of decimal digits in the fractional part, to the right of the decimal point. So the number `23.5141` has a precision of `6` and a scale of `4`.

```
NUMERIC(precision, scale)
NUMERIC(precision)
NUMERIC
```

In addition to ordinary numeric values, the numeric type has several special values:

```
Infinity
-Infinity
NaN
```

```sql
UPDATE table SET x = '-Infinity';
```

The types decimal and `numeric` are `equivalent`. 

When rounding values, the `numeric` type rounds ties away from zero. The `real` and `double` precision types round ties to the nearest even number

```sql
SELECT x,
  round(x::numeric) AS num_round,
  round(x::double precision) AS dbl_round
FROM generate_series(-3.5, 3.5, 1) as x;
```


## Serial Types

`Serial` and its bigger sibling, `bigserial`, are auto-incrementing integers often used as primary keys of tables

```sql
CREATE TABLE tablename (
    colname SERIAL
);
```


When you create a table and specify a column as `serial`, PostgreSQL first creates an `integer` column and then creates a sequence object named `table_name_column_name_seq` located in the same schema as the table.

It then sets the default of the new integer column to read its value from the sequence. If you drop the column, PostgreSQL also drops the companion sequence object.

You can use the same sequence across multiple tables. The cross-table sharing of the same sequence comes in handy when you’re assigning a universal key in your database.

**Using existing sequence for new tables:**

```sql
CREATE SEQUENCE s START 1;
CREATE TABLE stuff(
  id bigint DEFAULT nextval('s') PRIMARY KEY, 
  name text
);
```

## Generate Series Function

PostgreSQL has a nifty function called `generate_series`. It allows you to effectively mimic a for loop in SQL

The function comes in two forms:
- One is a numeric version that creates a sequence of integers incremented by some value
- one that creates a sequence of dates or timestamps incremented by some time interval.

```
generate_series(default, max, step)
```

```sql
SELECT x FROM generate_series(1,51,13) As x;
```

```
x
----
1
14 
27 
40
```