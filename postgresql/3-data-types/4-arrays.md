# Arrays

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


## Unnesting Arrays to Rows
