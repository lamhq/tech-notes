## Connect to remote server

```shell
psql -h <host> -p <port> -U <username> -W <password> <database>
```


## Display script running progress

```sql
CREATE TABLE mytest (n int);
```

```shell
seq 10000000 > /tmp/data.txt
pv /tmp/data.txt | psql -c "COPY mytest FROM STDIN;"
```

Reference: [Stackoverflow](https://dba.stackexchange.com/questions/50602/how-do-i-find-out-how-far-along-my-postgresql-query-is)


## Dump database schema with pg_dump

```bash
pg_dump -U postgres -h localhost mobilesc_dev -s > ddl.sql
```


## Fix pg_dump version mismatch

```bash
sudo ln -s /usr/pgsql-11/bin/pg_dump /usr/bin/pg_dump --force
```


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


## List all indexes in database
```sql
SELECT tablename, indexname
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```