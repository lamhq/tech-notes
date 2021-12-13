# PostgreSQL NULLIF

```sql
NULLIF(argument_1,argument_2);
```

The `NULLIF` function returns a null value if `argument_1` equals to `argument_2`, otherwise it returns `argument_1`.

Our goal is to display the posts overview page that shows title and excerpt of each posts. In case the excerpt is not provided, we use the first 40 characters of the post body.

```sql
SELECT
	id,
	title,
	COALESCE (
		NULLIF (excerpt, ''),
		LEFT (body, 40)
	)
FROM posts;
```
