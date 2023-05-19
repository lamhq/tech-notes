# Integer Data Types

## Introduction

To store the whole numbers in PostgreSQL, you use one of the following integer types: `SMALLINT`, `INTEGER`, and `BIGINT`.

PostgreSQL does not provide unsigned integer types.

```sql
CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR (255) NOT NULL,
    pages SMALLINT NOT NULL CHECK (pages > 0)
);

CREATE TABLE cities (
    city_id serial PRIMARY KEY,
    city_name VARCHAR (255) NOT NULL,
    population INT NOT NULL CHECK (population >= 0)
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