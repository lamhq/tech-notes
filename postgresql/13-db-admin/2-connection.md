# Managing Connections

Retrieve a listing of recent connections and process IDs (PIDs)

```sql
SELECT * FROM pg_stat_activity;
```

Cancel active queries on a connection with PID

```sql
SELECT pg_cancel_backend(1234);
```

Terminate the connection

```sql
SELECT pg_cancel_backend(1234);
```

Kill all connections belonging to a role

```sql
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE usename = 'some_role';
```

Check for Queries Being Blocked

```sql
SELECT * FROM pg_stat_activity WHERE wait_event IS NOT NULL;
```