# Boolean Type

A Boolean data type can hold one of three possible values: true, false or null.

Boolean constants can be represented in SQL queries by the SQL key words `TRUE`, `FALSE`, and `NULL`.

When you insert data into a Boolean column, PostgreSQL converts it to a Boolean value:

- `1`, `yes`, `y`, `t`, `true` values are converted to true
- `0`, `no`, `false`, `f` values are converted to false.


The datatype output function for type boolean always emits either `t` or `f`

```sql
CREATE TABLE stock_availability (
  product_id INT PRIMARY KEY,
  available BOOLEAN NOT NULL
);

INSERT INTO stock_availability (product_id, available)
VALUES
	(100, TRUE),
	(200, FALSE),
	(300, 't'),
	(400, '1'),
	(500, 'y'),
	(600, 'yes'),
	(700, 'no'),
	(800, '0');

SELECT *
FROM stock_availability
WHERE available = 'yes';

SELECT *
FROM stock_availability
WHERE available;

SELECT *
FROM stock_availability
WHERE NOT available;
```