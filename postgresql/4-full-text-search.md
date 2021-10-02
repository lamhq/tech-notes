# Full-text Search

## Set up FTS

A text column must be vectorized before FTS can search against it. The resultant vector column is a tsvector data type.

Use the `to_tsvector` function to vectorize a blob of text.

To incorporate FTS into your database, add a tsvector column to your table.

**Add tsvector column and populate with weights:**

```sql
ALTER TABLE film ADD COLUMN fts tsvector;
UPDATE film
SET fts =
  setweight(to_tsvector(COALESCE(title,'')),'A') ||
  setweight(to_tsvector(COALESCE(description,'')),'B');
CREATE INDEX ix_film_fts_gin ON film USING gin (fts);
```

- vectorizes the `title` and `description` columns and stores the vector in tsvector column `fts`
- to speed up searches, we add a GIN index on the tsvector column. GIN is a lossless index.
- you can also add a GiST index on a vector column. GiST is lossy and slower to search but builds quicker and takes up less disk space.

To distinguish the relative importance of different lexemes, you could assign a weight to each using the `setweight` function

The weights must be A, B, C, or D, with A ranking highest in importance.

TSVectors can be formed from other tsvectors using the concatenation (||) operator.

Should data change in one of the basis columns forming the tsvector, you must re-vectorize. Create a trigger that responds to updates:

```sql
CREATE TRIGGER trig_tsv_film_iu
BEFORE INSERT OR UPDATE OF title, description ON film FOR EACH ROW
EXECUTE PROCEDURE tsvector_update_trigger(fts,'pg_catalog.english', title,description);
```


## Performing search

A FTS has two components: the searched text and the search terms. For FTS to work, both must be vectorized. We now show you how to vectorize the search terms.

PostgreSQL offers several functions that will convert plain-text search terms to tsqueries: `to_tsquery`, `plainto_tsquery`, and `phraseto_tsquery`

```sql
SELECT to_tsquery('business & analytics');

SELECT to_tsquery('english_hunspell','business & analytics');

SELECT plainto_tsquery('business analytics');

SELECT phraseto_tsquery('business analytics');
```

- `&` operator means that both words must appear in the
searched text
- `|` operator means one or both of the words must appear in the searched text
- `plain_totsquery` automatically inserts the and operator between words for you
- `phraseto_tsquery` maintains order in searched text

**Finds all films with a `title` or `description` containing the word `hunter` and either the word `scientist`, or the word `chef`, or both:**

```sql
SELECT left(title,50) As title, left(description,50) as description
FROM film
WHERE fts @@ to_tsquery('hunter & (scientist | chef)') AND title > '';
```


**Requires that the word hunter precede scientist or chef by exactly four words:**

```sql
SELECT left(title,50) As title, left(description,50) as description
FROM film
WHERE fts @@ to_tsquery('hunter <4> (scientist | chef)') AND title > '';
```

**Ranking Results:**

```sql
SELECT 
  title,
  ts_rank(fts,ts)::numeric(10,3) AS r
FROM film, to_tsquery('english','love  & (wait | indian | mad)') AS ts
WHERE fts @@ ts AND title > ''
ORDER BY r DESC;
```
