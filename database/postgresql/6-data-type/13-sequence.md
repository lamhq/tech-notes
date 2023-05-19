# PostgreSQL Sequences

A sequence in PostgreSQL is an object that generates a sequence of integers based on a specified specification.

```sql
CREATE SEQUENCE [ IF NOT EXISTS ] sequence_name
  [ AS { SMALLINT | INT | BIGINT } ]
  [ INCREMENT [ BY ] increment ]
  [ MINVALUE minvalue | NO MINVALUE ] 
  [ MAXVALUE maxvalue | NO MAXVALUE ]
  [ START [ WITH ] start ] 
  [ CACHE cache ] 
  [ [ NO ] CYCLE ]
  [ OWNED BY { table_name.column_name | NONE } ]
```

The `CYCLE` allows you to restart the value if the limit is reached. The next number will be the minimum value for the ascending sequence and maximum value for the descending sequence.

The `OWNED BY` clause allows you to associate the table column with the sequence so that when you drop the column or table, PostgreSQL will automatically drop the associated sequence.

Note that when you use the `SERIAL` pseudo-type for a column of a table, PostgreSQL automatically creates a sequence associated with the column.


## Creating an ascending sequence example

```sql
CREATE SEQUENCE mysequence
INCREMENT 5
START 100;
```

## Get the next value from the sequence

```sql
SELECT nextval('mysequence');
```

## Creating a descending sequence

```sql
CREATE SEQUENCE three
INCREMENT -1
MINVALUE 1 
MAXVALUE 3
START 3
CYCLE;
```

When you execute the following statement multiple times, you will see the number starting from 3, 2, 1 and back to 3, 2, 1 and so on:

```sql
SELECT nextval('three');
```


## Creating a sequence associated with a table column

```sql
CREATE TABLE order_details(
    order_id SERIAL,
    item_id INT NOT NULL,
    item_text VARCHAR NOT NULL,
    price DEC(10,2) NOT NULL,
    PRIMARY KEY(order_id, item_id)
);
```

Create a new sequence associated with the `item_id` column of the `order_details` table:

```sql
CREATE SEQUENCE order_item_id
START 10
INCREMENT 10
MINVALUE 10
OWNED BY order_details.item_id;
```

Insert three order line items into the order_details table:

```sql
INSERT INTO 
    order_details(order_id, item_id, item_text, price)
VALUES
    (100, nextval('order_item_id'),'DVD Player',100),
    (100, nextval('order_item_id'),'Android TV',550),
    (100, nextval('order_item_id'),'Speaker',250);
```

Query data from the `order_details` table:

```sql
SELECT
    order_id,
    item_id,
    item_text,
    price
FROM
    order_details;        
```

## Listing all sequences in a database

```sql
SELECT
    relname sequence_name
FROM 
    pg_class 
WHERE 
    relkind = 'S';
```

## Deleting sequences

If a sequence is associated with a table column, it will be automatically dropped once the table column is removed or the table is dropped.

You can also remove a sequence manually using the `DROP SEQUENCE` statement:

```sql
DROP SEQUENCE [ IF EXISTS ] sequence_name [, ...] 
[ CASCADE | RESTRICT ];
```
