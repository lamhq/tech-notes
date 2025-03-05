# Caching Strategies

There are several caching strategies. Your caching strategy depends on the data and data access patterns. Choosing the right caching strategy is the key to improving performance.


## Cache-Aside

Application directly talks to both the cache and the database.

It checks the key in cache, and if it's not there, the application fetches it from the storage and then updates the cache.

![](https://codeahoy.com/img/cache-aside.png)

Pros:
- Cache only what's needed
- Data model in cache can be different than the data model in database.

Cons:
- Cache misses are expensive due to the extra penalty of loading, and updating data in the cache.
- Stale data can occur when the cache is inconsistent with the database.
- Managing the cache increases the complexity for the application.


## Read-Through

Application doesn't have access to the database but instead always interacts with the cache API.

In case of a cache miss, the API loads the missing data from the database, populates the cache, and returns it to the application.

It's a common pattern in ORM frameworks.

![](https://codeahoy.com/img/read-through.png)

Pros:
- Cache only what's needed
- Transparent to the application

Cons:
- Data model must be the same with database.
- Cache misses are expensive
- Data staleness


## Write-Through

Similar to Read Through, application interact with an API that also update the cache when data is written.

DynamoDB Accelerator (DAX) is a good example of read-through / write-through cache.

![](https://codeahoy.com/img/write-through.png)


Pros:
- Cache always remains consistent with the database

Cons:
- Writes are expensive because data needs to be updated in both the cache and the database
- Redudant data: we write data to cache that never be read



## Write-Behind (Write-Back)

Similar to Write-Through, but data is not written immediately.

Data updates are batched and flushed to the database later.

![](https://codeahoy.com/img/write-back.png)

When combined with **Read-through**, it works good for mixed workloads, where the most recently updated and accessed data is always available in cache.

Most relational databases storage engines (i.e. InnoDB) have Write-Behind cache enabled by default in their internals. Queries are first written to memory and eventually flushed to the disk.

Use cases:
- Good for write-heavy workloads.

Pros:
- No write penalty
- Reduce load on the database (because of bulk update)

Cons:
- If there's a cache failure, the data may be permanently lost.
- Data staleness if we don't flush data to database often
