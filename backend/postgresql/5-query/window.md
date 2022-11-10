# PostgreSQL Window Functions

To understand the window functions is to start by reviewing the aggregate functions. An aggregate function aggregates data from a set of rows into a single row.

Similar to an aggregate function, a window function operates on a set of rows. However, it does not reduce the number of rows returned by the query.


## Understanding window functions

First, create two tables named products and product_groups for the demonstration:

![](https://www.postgresqltutorial.com/wp-content/uploads/2016/06/products_product_groups_tables.png)

```sql
CREATE TABLE product_groups (
	group_id serial PRIMARY KEY,
	group_name VARCHAR (255) NOT NULL
);

CREATE TABLE products (
	product_id serial PRIMARY KEY,
	product_name VARCHAR (255) NOT NULL,
	price DECIMAL (11, 2),
	group_id INT NOT NULL,
	FOREIGN KEY (group_id) REFERENCES product_groups (group_id)
);
```

```sql
INSERT INTO product_groups (group_name)
VALUES
	('Smartphone'),
	('Laptop'),
	('Tablet');

INSERT INTO products (product_name, group_id,price)
VALUES
	('Microsoft Lumia', 1, 200),
	('HTC One', 1, 400),
	('Nexus', 1, 500),
	('iPhone', 1, 900),
	('HP Elite', 2, 1200),
	('Lenovo Thinkpad', 2, 700),
	('Sony VAIO', 2, 700),
	('Dell Vostro', 2, 800),
	('iPad', 3, 700),
	('Kindle Fire', 3, 150),
	('Samsung Galaxy Tab', 3, 200);
```

```sql
SELECT
	group_name,
	AVG (price)
FROM products
INNER JOIN product_groups USING (group_id)
GROUP BY
	group_name;
```

The following example returns the average price for every product group:

```sql
SELECT
	group_name,
	AVG (price)
FROM products
INNER JOIN product_groups USING (group_id)
GROUP BY
	group_name;
```

The following query returns the **product name**, the **price**, **product group name**, along with the **average prices of each product group**:

```sql
SELECT
	product_name,
	price,
	group_name,
	AVG (price) OVER (
	   PARTITION BY group_name
	)
FROM
	products
	INNER JOIN 
		product_groups USING (group_id);
```

```sql
AVG(price) OVER (PARTITION BY group_name)
```

In this syntax, the `PARTITION` BY distributes the rows of the result set into groups and the `AVG()` function is applied to each group to return the average price for each.

Note that a window function always performs the calculation on the result set after the `JOIN`, `WHERE`, `GROUP BY` and `HAVING` clause and before the final `ORDER BY` clause in the evaluation order.


## Syntax

```sql
window_function(arg1, arg2,..) OVER (
  [PARTITION BY partition_expression]
  [ORDER BY sort_expression [ASC | DESC] [NULLS {FIRST | LAST }])  
```

### `window_function(arg1,arg2,...)`

The `window_function` is the name of the window function. Some window functions do not accept any argument


### `PARTITION BY` clause

The `PARTITION BY` clause divides rows into multiple groups or partitions to which the window function is applied.

The `PARTITION BY` clause is optional. If you skip the `PARTITION BY` clause, the window function will treat the whole result set as a single partition.


### `ORDER BY` clause

The `ORDER BY` clause specifies the order of rows in each partition to which the window function is applied.

The `ORDER BY` clause uses the `NULLS FIRST` or `NULLS LAST` option to specify whether nullable values should be first or last in the result set. The default is `NULLS LAST` option.


### `WINDOW` clause

If you use multiple window functions in a query:

```sql
SELECT
  wf1() OVER(PARTITION BY c1 ORDER BY c2),
  wf2() OVER(PARTITION BY c1 ORDER BY c2)
FROM table_name;
```

you can use the `WINDOW` clause to shorten the query as shown in the following query:

```sql
SELECT 
  wf1() OVER w,
  wf2() OVER w,
FROM table_name
WINDOW w AS (PARTITION BY c1 ORDER BY c2);
```


## PostgreSQL window function List

- `RANK`: Rank the current row within its partition with gaps.
- `DENSE_RANK`: Rank the current row within its partition without gaps.
- `ROW_NUMBER`: Number the current row within its partition starting from 1.

The following statement uses the `FIRST_VALUE()` to return the lowest price for every product group:

```sql
SELECT
	product_name,
	group_name,
	price,
	FIRST_VALUE (price) OVER (
		PARTITION BY group_name
		ORDER BY
			price
	) AS lowest_price_per_group
FROM
	products
INNER JOIN product_groups USING (group_id);
```

The following statement uses the `LAST_VALUE()` function to return the highest price for every product group:

```sql
SELECT
	product_name,
	group_name,
	price,
	LAST_VALUE (price) OVER (
		PARTITION BY group_name
		ORDER BY
			price RANGE BETWEEN UNBOUNDED PRECEDING
		AND UNBOUNDED FOLLOWING
	) AS highest_price_per_group
FROM
	products
INNER JOIN product_groups USING (group_id);
```


## Reference

[PostgreSQL Window Functions](https://www.postgresqltutorial.com/postgresql-window-function/)