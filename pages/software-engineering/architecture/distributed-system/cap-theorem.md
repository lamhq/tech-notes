# CAP Theorem

## Overview

The CAP theorem, also known as Brewer's theorem, states that a distributed data store can provide only two of the following three guarantees (not all):

1. **Consistency**: every read receives the most recent write or an error.
2. **Availability**: every request receives a (non-error) response, without guarantee that it contains the most recent write.
3. **Partition Tolerance**: The system continues to operate even if a network partition causes communication errors between subsystems.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/CAP_Theorem_Venn_Diagram.png/440px-CAP_Theorem_Venn_Diagram.png)


## Network Partition

A **Network Partition** refers to a break in the network that prevents communication between nodes in a distributed system. 

This means some nodes cannot access data on other nodes, which challenges the system's ability to maintain consistency and availability simultaneously.

To always ensure partition tolerance (P), a system must choose between consistency (C) and availability (A).


## Explanation

In the **presence of a network partition**, one has to choose between consistency and availability:
- cancel the operation and thus decrease the availability but ensure **consistency**
- proceed with the operation and try to return the most recent available version of the information, even if it cannot guarantee it is up to date, thus provide **availability**.

In the **absence of a partition** (no network failure), both availability and consistency can be satisfied:
- every request receives a response about whether it was successful or failed (availability)
- all nodes see the same data at the same time (consistency)
