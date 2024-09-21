# Redis

## Overview

Redis is an open source, distributed, in-memory, key-value store that can be used as a cache, database, and message broker.

Redis stores data in memory, which allows for extremely fast read and write operations.


## Features

Can persist data to disk, offering different levels of durability.

Supports rich data types: list, set, sorted set, hashes.

Support multiple use cases: caching, messaging-queues (Pub/Sub), short-lived data such as web sessions, web page hit counts.

Supports client-side sharding to scale write performance.

Support master-slave replication with automatic failover.

Support TTL (time-to-live).


## Advantages

- Extremely high throughput (~100K ops/sec).
- Fast reads/writes as data is always in memory.
- Atomic operations.
- Shorter, maintainable code using Redis over memcached.
- More efficient than relational databases in some cases.


## Disadvantages

- Data size is limited by RAM (biggest server is ~500 GB RAM).
- No support for JSON or nested data types.
- Redis is often deployed as a remote service, may involve network latency and complexity during integration


## Redis as primary database

Reasons why Redis should not be used as a primary database:
- Limited in modeling real-world objects due to its key-value nature.
- Data persistence is every second, risking data loss on crashes.
- RAM limits data size, making it unsuitable for large datasets.
- Limited transaction support, lacking rollback capabilities.
- Limited query capabilities.
- Lacks robust built-in authentication and authorization like relational databases.
- No support for data integrity with foreign keys.


## .vs Memcached

Redis compared to **memcached**:
- Redis supports the writing of its data to disk automatically
- can store data in four structures in addition to plain string keys (as memcached does)
- Redis can be used either as a primary database or as an auxiliary database
