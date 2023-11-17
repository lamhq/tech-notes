# Amazon Elastic File System (EFS)

## Overview

EFS is a managed network file system (NFS) that can be mounted on many EC2 instances (as a shared storage).

- EFS works with EC2 instances in multiple AZs.
- Data is stored across multiple AZs within a region.
- File system scales automatically; no capacity planning required.
- Highly available, scalable, but expensive.
- Read-after-write consistency. Ensures that data written to a file is immediately available for reading.
- Pay per use.
- Encryption at rest using KMS.
- Compatible with Linux-based AMI (not Windows).
- Uses NFSv4 protocol.

## Performance

- can support thousands of concurrent connections (EC2 instances).
- can handle up to 10 Gbps in throughput.
- can scale storage to petabytes.


## Use cases

- If you need highly scalable shared storage using NFS, think of EFS.
- Content management systems, share content between EC2 instances.
- Web servers. Have just a single folder structure for your website.


## Using

When creating an EFS file system, you can set what performance characteristics you want.

- **General Purpose**: Used for things like web servers, CMS, etc.
- **Max I/O**: Used for big data, media processing, etc.


## Storage Tiers

EFS comes with storage tiers and lifecycle management, allowing you to move your data from one tier to another after X number of days.

- **Standard**: For frequently accessed files
- **Infrequently Accessed**: For files not frequently accessed


## Comparison with EBS

### Amazon EBS

- Volumes attach to EC2 instances
- An Amazon EBS volume stores data in a single Availability Zone. 
- To attach an Amazon EC2 instance to an EBS volume, both the Amazon EC2 instance and the EBS volume must reside within the same Availability Zone.

### Amazon EFS

- Amazon EFS is a regional service. It stores data in and across **multiple** Availability Zones. 
- The duplicate storage enables you to access data concurrently from all the Availability Zones in the Region where a file system is located. Additionally, on-premises servers can access Amazon EFS using AWS Direct Connect.