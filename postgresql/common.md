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