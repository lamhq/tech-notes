# PostgreSQL ANY Operator

The PostgreSQL `ANY` operator compares a value to a set of values returned by a subquery. 

The `ANY` operator returns true if any value of the subquery meets the condition, otherwise, it returns false.

Note that if the subquery does not return any rows, the entire query returns an empty result set.

Note that `SOME` is a synonym for `ANY`, meaning that you can substitute `SOME` for `ANY` in any SQL statement.

```sql
SELECT title
FROM film
WHERE length >= ANY(
  SELECT MAX( length )
  FROM film
  INNER JOIN film_category USING(film_id)
  GROUP BY  category_id );
```

## `ANY` vs. `IN`

The `= ANY` is equivalent to `IN` operator.

```sql
SELECT
  title,
  category_id
FROM
  film
INNER JOIN film_category
  USING(film_id)
WHERE
  category_id = ANY(
    SELECT category_id
    FROM category
    WHERE NAME = 'Action' OR NAME = 'Drama'
  );
```

```sql
SELECT
  title,
  category_id
FROM
  film
INNER JOIN film_category
  USING(film_id)
WHERE
  category_id IN(
    SELECT category_id
    FROM category
    WHERE NAME = 'Action' OR NAME = 'Drama'
  );
```
