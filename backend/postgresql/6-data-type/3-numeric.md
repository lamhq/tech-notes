# NUMERIC data type

The `NUMERIC` type can store numbers with a lot of digits.

Typically, you use the `NUMERIC` type for numbers that require exactness such as monetary amounts or quantities.

Syntax of the NUMERIC type:

```
NUMERIC(precision, scale)
```

- `precision` is the total number of digits
- `scale` is the number of digits in the fraction part

If you omit both precision and scale, you can store any precision and scale up to the limit of the precision and scale 

In PostgreSQL, the `NUMERIC` and `DECIMAL` types are equivalent.

If precision is not required, you should not use the `NUMERIC` type because calculations on `NUMERIC` values are typically slower than integers, floats, and double precisions.

In addition to ordinary numeric values, the numeric type has several special values:

```
Infinity
-Infinity
NaN
```

```sql
UPDATE table SET x = '-Infinity';
```

## Examples

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(5,2)
);
```

```sql
INSERT INTO products (name, price)
  VALUES ('Phone',500.215), ('Tablet',500.214);
```


## `NaN`

The `NUMERIC` type can also hold a special value called `NaN` which stands for not-a-number.

```sql
UPDATE products
SET price = 'NaN'
WHERE id = 1;
```

`NaN` is not equal to itself.

`NaN` is greater than other numbers.
