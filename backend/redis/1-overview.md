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

https://www.tutorialspoint.com/redis/redis_configuration.htm