# Block Storage

## Overview

While file storage treats files as a singular unit, block storage splits files into fixed-size chunks of data called **blocks** that have their own addresses. Since each block is addressable, blocks can be retrieved efficiently.

When data is requested, these addresses are used by the storage system to organize the blocks in the correct order to form a complete file to present back to the requestor.

**When you want to change a character in a file, you just change the block, or the piece of the file, that contains the character.** This ease of access is why block storage solutions are fast and use less bandwidth.

![](images/block-storage.png)

Since block storage is optimized for low-latency operations, it is a typical storage choice for high-performance enterprise workloads, such as databases or enterprise resource planning (ERP) systems, that require low-latency storage.


## Amazon EC2 Instance Store

Block-level storage volumes behave like physical hard drives.

An instance store provides temporary block-level storage for an Amazon EC2 instance. When the instance is terminated, you lose any data in the instance store.

It's ideal for temporary storage of information that changes frequently, such as buffers, caches, scratch data, and other temporary content.


## Amazon Elastic Block Storage (Amazon EBS) 

Amazon EBS  is a service that provides block-level storage volumes that you can use with Amazon EC2 instances.

If you stop or terminate an Amazon EC2 instance, all the data on the attached EBS volume remains available.

Most Amazon EBS volumes can only be connected with one computer at a time. You can detach an EBS volume from one EC2 instance and attach it to another EC2 instance in the same Availability Zone, to access the data on it.


You can scale Amazon EBS volumes in two ways:
- Increase the volume size, as long as it doesn't increase above the maximum size limit. For EBS volumes, the maximum amount of storage you can have is 16 TB.
- Attach multiple volumes to a single Amazon EC2 instance.


### Use Cases

Amazon EBS is useful when you need to retrieve data quickly and have data persist long-term. Volumes are commonly used in the following scenarios:

- Operating systems: Boot/root volumes to store an operating system.
- Databases: A storage layer for databases running on Amazon EC2 that rely on transactional reads and writes.
- Enterprise applications: Amazon EBS provides reliable block storage to run business-critical applications.
- Throughput-intensive applications: Applications that perform long, continuous reads and writes.


### Volume Types

|  | EBS Provisioned IOPS SSD | EBS General Purpose SSD | Throughput Optimized HDD | Cold HDD |
|---|---|---|---|---|
| Description | Highest performance SSD designed for latency-sensitive transactional workloads | General purpose SSD that balances price and performance for a wide variety of transactional workloads | Low-cost HDD designed for frequently accessed, throughput intensive workloads | Lowest cost HDD designed for less frequently accessed workloads |
| Use Cases | I/O-intensive NoSQL and relational databases | Boot volumes, low-latency interactive apps, development, and test | Big data, data warehouses, log processing | Colder data requiring fewer scans per day |
| Volume Size | 4 GB-16 TB | 1 GB-16 TB | 500 GB-16 TB | 500 GB-16 TB |
| Max IOPS/Volume  | 64,000 | 16,000 | 500 | 250 |
| Max Throughput/Volume | 1,000 MB/s | 250 MB/s | 500 MB/s | 250 MB/s |

There are two main categories of Amazon EBS volumes: solid-state drives (**SSDs**) and hard-disk drives (**HDDs**). SSDs provide strong performance for random input/output (I/O), while HDDs provide strong performance for sequential I/O. AWS offers two types of each.


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
