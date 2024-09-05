# Database scaling

## Vertical scaling (scale up)

Vertical scaling is the scaling by adding more power (CPU, RAM, storage, etc.) to an existing machine.

**Advantages**: Simpler to implement and manage, cost-effective for small systems.

**Disadvantages**:
- Limited by the maximum capacity of a single machine
- potential for a single point of failure
- The overall cost is high. Powerful servers are much more expensive


## Horizontal scaling (sharding)

Horizontal scaling is the practice of splitting dataset into smaller chunks (shards), distributed across multiple servers.

Each shard shares the same schema, though the actual data on each shard is unique to the shard.

Sharding is a great technique to scale the database but also introduces complexities and new challenges to the system.


### Example

Let's consider an example where we have a user database with millions of users. We can shard the database based on the user ID to distribute the load across multiple servers.

Anytime you access data, a hash function is used to find the corresponding shard.

In our example, `user_id % 4` is used as the hash function. If the result equals to `0`, **shard 0** is used to store and fetch data. If the result equals to `1`, **shard 1** is used. The same logic applies to other shards.

<!-- system-components.drawio\db-sharding -->
<iframe frameborder="0" style="width:100%;height:193px;" src="https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=https%3A%2F%2Fapp.diagrams.net%2F%23G1xrjy2i7EtAS1xlFNMl48jnZR4opOYRTK%23%257B%2522pageId%2522%253A%2522eBzyNzvXHGSGHi2O0qMN%2522%257D&layers=1&nav=1&title=system-components.drawio&page-id=eBzyNzvXHGSGHi2O0qMN#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1xrjy2i7EtAS1xlFNMl48jnZR4opOYRTK%26export%3Ddownload"></iframe>


### Sharding key

The most important factor to consider when implementing a sharding strategy is the choice of the sharding key (partition key).

Sharding key consists of one or more columns that determine how data is distributed.

When choosing a sharding key, one of the most important criteria is to choose a key that can evenly distributed data.


### Resharding data

Resharding data is needed when a single shard could no longer hold more data due to rapid growth.

Certain shards might experience shard exhaustion faster than others due to uneven data distribution.

When shard exhaustion happens, it requires updating the sharding function and moving data around.

Consistent hashing is a commonly used technique to solve this problem.


### Celebrity problem

Also known as the hotspot problem, occurs when a particular shard receives a disproportionately high amount of traffic compared to others.

This can lead to performance bottlenecks and uneven load distribution.

*Imagine a social media platform where data for Katy Perry, Justin Bieber, and Lady Gaga all end up on the same shard. That shard will be overwhelmed with read operations. To solve this problem, we may need to allocate a shard for each celebrity. Each shard might even require further partition.*


### De-normalization

Once a database has been sharded across multiple servers, it is hard to perform join operations across database shards.

A common workaround is to de-normalize the database so that queries can be performed in a single table.
