# Debug

## Watching Statements

The `\watch` command is used to repeatedly run an SQL statement at fixed intervals so you can monitor the output.

Watching connection traffic every 10 seconds:

```sql
SELECT datname, query
FROM pg_stat_activity
WHERE state = 'active' AND pid != pg_backend_pid();
\watch 10
```

To kill a watch, use `CTRL-X` `CTRL-C`.
