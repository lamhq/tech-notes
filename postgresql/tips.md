
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


## List all indexes in database
```sql
SELECT tablename, indexname
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```