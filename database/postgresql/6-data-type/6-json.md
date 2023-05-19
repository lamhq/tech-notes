# JSON

## Defining column

```sql
CREATE TABLE orders (
	id serial NOT NULL PRIMARY KEY,
	info json NOT NULL
);
```

## Inserting JSON Data

```sql
INSERT INTO orders (info)
VALUES('{ "customer": "John Doe", "items": {"product": "Beer","qty": 6}}');
```


## Querying JSON

Get all customers in form of JSON:

```sql
SELECT info -> 'customer' AS customer
FROM orders;
```

Get all customers in form of text:

```sql
SELECT info ->> 'customer' AS customer
FROM orders;
```

Get all products sold (retrieve a specific node):

```sql
SELECT info -> 'items' ->> 'product' as product
FROM orders
ORDER BY product;
```

## Use JSON operator in WHERE clause

```sql
SELECT info ->> 'customer' AS customer
FROM orders
WHERE info -> 'items' ->> 'product' = 'Diaper';
```

```sql
SELECT 
  info ->> 'customer' AS customer,
  info -> 'items' ->> 'product' AS product
FROM orders
WHERE CAST ( info -> 'items' ->> 'qty' AS INTEGER) = 2
```


## Apply aggregate functions to JSON data

```sql
SELECT 
   MIN (CAST (info -> 'items' ->> 'qty' AS INTEGER)),
   MAX (CAST (info -> 'items' ->> 'qty' AS INTEGER)),
   SUM (CAST (info -> 'items' ->> 'qty' AS INTEGER)),
   AVG (CAST (info -> 'items' ->> 'qty' AS INTEGER))
FROM orders;
```


## PostgreSQL JSON functions

### `json_each`

Expand the outermost JSON object into a set of key-value pairs.

```sql
SELECT json_each (info)
FROM orders;
```

### `json_object_keys`

Get a set of keys in the outermost JSON object

```sql
SELECT json_object_keys (info->'items')
FROM orders;
```


## Binary JSON: jsonb

- it is handled through the same operators as those for the `json` type
- `jsonb` has similarly named functions as `json`, plus some additional ones
- `jsonb` performance is much better than `json`
- `jsonb` is internally stored as a binary object and does not maintain the formatting of the original `JSON` text
- `jsonb` does not allow duplicate keys
- `jsonb` columns can be directly indexed using the GIN index method

In addition to the operators supported by `json`, `jsonb` has additional comparator operators for equality (`=`), contains (`@>`), contained (`<@`), key exists (`?`), any of array of keys exists (`?|`), and all of array of keys exists (`?&`).

```sql
CREATE TABLE persons_b (id serial PRIMARY KEY, person jsonb);
```

**List all people that have a child named Brandon:**

```sql
SELECT person->>'name' As name
FROM persons_b
WHERE person @> '{"children":[{"name":"Brandon"}]}';
```
