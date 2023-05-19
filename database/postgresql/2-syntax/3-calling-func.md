# Calling Functions

```sql
CREATE FUNCTION concat_lower_or_upper(a text, b text, uppercase boolean DEFAULT false)
RETURNS text
AS
$$
 SELECT CASE
  WHEN $3 THEN UPPER($1 || ' ' || $2)
  ELSE LOWER($1 || ' ' || $2)
  END;
$$
LANGUAGE SQL IMMUTABLE STRICT;
```


## Using Positional Notation

```sql
SELECT concat_lower_or_upper('Hello', 'World', true);
```


## Using Named Notation

```sql
SELECT concat_lower_or_upper(a => 'Hello', b => 'World');
```

## Using Mixed Notation

```sql
SELECT concat_lower_or_upper('Hello', 'World', uppercase => true);
```
