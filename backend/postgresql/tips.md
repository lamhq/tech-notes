
## Display script running progress

```sql
CREATE TABLE mytest (n int);
```

```shell
seq 10000000 > /tmp/data.txt
pv /tmp/data.txt | psql -c "COPY mytest FROM STDIN;"
```

Reference: [Stackoverflow](https://dba.stackexchange.com/questions/50602/how-do-i-find-out-how-far-along-my-postgresql-query-is)


## Disable trigger for faster bulk loading data

```bash
# This disables triggers for the current session.
SET session_replication_role = replica;

# To re-enable for the same session:
SET session_replication_role = DEFAULT;
```


## List all triggers in database
```sql
select event_object_schema as table_schema, event_object_table as table_name,trigger_name
from information_schema.triggers
group by 1,2,3
order by table_schema, table_name;
```


## List all tables in database, order by size

```sql
select table_name, pg_size_pretty(pg_relation_size(quote_ident(table_name)))
from information_schema.tables
where table_schema = 'public'
order by pg_relation_size(quote_ident(table_name)) DESC;
```

## Log SQL Queries

- Open you `data/postgresql.conf` in your data directory:
  ```sh
  cd /opt/homebrew/var/postgres
  code postgresql.conf
  ```
- change the `log_statement` setting to `'all'`
- make sure that the `log_directory` directory already exists inside of the data directory, and that the postgres user can write to it. If not, run these command:
- restart Postgres