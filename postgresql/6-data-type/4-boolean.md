# Boolean Type

The boolean type can have several states: “true”, “false”, and a third state, “unknown”, which is represented by the SQL `null` value.

Boolean constants can be represented in SQL queries by the SQL key words `TRUE`, `FALSE`, and `NULL`.

The datatype input function for type boolean:

| **True** | **False** |
| ---- | --- |
| true | false |
| ‘t’ | ‘f ‘ |
| ‘true’ | ‘false’ |
| ‘y’ | ‘n’ |
| ‘yes’ | ‘no’ |
| ‘1’ | ‘0’ |


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