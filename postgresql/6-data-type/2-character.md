# Character Types

There are three primitive textual types in PostgreSQL: 

- character (abbreviable as `char`)
- character varying (abbreviable as `varchar`)
- text

## `char`

Use char only when the values stored are fixed length, such as postal codes, phone numbers, and Social Security numbers in the US. 

If your value is under the length specified, PostgreSQL automatically adds spaces to the end.

There is absolutely no speed performance benefit of using char over varchar or text and char will always take up more disk space.


## `varchar`

Use character varying to store strings with varying length. 

When defining varchar columns, you should specify the maximum length of a varchar.

The max length modifier for varchar is optional. Without it, varchar behaves almost identically to text.

The only advantage of specifying the length specifier for the `VARCHAR` data type is that PostgreSQL will issue an error if you attempt to insert a string that has more than `n` characters into the `VARCHAR(n)` column.


## `text`

With text, you can store a string with unlimited length.

There is no performance difference among these three types, apart from increased storage space when using the blank-padded type, and a few extra CPU cycles to check the length when storing into a length-constrained column. 

`character(n)` is usually the slowest of the three because of its additional storage costs. In most situations `text` or `character varying` should be used instead.


## Examples

```sql
CREATE TABLE character_tests (
	id serial PRIMARY KEY,
	x CHAR (1),
	y VARCHAR (10),
	z TEXT
);
```


## String Functions

- padding: `lpad`, `rpad`
- trimming whitespace: `rtrim`, `ltrim`, `trim`, `btrim`
- extracting substrings: `substring`
- concatenating: `||`

```sql
SELECT
  lpad('ab', 4, '0') As ab_lpad,
  rpad('ab', 4, '0') As ab_rpad,
  lpad('abcde', 4, '0') As ab_lpad_trunc;
```

```sql
SELECT
  a As a_before, trim(a) As a_trim, rtrim(a) As a_rt,
  i As i_before, ltrim(i, '0') As i_lt_0,
  rtrim(i, '0') As i_rt_0, trim(i, '0') As i_t_0
FROM (
  SELECT repeat(' ', 4) || i || repeat(' ', 4) As a, '0' || i As i
  FROM generate_series(0, 200, 50) As i
) As x;
```


## Splitting Strings

**Select the second item in a string of items delimited by periods:**

```sql
SELECT split_part('abc.123.z45','.',2) As x;
```

**Converting a delimited string to an array to rows:**

```sql
SELECT unnest(string_to_array('abc.123.z45', '.')) As x;
```

- `unnest` explodes an array into a row set.


## Regular Expressions

**Reformat a phone number using back-referencing:**

```sql
SELECT regexp_replace(
  '6197306254',
  '([0-9]{3})([0-9]{3})([0-9]{4})',
  E'\(\\1\) \\2-\\3'
) As x;
```

The `E'` construct is PostgreSQL syntax for denoting that the string to follow should be taken literally.

**Return phone numbers in piece of text as separate rows:**

```sql
SELECT unnest(regexp_matches(
  'Cell (619) 852-5083. Work (619)123-4567 , Casa 619-730-6254. Bésame mucho.',
  E'[(]{0,1}[0-9]{3}[)-.]{0,1}[\\s]{0,1}[0-9]{3}[-.]{0,1}[0-9]{4}',
  'g'
)) As x;
```

- `[(]{0,1}`: starts with zero or one open parenthesis `(`.
- `[0-9]{3}`: followed by three digits.
- `[)-.]{0,1}`: followed by zero or one closed parenthesis, hyphen, or
period.
- `[\\s]+`: followed by zero or more spaces. 
- `[0-9]{4}`: followed by four digits.

**Return first phone number in piece of text:**

```sql
SELECT substring(
  'Cell (619) 852-5083. Work (619)123-4567 , Casa 619-730-6254. Bésame mucho.'
  from E'[(]{0,1}[0-9]{3}[)-.]{0,1}[\\s]{0,1}[0-9]{3}[-.]{0,1}[0-9]{4}'
) As x;
```

**Query using regular expression operator `~`**:

```sql
SELECT description
FROM mytable
WHERE description ~ E'[(]{0,1}[0-9]{3}[)-.]{0,1}[\\s]{0,1}[0-9]{3}[-.]{0,1}[0-9]{4}';
```


### The `flag` parameter

The last input to `regexp_matches` function is the flags parameter. We set this to `g`, which stands for global and returns all matches of a regular expression as separate elements.

If you leave out this `flags` parameter, then your array will only contain the first match.

If you have letters in your regular expression and text and you want to make the check case, insensitive and global, you would use two flags, `gi`
