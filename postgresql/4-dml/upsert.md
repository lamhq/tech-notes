# Upsert

The idea is that when you insert a new row into the table, PostgreSQL will update the row if it already exists, otherwise, it will insert the new row.

To use the upsert feature in PostgreSQL, you use the `INSERT ON CONFLICT` statement as follows:

```sql
INSERT INTO table_name(column_list) 
VALUES(value_list)
ON CONFLICT target action;
```

In this statement, the target can be one of the following:

- `(column_name)` – a column name that have a unique constraint.
- `ON CONSTRAINT` constraint_name – where the constraint name could be the name of the UNIQUE constraint.
- `WHERE predicate` – a WHERE clause with a predicate.

The action can be one of the following:

- `DO NOTHING` – means do nothing if the row already exists in the table.
- `DO UPDATE SET column_1 = value_1, .. WHERE condition` – update some fields in the table.


## Examples

```sql
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
	customer_id serial PRIMARY KEY,
	name VARCHAR UNIQUE,
	email VARCHAR NOT NULL,
	active bool NOT NULL DEFAULT TRUE
);
```

If the customer name exists in the  customers table, just ignore it (do nothing):

```sql
INSERT INTO customers (NAME, email)
VALUES('Microsoft','hotline@microsoft.com') 
ON CONFLICT ON CONSTRAINT customers_name_key 
DO NOTHING;
```

The following statement is equivalent to the above statement but it uses the name column instead of the unique constraint name as the target of the INSERT statement:

```sql
INSERT INTO customers (name, email)
VALUES('Microsoft','hotline@microsoft.com') 
ON CONFLICT (name) 
DO NOTHING;
```

Suppose, you want to concatenate the new email with the old email when inserting a customer that already exists, in this case, you use the UPDATE clause as the action of the INSERT statement as follows:

```sql
INSERT INTO customers (name, email)
VALUES('Microsoft','hotline@microsoft.com') 
ON CONFLICT (name) 
DO 
  UPDATE SET email = EXCLUDED.email || ';' || customers.email;
```