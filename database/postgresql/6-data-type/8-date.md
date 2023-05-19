# DATE data type

PostgreSQL uses 4 bytes to store a date value

When storing a date value, PostgreSQL uses the `yyyy-mm-dd` format e.g., `2000-12-31`. It also uses this format for inserting data into a date column.

```sql
CREATE TABLE employees (
	employee_id serial PRIMARY KEY,
	first_name VARCHAR (255),
	last_name VARCHAR (355),
	birth_date DATE NOT NULL,
	hire_date DATE NOT NULL
);

INSERT INTO employees (first_name, last_name, birth_date, hire_date)
VALUES ('Shannon','Freeman','1980-01-01','2005-01-01'),
	   ('Sheila','Wells','1978-02-05','2003-01-01'),
	   ('Ethel','Webb','1975-01-01','2001-01-01');
```

## DATE functions

### Get the current date

```sql
SELECT NOW()::date;

SELECT CURRENT_DATE;
```

### Output a PostgreSQL date value in a specific format

```sql
SELECT TO_CHAR(NOW() :: DATE, 'dd/mm/yyyy');
```

### Get the interval between two dates

```sql
SELECT
	first_name,
	last_name,
	now() - hire_date as diff
FROM
	employees;
```


### Calculate ages in years, months, and days

```sql
SELECT
	employee_id,
	first_name,
	last_name,
	AGE(birth_date)
  AGE('2015-01-01',birth_date)
FROM
	employees;
```


### Extract year, quarter, month, week, day from a date value

```sql
SELECT
	employee_id,
	first_name,
	last_name,
	EXTRACT (YEAR FROM birth_date) AS YEAR,
	EXTRACT (MONTH FROM birth_date) AS MONTH,
	EXTRACT (DAY FROM birth_date) AS DAY
FROM
	employees;
```
