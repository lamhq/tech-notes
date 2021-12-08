# Data Definition

## Table Basics

```sql
CREATE TABLE [IF NOT EXISTS] products (
    product_no SERIAL,
    name text,
    price numeric DEFAULT 9.99
);
```

## Generated Columns

A stored generated column is computed when it is written (inserted or updated) and occupies storage as if it were a normal column

```sql
CREATE TABLE people (
    ...,
    height_cm numeric,
    height_in numeric GENERATED ALWAYS AS (height_cm / 2.54) STORED
);
```

## Constraints

### Check Constraints

```sql
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric CHECK (price > 0)
    discounted_price numeric CHECK (discounted_price > 0),
    CHECK (price > discounted_price)
);
```

```sql
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric CONSTRAINT positive_price CHECK (price > 0)
    discounted_price numeric,
    CONSTRAINT valid_discount CHECK (price > discounted_price)
);
```

a check constraint is satisfied if the check expression evaluates to true or the null value.

### Not-Null Constraints

```sql
CREATE TABLE products (
    product_no integer NOT NULL,
    name text NOT NULL,
    price numeric NOT NULL CHECK (price > 0)
);
```

### Unique Constraints

```sql
CREATE TABLE products (
    product_no integer UNIQUE,
    name text,
    price numeric
);
```

```sql
CREATE TABLE example (
    a integer,
    b integer,
    c integer,
    UNIQUE (a, c)
);
```

```sql
CREATE TABLE products (
    product_no integer CONSTRAINT must_be_different UNIQUE,
    name text,
    price numeric
);
```

```sql
CREATE TABLE products (
    product_no integer CONSTRAINT must_be_different UNIQUE,
    name text,
    price numeric
);
```

In general, a unique constraint is violated if there is more than one row in the table where the values of all of the columns included in the constraint are equal. However, two null values are never considered equal in this comparison.


### Primary Keys

A primary key constraint indicates that a column, or group of columns, can be used as a unique identifier for rows in the table. This requires that the values be both unique and not null.

```sql
CREATE TABLE products (
    product_no integer PRIMARY KEY,
    name text,
    price numeric
);
```

```sql
CREATE TABLE example (
    a integer,
    b integer,
    c integer,
    PRIMARY KEY (a, c)
);
```


### Foreign Keys

```sql
CREATE TABLE t1 (
  a integer PRIMARY KEY,
  b integer,
  c integer,
  FOREIGN KEY (b, c) REFERENCES other_table (c1, c2) ON DELETE RESTRICT,
  order_id integer REFERENCES orders ON DELETE CASCADE,
);
```

## Modifying Tables

### Adding a Column

```sql
ALTER TABLE products ADD COLUMN description text;
ALTER TABLE products ADD COLUMN description text CHECK (description <> '');
```

### Removing a Column

If the column is referenced by a foreign key constraint of another table, PostgreSQL will not silently drop that constraint.

```sql
ALTER TABLE products DROP COLUMN description;
```

### Adding a Constraint

```sql
ALTER TABLE products ADD CHECK (name <> '');
ALTER TABLE products ADD CONSTRAINT some_name UNIQUE (product_no);
ALTER TABLE products ADD FOREIGN KEY (product_group_id) REFERENCES product_groups;
ALTER TABLE products ALTER COLUMN product_no SET NOT NULL;
```

### Removing a Constraint

```sql
ALTER TABLE products DROP CONSTRAINT some_name;
ALTER TABLE products ALTER COLUMN product_no DROP NOT NULL;
```

### Changing a Column's Default Value

```sql
ALTER TABLE products ALTER COLUMN price SET DEFAULT 7.77;
ALTER TABLE products ALTER COLUMN price DROP DEFAULT;
```

### Changing a Column's Data Type

```sql
ALTER TABLE products ALTER COLUMN price TYPE numeric(10,2);
```

### Renaming a Column

```sql
ALTER TABLE products RENAME COLUMN product_no TO product_number;
```

### Renaming a Table

```sql
ALTER TABLE products RENAME TO items;
```