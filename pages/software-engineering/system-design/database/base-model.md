# BASE model

## Overview

The BASE model is a set of principles that guide the design of distributed systems to achieve high availability and scalability.

It's an approach used in distributed systems (particularly in NoSQL databases)

BASE stands for:
- **Basically Available**: reading and writing operations are available as much as possible (using all nodes of a database cluster), but might not be consistent (the write might not persist after conflicts are reconciled, and the read might not get the latest write).
- **Soft-state**: Replicas are not consistent all the time; so the state may only be partially correct as it may not yet have converged.
- **Eventually consistent**: If we execute some writes and then the system functions long enough, we can know the state of the data; any further reads of that data item will return the same value.

It's a less strict model compared to ACID principles used in traditional databases.

BASE is better suited for large-scale, distributed systems where performance and availability are more critical than immediate consistency.