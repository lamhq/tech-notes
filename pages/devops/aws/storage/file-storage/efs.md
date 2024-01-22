# Amazon Elastic File System (EFS)

## Overview

Amazon EFS is a fully managed service for hosting Network File System (NFS) filesystems in the cloud.

It is an implementation of a NFS file share and is accessed using the NFS protocol.

Can scale up to petabytes. Elasticly and grows and shrinks as you add and remove data.

Support thousands of concurrent connections of Amazon EC2 instances, from multiple AZs. A file system can be accessed concurrently from all AZs in the region where it is located.

Only available for **Linux** instances.

Data is stored across multiple AZs within a region.

Read-after-write consistency.


## Use cases

- Scalable shared storage using NFS
- Share content between EC2 instances.
- Content management systems, Web servers


## How to use?

EFS-based files are accessed from within a VPC via **NFS mounts** on EC2 Linux instances or from your on-premises servers (through VPN or Direct Connect connections).

You mount an AWS EFS file system on your on-premises Linux server using the standard Linux mount command for mounting a file system via the NFS protocol.

When you create a file system, you create endpoints in your VPC called “mount targets”.

When mounting from an EC2 instance, your file system’s DNS name, which you provide in your mount command, resolves to a mount target’s IP address.

The Amazon VPC of the connecting instance must have DNS hostnames enabled.

You can configure mount-points in one, or many, AZs. Need to create mount targets and choose AZs to include (recommended to include all AZ’s).

The following diagram depicts the various options for mounting an EFS filesystem:

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-efs-file-system.jpeg)


## Performance

There are two performance modes:
- **General Purpose**: appropriate for most file systems.
- **Max I/O**: Used for big data, media processing, etc. Support tens, hundreds, or thousands of EC2 instances accessing the file system.

Amazon EFS is designed to burst to allow high throughput levels for periods of time.

There are two throughput modes:
- "Bursting": throughput scales with file system size.
- "Provisioned": Throughput is fixed at the specified amount.


## Storage Tiers

EFS comes with storage tiers and lifecycle management, allowing you to move your data from one tier to another after X number of days.

- **Standard**: For frequently accessed files
- **Infrequently Accessed**: For files not frequently accessed


## Pricing

Pay for the storage you use (no pre-provisioning)

Expensive. $0.30/GB-month


## EFS vs. EBS

| &nbsp; | Amazon EFS | Amazon EBS Provisioned IOPS |
|---|---|---|
| What? | File system accessed via NFS mounts | Volumes attach to EC2 instances |
| Availability and durability | Data is stored redundantly across multiple AZs | Data is stored redundantly in a single AZ |
| Access | Up to thousands of Amazon EC2 instances, from multiple AZs, can connect concurrently to a file system | A single Amazon EC2 instance in the same AZ with the attached volume |
| Use cases | Big data and analytics, media processing and workflows, content management, web serving and home directories | Boot volumes, transactional and NoSQL databases, data warehousing and ETL |

### EBS

- EBS are volumes attach to EC2 instances
- An Amazon EBS volume stores data in a single AZ. 
- EC2 instance and the EBS volume must reside within the same AZ.

### EFS

- EFS stores data in and across **multiple** AZs. 
- The duplicate storage enables you to access data concurrently from all the AZs in the Region where a file system is located. 
- On-premises servers can access Amazon EFS using **AWS Direct Connect**.