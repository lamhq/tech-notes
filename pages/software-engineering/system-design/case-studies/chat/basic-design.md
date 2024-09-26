# Basic Design

## Architecture

1. We have backend servers sit behind a load balancer
2. Client will communicate with the load balancer using REST API 
3. Messages are sent from client to backend through the load balancer and stored in a single database
4. All client will poll for new message every 5 second

![](./basic-design.drawio.svg)


## DB Design

Message table design:

| Name         | Type      |
|--------------|-----------|
| from_user_id | UUID      |
| to_user_id   | UUID      |
| message      | text      |
| send_at      | timestamp |

The query for messages look like this:
```sql
SELECT *
FROM messages
WHERE (from_user_id='54d8850' AND to_user_id='9dba07d')
  OR (from_user_id='9dba07d' AND to_user_id='54d8850')
ORDER BY send_at DESC
LIMIT 10
```

With that query, we can at index on columns to speed up the query: `from_user_id`, `to_user_id` and `send_at`. This depends on the result of `EXPLAIN` command.


## Throughput calculation

1 Billion messages a day:
- 40M messages per hour
- 700K messages a minute
- 12K messages a second
- 12K inserts per second

App refresh for new message every 5 second
- 12 refreshes a minute per session
- 12/60 refreshes a second per session

1M chat sessions at a time:
- 1M * 12/60 refreshes per second
- 200k selects per second 

#### Rephrased Text

Executing 200k selects per second is excessive, and continuous client polling is inefficient.