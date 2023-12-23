# Amazon Elastic File System (EFS)

## Overview

EFS is a managed network file system (NFS) that can be mounted on many EC2 instances (as a shared storage).

- Support Network File System version 4 (NFSv4) protocol.
- Pay for the storage you use (no pre-provisioning).
- Can support thousands of concurrent connections.
- Can scale up to petabytes.
- Can handle up to 10 Gbps in throughput.
- Data is stored across multiple AZs within a region.
- Read-after-write consistency. Data is immediately available for reading after written.
- Works with EC2 instances in multiple AZs.
- Expensive.
- Encryption at rest using KMS.
- Compatible with **Linux-based** AMI (not Windows).


## Use cases

- Scalable shared storage using NFS
- Share content between EC2 instances.
- Content management systems, Web servers


## Using

When creating an EFS file system, you can set what performance characteristics you want.

- **General Purpose**: Used for things like web servers, CMS, etc.
- **Max I/O**: Used for big data, media processing, etc.


## Storage Tiers

EFS comes with storage tiers and lifecycle management, allowing you to move your data from one tier to another after X number of days.

- **Standard**: For frequently accessed files
- **Infrequently Accessed**: For files not frequently accessed


## EFS vs. EBS

### EBS

- EBS are volumes attach to EC2 instances
- An Amazon EBS volume stores data in a single AZ. 
- EC2 instance and the EBS volume must reside within the same AZ.

### EFS

- EFS stores data in and across **multiple** AZs. 
- The duplicate storage enables you to access data concurrently from all the AZs in the Region where a file system is located. 
- On-premises servers can access Amazon EFS using **AWS Direct Connect**.