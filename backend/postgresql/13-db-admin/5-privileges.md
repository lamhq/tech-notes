# Privileges

## Types of Privileges

`SELECT`, `INSERT`, `UPDATE`, `ALTER`, `EXECUTE`, `DELETE`, and `TRUNCATE`.

Most privileges must have a context. `ALTER privilege`, `SELECT privilege`

Some privileges make sense without a context. `CREATEDB`, `CREATE ROLE`


## GRANT

```sql
GRANT some_privilege TO some_role;
```

**Allow the grantee can grant her own privileges to others (`WITH GRANT`):**

```sql
GRANT ALL ON ALL TABLES IN SCHEMA public TO mydb_admin WITH GRANT OPTION;
```

**Grant specific privileges to all roles (`PUBLIC` alias):**

```sql
GRANT SELECT, REFERENCES, TRIGGER ON ALL TABLES IN SCHEMA my_schema TO PUBLIC;
```

- You need to have the privilege you’re granting.
- You must have the GRANT privilege yourself.
- Some privileges always remain with the owner of an object and can never be granted away (`DROP`, `ALTER`).
- If you own a database, you may not necessarily own all the schemas within it.
- Being the owner of a PostgreSQL database does not give you access to all objects in the database. Another role could conceivably create a table in your database and deny you access to it!
- `ALL TABLES` includes regular tables, foreign tables, and views.

**Revoking some privileges of the defaults:**

```sql
REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA my_schema FROM PUBLIC;
```


## Default Privileges

```sql
GRANT USAGE ON SCHEMA my_schema TO PUBLIC;

ALTER DEFAULT PRIVILEGES IN SCHEMA my_schema
GRANT SELECT, REFERENCES ON TABLES TO PUBLIC;

ALTER DEFAULT PRIVILEGES IN SCHEMA my_schema
GRANT ALL ON TABLES TO mydb_admin WITH GRANT OPTION;

ALTER DEFAULT PRIVILEGES IN SCHEMA my_schema
GRANT SELECT, UPDATE ON SEQUENCES TO public;

ALTER DEFAULT PRIVILEGES IN SCHEMA my_schema
GRANT ALL ON FUNCTIONS TO mydb_admin WITH GRANT OPTION;

ALTER DEFAULT PRIVILEGES IN SCHEMA my_schema
GRANT USAGE ON TYPES TO PUBLIC;
```

- All roles of a PostgreSQL server are members of the group `PUBLIC`.
- If a user has rights to select from a table in a schema but no `USAGE` on the schema, then he will not be able to query the table.
- After granting privileges to tables and functions with a schema, don’t forget to grant usage on the schema itself.