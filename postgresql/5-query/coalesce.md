# PostgreSQL COALESCE

Returns the first non-null argument.

We often use the `COLAESCE` function to substitute a default value for null values when we querying the data

```sql
COALESCE (argument_1, argument_2, ...);
```

```sql
SELECT
	COALESCE (excerpt, LEFT(CONTENT, 150))
FROM
	posts;
```