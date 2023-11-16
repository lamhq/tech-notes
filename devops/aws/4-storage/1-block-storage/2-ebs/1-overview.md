# EBS

## Overview

Amazon EBS is a service that provides block-level storage volumes you can attach to your EC2 instances. They're just virtual hard disks in the cloud.

EBS are storage volumes you can attach to your EC2 instances. It's just a virtual hard disk in the cloud.

You use them the same way you would you any system disk:
- create a file
- store data
- install application
- run an operating system
- run a database

Designed for production workloads, mission-critical workloads.

EBS is highly available. Automatically replicated within a single AZ to protect against hardware failures.

EBS is scalable. Dynamically increase capacity and change the volume type with no downtime or performance impact.

## IOPS and Throughput

### IOPS

- Measures the number of read and write operations per second.
- Important metric for quick transactions, low-latency apps, transactional workloads.
- The ability to action reads and writes very quickly.
- Volume type to choose: **Provisioned IOPS SSD** (io1 or io2).

### Throughput

- Measures the number of bits read or written per second (MB/s)
- Important metric for large datasets, large I/O sizes, complex queries
- The ability to deal with large datasets
- Volume type to choose: Throughput Optimized HDD (st1)

When you hear things like big data, data warehousing, ETL, think of **throughput**.


## Volume Types

There are two main categories of Amazon EBS volumes: solid-state drives (**SSDs**) and hard-disk drives (**HDDs**). 

SSDs provide strong performance for random input/output (I/O).

HDDs provide strong performance for sequential I/O.

### General Purpose SSD (gp2)

- A balance of price and performance.
- 16,000 IOPS/Volume. 250 MB/s throughput/volume.
- Suitable for boot volume or development and test applications that are not latency sensitive.


### General Purpose SSD (gp3)

- New generation of gp. 4 times faster than gp2.
- 99.9% durability.
- Choose gp3, don't use gp2.
- 3000 IOPS baseline performance and 125 MB/s regardless of volumne size.
- Can scale up to 16,000 IOPS and 1,000 MiB/s for an additional fee.
- Suitable for high performance applications: MySQL, Cassandra, virtual desktops, and Hadoop analytics.


### Provisioned IOPS SSD (io1)

- High performance & most expensive.
- 64,000 IOPS/volume. 1,000 MB/s throughput/volume.
- Use if you need more than **16,000 IOPS**.
- Suitable for OLTP (high performance databases) and latency-sensitive applications.


### Provisioned IOPS SSD (io2)

- Latest generation.
- Same price as io1.
- Higher durability & more IOPS. 99.999% durability.
- Suitable for OLTP and latency-sensitive applications.


### Throughput Optimized HDD (st1)

- Low-cost HDD volume.
- Cost-effective way to store mountains of data.
- Cannot be a boot volume.
- 99.9% durability.
- 500 MB/s throughput/volume.
- Designed for frequently accessed, throughput intensive workloads
- Suitable for big data, data warehouses, ETL, log processing

### Cold HDD (SC1)

- Lowest cost option
- Cannot be a boot volume
- Max 250 MB/s throughput/volume. Baseline throughput of 12 MB/s per TB. Ability to burst up to 80 MB/s per TB
- A good choice for colder data requiring fewer scans per day. Less frequently accessed data.
- Good for applications that need the lowest cost and performance is not a factor.


## EBS and EC2

If you stop or terminate an Amazon EC2 instance, all the data on the attached EBS volume remains available.

Amazon EBS volumes can only be connected with one computer at a time. You can detach an EBS volume from one EC2 instance and attach it to another EC2 instance in the same Availability Zone, to access the data on it.

You can scale Amazon EBS volumes in two ways:
- Increase the volume size, as long as it doesn't increase above the maximum size limit. For EBS volumes, the maximum amount of storage you can have is 16 TB.
- Attach multiple volumes to a single Amazon EC2 instance.


### Use Cases

Amazon EBS is useful when you need to retrieve data quickly and have data persist long-term. Volumes are commonly used in the following scenarios:

- Operating systems: Boot/root volumes to store an operating system.
- Databases: A storage layer for databases running on Amazon EC2 that rely on transactional reads and writes.
- Enterprise applications: Amazon EBS provides reliable block storage to run business-critical applications.
- Throughput-intensive applications: Applications that perform long, continuous reads and writes.


### Benefits

- **High availability**: When you create an EBS volume, it is automatically replicated within its Availability Zone to prevent data loss from single points of failure.
- **Data persistence**: The storage persists even when your instance doesn't.
- **Data encryption**: All EBS volumes support encryption.
- **Flexibility**: EBS volumes support on-the-fly changes. You can modify volume type, volume size, and input/output operations per second (IOPS) capacity without stopping your instance.
- **Backups**: Amazon EBS provides you the ability to create backups of any EBS volume.


### EBS Snapshots

Since your EBS volumes consist of the data from You can take incremental backups of EBS volumes by creating Amazon EBS snapshots.

An EBS snapshot is an incremental backup. The first backup taken of a volume copies all the data. For subsequent backups, only the blocks of data that have changed since the most recent snapshot are saved. 

> EBS snapshots can be used to create multiple new volumes, whether they're in the same Availability Zone or a different one.
> 
> When you take a snapshot of any of your EBS volumes, these backups are stored redundantly in multiple Availability Zones using Amazon S3.
> 
> This aspect of storing the backup in Amazon S3 will be handled by AWS, so you won't need to interact with Amazon S3 to work with your EBS snapshots. You simply manage them in the EBS console (which is part of the EC2 console).
