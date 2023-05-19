# Redis Overview

Redis is an open source, advanced key-value store and an apt solution for building high performance, scalable web applications.

Redis has three main peculiarities that sets it apart:

- Redis holds its database entirely in the memory, using the disk only for persistence.
- Redis has a relatively rich set of data types when compared to many key-value data stores.
- Redis can replicate data to any number of slaves.

## Redis Advantages

- Exceptionally fast (read/write) − Redis is very fast and can perform about 110000 SETs per second, about 81000 GETs per second.
- Supports rich data types − list, set, sorted set, and hashes.
- Operations are atomic − All Redis operations are atomic
- Multi-utility tool − use cases such as caching, messaging-queues (Pub/Sub), any short-lived data in your application, such as web application sessions, web page hit counts, etc.
- Supports  client-side sharding to scale write performance

## Redis compared to other databases

Compared to **memcached**:
- Redis supports the writing of its data to disk automatically
- can store data in four structures in addition to plain string keys (as memcached does)
- Redis can be used either as a primary database or as an auxiliary database

*Store data in Redis only when the performance or functionality of Redis is necessary. Using other relational or non-relational data storage for data where slower performance is acceptable, or where data is too large to fit in memory economically.*


| Name | Type | Data storage options | Query types | Additional features |
|---|---|---|---|---|
| Redis | In-memory non-relational database | Strings, lists, sets, hashes, sorted sets | Commands for each data type for common access patterns, with bulk operations, and partial transaction support | Publish/Subscribe, master/slave replication, disk persistence, scripting (stored procedures) |
| memcached | In-memory key-value cache | Mapping of keys to values | Commands for create, read, update, delete, and a few others | Multithreaded server for additional performance |
| PostgreSQL | Relational database | Databases of tables of rows, views over tables, spatial and third-party extensions, customizable types | SELECT, INSERT, UPDATE, DELETE, built-in functions, custom stored procedures | ACID compliant, master/slave replication, multi-master replication (third party) |
| MongoDB | On-disk non-relational document store | Databases of tables of schema-less BSON documents | Commands for create, read, update, delete, conditional queries, and more | Supports map-reduce operations, master/ slave replication, sharding, spatial indexes |


## Why Redis?

By using Redis instead of memcached, your code can be shorter, easier to understand, easier to maintain, faster.

There are also many other cases where Redis is more efficient and/or easier to use than rela- tional databases.

Random writes to Redis data are always fast, because data is always in memory, and queries to Redis don’t need to go through a typical query parser/optimizer.

By using Redis instead of a relational or other primarily on-disk database, you can avoid writing unnecessary temporary data, avoid needing to scan over and delete this temporary data, and ultimately improve performance.


## Install Redis (macOS)

```sh
brew install redis
```

To start Redis in foreground:

```sh
redis-server
```

To stop Redis, press `Ctrl-C`


## Connect to Redis

```sh
redis-cli
```

Try running some commands in Redis REPL:

```sh
lpush demos redis-macOS-demo
rpop demos
```

## Reference

- https://www.tutorialspoint.com/redis/redis_configuration.htm
- Redis in Action