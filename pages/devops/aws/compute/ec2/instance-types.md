# Instance Types

## Overview

Amazon EC2 provides a wide selection of instance types optimized to fit different use cases.

Instance types comprise varying combinations of CPU, memory, storage, and networking capacity and give you the flexibility to choose the appropriate mix of resources for your applications.

An instance type consist of a instance family (identifying the type of workloads they're optimized for) and a instance size.

For example, the instance type `c5.large` can be broken down into the following elements.

- `c5` determines the instance family and generation number. Here, the instance belongs to the fifth generation of instances in an instance family that's optimized for generic computation.
- `large` determines the amount of instance capacity, 2 vCPUs and 4 GB of memory.


## General purpose

Provide a balance on compute, memory, and networking resources, and can be used for a variety of diverse workloads.

Families: Mac, T4g, T3, T3a, T2, M6g, M6i, M5, M5a, M5n, M5zn, M5, A1


## Compute optimized

Ideal for compute bound applications that benefit from high performance processors.

Families: C6g, C6gn, C6i, C5, C5a, C5n, C4

Use cases:
- high-performance web servers
- compute-intensive applications servers
- scientific modeling
- batch processing
- distributed analytics
- high-performance computing (HPC)
- machine/deep learning, ad serving
- highly scalable multiplayer gaming


## Memory optimized

Designed to deliver fast performance for workloads that process large data sets in memory.

Families: R6g, R5, R5a, R5b, R5n, R4, X2gd, X1e, X1, High Memory, z1d

Use cases:
- high-performance databases
- distributed web-scale in-memory caches
- mid-size in-memory databases
- real-time big-data analytics
- other enterprise applications.


## Storage optimized

Provides Non-Volatile Memory Express (NVMe) SSD-Backed instance storage

Optimized for low latency, very high random I/O performance, high sequential read throughput and high IOPS at a low cost.

Families: I3, I3en, D2, D4, D3en, H1

Use cases:
- NoSQL databases, such as Cassandra, MongoDB, and Redis
- in-memory databases
- scale-out transactional databases
- data warehousing, Elasticsearch, and analytics.


## Accelerated computing

Use hardware accelerators or co-processors to perform some functions more efficiently than is possible in software running on CPUs.

Families: P4, P3, P2, DL1, Inf1, G5, G4dn, G4ad, G3, F1, VT1

Use cases:
- floating-point number calculations
- data pattern matching
- game streaming
- application streaming
- graphics processing, video encoding
- 3D visualizations, 3D rendering
- graphics-intensive remote workstations


## Resizing instance sizes

You can resize your instance by changing its instance type

The instance must be stopped before you can change its type. EC2 doesn't support changing the size of a running instance.