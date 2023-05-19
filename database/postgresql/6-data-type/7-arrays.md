# Arrays

## Defining array column

```sql
CREATE TABLE contacts (
	id serial PRIMARY KEY,
	name VARCHAR (100),
	phones TEXT []
);
```

## Inserting array values

```sql
INSERT INTO contacts (name, phones) VALUES(
  'John Doe',
  ARRAY ['(408)-589-5846', '(408)-589-5555']
);
```

You can also use curly braces as follows:

```sql
INSERT INTO contacts (name, phones)
VALUES('Lily Bush','{"(408)-589-5841"}'),
      ('William Gate','{"(408)-589-5842","(408)-589-58423"}');
```


## Query array data

```sql
SELECT name, phones [ 1 ]
FROM contacts;
```

## Modifying PostgreSQL array

```sql
UPDATE contacts
SET phones [2] = '(408)-589-5843'
WHERE ID = 3;
```


## Search in PostgreSQL Array

**Check array contain value:**
```sql
SELECT name, phones
FROM contacts
WHERE '(408)-589-5555' = ANY (phones);
```

**Check array contain array:**

```sql
SELECT '{1,2,3}'::int[] @> '{3,2}'::int[] AS contains;

SELECT '{1,2,3}'::int[] <@ '{3,2}'::int[] AS contained_by;
```

**Check arrays overlaps:**

```sql
SELECT fact_subcats
FROM census.lu_fact_types
WHERE fact_subcats && '{OCCUPANCY STATUS,For rent}'::varchar[];
```


## Unnesting Arrays to Rows

**Expand arrays into a set of rows:**

```sql
SELECT unnest('{XOX,OXO,XOX}'::char(3)[]) As tic_tac_toe;
```

**Unnesting balanced arrays:**

```sql
SELECT
  unnest('{three,blind,mice}'::text[]) As t,
  unnest('{1,2,3}'::smallint[]) As i;
```

**Unnesting unbalanced arrays:**

```sql
SELECT
  unnest( '{blind,mouse}'::varchar[]) AS v,
  unnest('{1,2,3}'::smallint[]) AS i;
```

**Unnesting unbalanced arrays (2):**

```sql
SELECT * FROM unnest('{blind,mouse}'::text[], '{1,2,3}'::int[]) AS f(t,i);
```

## Array Slicing and Splicing

**Slicing:**

```sql
SELECT fact_subcats[2:4] FROM census.lu_fact_types;
```

**Concat array:**

```sql
SELECT fact_subcats[1:2] || fact_subcats[3:4] 
FROM census.lu_fact_types;

SELECT '{1,2,3}'::integer[] || 4 || 5;
```


## Array Constructors

```sql
SELECT ARRAY[2001, 2002, 2003] As yrs;
```

**Extract array from a query:**

```sql
SELECT array(
  SELECT DISTINCT date_part('year', log_ts)
  FROM logs
  ORDER BY date_part('year', log_ts)
);
```

**Cast a string representation of an array to an array:**

```sql
SELECT '{Alex,Sonia}'::text[] As name, '{46,43}'::smallint[] As age;
```

**Converting a delimited string to an array:**

```sql
SELECT string_to_array('CA.MA.TX', '.') As estados;
```

**Convert rows to array:**

```sql
SELECT array_agg(log_ts ORDER BY log_ts) As x
FROM logs
WHERE log_ts BETWEEN '2011-01-01'::timestamptz AND '2011-01-15'::timestamptz;
```
