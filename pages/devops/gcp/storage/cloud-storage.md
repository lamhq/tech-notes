# Google Cloud Storage

## Overview

A service that offers durable and highly available [object storage](../aws/storage#object-storage).

Has no minimum fee, pay only for what you use. 

Data is encrypted before written to disk.


## Buckets

Buckets are containers that hold and store your objects.

A bucket needs a globally unique name and a specific geographic location for where it should be stored.


## Storage classes

All of storage classes:
- Unlimited storage with no minimum object size requirement
- Worldwide accessibility and locations
- Low latency and high durability
- Geo-redundancy if data is stored in a multi-region or dual-region.

### Standard

For frequently accessed, or stored for only brief periods of time.

No minimum storage duration.

You are charged for the storage of the data.

### Nearline

Data that is accessed once a month or less.

There's a retrieval fee and a small price to pay for storage.

### Coldline

Low-cost option for storing infrequently accessed data, once every 90 days.

There's a retrieval fee and a storage cost.

### Archive

Lowest-cost option, access less than once a year.

Ideally for data archiving, online backup, and disaster recovery.

There's a retrieval fee and a storage cost.

Retrieving data can take a lot more time than other storage classes.
