# Cache

## Overview

A cache is a temporary storage area that stores the result of expensive responses or frequently accessed data in memory so that subsequent requests are served more quickly.

Caching is one of the easiest ways to increase system performance. If done right, caches can reduce response times, decrease load on the database, and save costs. Otherwise, you may introduce additional latency or, at the very least, not see the full benefits.

Use Cases: work best for read-heavy workloads, when data is read frequently but modified infrequently.


## Best Practices

Don't use cache to store critical data. Since cached data is stored in memory, if a cache server restarts, all the data in memory is lost.

Implement an **expiration policy** to remove data on expired. Setting the expiration date too short will cause the system to reload data from the database frequently. Meanwhile, if set too long, the data can become stale.

Ensure **data consistency** by keeping the data store and the cache in sync.

Multiple cache servers across different data centers are recommended to avoid **SPOF** (Single point of failure).

![](https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Single_Point_of_Failure.png/400px-Single_Point_of_Failure.png)

**Overprovision the required memory** for cache servers to handle unexpected spikes in demand without performance degradation.

Choose an approriate **eviction policy** to determines which data should be removed once the cache is full: Least-recently-used (LRU), Least Frequently Used (LFU) or First in First Out (FIFO).


## Caching strategy

There are several caching strategies. Your caching strategy depends on the data and data access patterns. Choosing the right caching strategy is the key to improving performance.


### Cache-Aside

Application directly talks to both the cache and the database.

There is no connection between the cache and the primary database.

All operations to cache and the database are handled by the application. 

![](https://codeahoy.com/img/cache-aside.png)

1. The application first checks the cache.
2. If the data is found in cache, we’ve cache hit. The data is read and returned to the client.
3. If the data is not found in cache, we’ve cache miss. The application queries the database to read the data, returns it to the client and stores the data in cache so the subsequent reads for the same data results in a cache hit.

Pros:
- Systems using cache-aside are resilient to cache failures. If the cache cluster goes down, the system can still operate by going directly to the database.
- Data model in cache can be different than the data model in database.

Cons:
- **Stale Data**: it is possible for data to become inconsistent between cache and the database
  - To deal with this, time to live (TTL) is used. Stale data continues to be used until TTL expires.
  - If data freshness must be guaranteed, developers either invalidate the cache entry or use an appropriate write strategy.
- **Complexity**: Handling cache invalidation, eviction policies, and concurrent requests in code is challenging and increases the risk of bugs.
- **Increased Read Latency**: fetching new data incurs the extra penalty of loading data to the cache.


### Read-Through Cache

The cache layer sits before the database. When there is a cache miss, it loads missing data from database, populates the cache and returns it to the application.

![](https://codeahoy.com/img/read-through.png)

While read-through and cache-aside are very similar, there are at least two key differences:
- In cache-aside, the application is responsible for fetching data from the database and populating the cache. In read-through, this logic is usually supported by the library or stand-alone cache provider.
- The data model in read-through cache cannot be different than that of the database.


Pros:
- **Simplicity**: application doesn't need to manage cache

Cons: same as cache-aside


### Write-Through Cache

Writes always go through the cache to the database. This helps cache maintain consistency with the main database.

DynamoDB Accelerator (DAX) is a good example of read-through / write-through cache.

![](https://codeahoy.com/img/write-through.png)

When an application wants to write data or update a value:
1. The application writes the data directly to the cache.
2. The cache updates the data in the main database.

Pros:
- Cache always remains consistent with the database

Cons: 
- Latency for Writes: When using a write-through strategy, writes can be slower because data needs to be updated in both the cache and the database



### Write-Back

Similar to Write-Through, but data is written asynchronously to the cache, the application doesn't need to wait for the cache to be updated before returning a response.

![](https://codeahoy.com/img/write-back.png)

This is sometimes called write-behind as well.

If batching or coalescing is supported, it can reduce overall writes to the database, which decreases the load and reduces costs.

Most relational databases storage engines (i.e. InnoDB) have write-back cache enabled by default in their internals. Queries are first written to memory and eventually flushed to the disk.

Use cases:
- Good for write-heavy workloads.

Pros:
- When combined with read-through, it works good for mixed workloads, where the most recently updated and accessed data is always available in cache.

Cons:
- If there’s a cache failure, the data may be permanently lost.
