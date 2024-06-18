# Generate globally unique IDs

## Requirements

Common requirements for IDs that are used in social media such as Facebook, Twitter, LinkedIn, ...:
- Globally unique
- Order by time: IDs can be sorted by time without fetching additional info
- Numerical values only
- Have enpough space (64 bits): 
  - 2<sup>32</sup> = ~4 billion &rarr; not enough IDs.
  - 2<sup>64</sup> is big enough
  - 2<sup>128</sup> wastes space and is too long
- Highly scalable, low latency: Ability to generate a lot of IDs per second


## Solutions

### DB auto-increment

- Easy to setup
- Not globally unique


### UUID

- Easy to generate
- Globally unique
- Very long
- Not sorted by time
- Not numeric


### DB ticket server

A centralized system used to generate unique IDs.

Explanation:
- **Centralized Server**: A dedicated database server acts as the ticket server.
- **Sequence Generation**: The server has a table with a sequence number that gets incremented every time an ID is requested.
- **ID Retrieval**: When a service needs a new unique ID, it makes a request to the ticket server.
- **Atomic Operation**: The server atomically increments the sequence number and returns the new value as the unique ID.

Considerations:
- Globally unique: sequence number is always incremented, and concurrent requests are managed by the database's locking mechanisms
- Can become a bottleneck if the demand for new IDs is very high, as all requests must go through a single server.


### Using Redis

Using Redis' built-in data structures and atomic operations.

Explanation:
- **Atomic Counters**: Redis provides atomic operations to increment counters without race conditions.
- **INCR Command**: The `INCR` command is used to atomically increment a key's integer value and can be used to generate sequential IDs.
- **High Throughput**: Redis is in-memory and can handle a high volume of `INCR` operations, making it suitable for generating unique IDs at scale.
- **Persistence**: While Redis is primarily in-memory, it offers persistence options to ensure that the counter state isn't lost on restarts.

Considerations:
- Fast and reliable due to Redis's performance and atomicity guarantees.
- Adding/removing Redis instances for replication add complexity to ensure ID continuity in case of failures.


### ObjectID (MongoDB)

MongoDB uses **ObjectIDs** as globally unique identifiers for documents.

An ObjectID is a 12-byte identifier which ensures uniqueness across different machines and processes.

Here's how it's composed:
- 4 bytes for the timestamp, representing the creation time of the ObjectId.
- 5 bytes for a random value generated once per process. This ensures uniqueness across different machines.
- 3 bytes incrementing counter, initialized to a random value.

Pros:
- Globally unique: across machines and over time, suitable for generating unique IDs in distributed systems.

Potential issues:
- **Collision Potential**: If multiple processes on different machines start at the exact same second and have the same random value, there's a slight chance of ID collision.
- **Size**: ObjectIDs are 12 bytes long (96 bits), can add up in terms of storage space for large datasets.


### Twitter Snowflake ID

A method for generating unique IDs in distributed systems, and it's designed to be highly scalable.

Explanation:
- **Timestamp**: The first part of the ID is a timestamp, representing the time when the ID was generated.
- **Worker Node ID**: The second part is a worker node ID, which is unique for each server or process generating IDs.
- **Sequence Number**: The last part is a sequence number that increments with each ID generated on the same node at the same timestamp.

Pros:
- Allows for distributed ID generation without centralized coordination, which can be a significant advantage in large-scale systems.
- Algorithm is open source
- Widely used in the industry

Potential issues:
- If the system clocks are not properly synchronized across nodes, it can lead to ID collisions or out-of-order IDs.
- If the system time moves backwards, for example due to daylight saving time adjustments or manual changes, it can cause ID duplication or collisions.
- If more than the maximum number of sequence numbers are generated in one millisecond (the granularity of the timestamp), it can exhaust the available IDs for that time slot.

To mitigate these issues, careful system design and operational practices are required, such as using NTP (Network Time Protocol) for clock synchronization and ensuring unique worker node IDs.
