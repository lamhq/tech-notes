# Consistent Hashing

## Overview

Consistent hashing is a special kind of hashing technique to distribute data across multiple nodes in a way that minimizes data movement when nodes are added or removed.

On average, when a hash table is resized, only `k/m` keys is remapped:
- `k`: the number of keys
- `m`: the number of nodes

In a sharded database, consistent hashing can be used to determine which shard a particular piece of data should go to. This helps in evenly distributing the data across all shards.


## How it works

### Hash ring
We have a hash function that takes a string and returns a hashed value (e.g., MD5, SHA-1).

The hash space is defined by the output range of the hash function, from $x_0$ to $x_n$. This space is typically represented as a ring (hash ring).

![](./consistent-hashing/hash-ring.drawio.svg)

### Position
Both the nodes (servers) and the data (keys) are hashed using the hash function. It maps them to positions on the hash ring.

![](./consistent-hashing/nodes.drawio.svg)

*In above figure, we have nodes $n_0$, $n_1$, $n_2$, $n_3$ and keys $k_0$, $k_1$, $k_2$, $k_3$ are hashed and mapped to the hash ring.*

### Data distribution
When a data item needs to be stored, it is hashed to a position on the ring. The data item is then assigned to the first node that appears clockwise from its position on the ring.

![](./consistent-hashing/item-location.drawio.svg)

*In above figure, $k_0$ belong to $n_0$, $k_1$ belong to $n_1$, $k_2$ belong to $n_2$, $k_3$ belong to $n_3$.*

### Adding Node
When a new node is added, it is assigned a position on the hash ring based on its hash value. Only the data between the new node and the preceding node needs to be redistributed.

![](./consistent-hashing/add-node.drawio.svg)

*In above figure, when $n_4$ is inserted between $n_3$ and $n_0$, only keys between $n_3$ and $n_4$ are redistributed: $k_0$ is now belong to $n_4$, not $n_0$.*

### Removing Node
When a node is removed, items belong to that node are redistributed to the next node on the ring.

![](./consistent-hashing/remove-node.drawio.svg)

*In above figure, when $n_1$ is removed, $k_1$ is redistributed to $n_2$.*


## Virtual nodes

Let's start with some problems with the basic approach:
- Uneven partition sizes: Some partitions may be very small or very large.
- Non-uniform key distribution: Data (keys) may not spread evenly across all nodes because nodes are distributed at different positions on the ring.

**Virtual nodes** (or **v-nodes**) are a technique used to improve the distribution of data across a cluster of servers. It helps to evenly distribute data and load across all servers.

Each physical server in the cluster is assigned multiple virtual nodes.

They are distributed around the hash ring, along with data.

To find which server a key is stored on, we go clockwise from the key’s location and find the first virtual node encountered on the ring.


### Benefits

By having multiple virtual nodes per physical server, the data is more evenly spread out, leading to better load balancing.

If a server fails, its virtual nodes can be quickly reassigned to other servers, ensuring continuous availability.


### Example

Suppose you have two physical servers (A, B).

Instead of each server being represented once on the hash ring, each server might be represented by multiple virtual nodes (e.g., A0, A1, A2, B0, B1, B2).

This way, the data is more evenly distributed across the servers.

![](./consistent-hashing/virtual-nodes.drawio.svg)
