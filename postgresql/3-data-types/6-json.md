# JSON

## Defining column

```sql
CREATE TABLE orders (
	id serial NOT NULL PRIMARY KEY,
	info json NOT NULL
);

CREATE TABLE persons (id serial PRIMARY KEY, person json);
```

## Inserting JSON Data

```sql
INSERT INTO orders (info)
VALUES('{ "customer": "John Doe", "items": {"product": "Beer","qty": 6}}');

INSERT INTO persons (person)
VALUES (
  '{
    "name":"Sonia",
    "spouse":{
      "name":"Alex",
      "parents":{
        "father":"Rafael",
        "mother":"Ofelia"
      },
      "phones":[
        {
          "type":"work",
          "number":"619-722-6719"
        },
        {
          "type":"cell",
          "number":"619-852-5083"
        }
      ],
      "children":[
        {
          "name":"Brandon",
          "gender":"M"
        },
        {
          "name":"Azaleah",
          "girl":true,
          "phones":[
            
          ]
        }
      ]
    }
  }'
)
```


## Querying JSON

```sql
SELECT person->'name' FROM persons;
SELECT person->'spouse'->'parents'->'father' FROM persons;
```

**Query using a path array:**

```sql
SELECT person#>array['spouse','parents','father'] FROM persons;
```

**Access JSON arrays:**

```sql
SELECT person->'children'->0->'name' FROM persons;
SELECT person#>array['children','0','name'] FROM persons;
```

**Return the text representation:**

```sql
SELECT person->'spouse'->'parents'->>'father' FROM persons;
SELECT person#>>array['children','0','name'] FROM persons;
```

**Expand JSON array to rows:**

```sql
SELECT json_array_elements(person->'children')->>'name' As name 
FROM persons;
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
