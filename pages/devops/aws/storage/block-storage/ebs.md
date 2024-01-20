# Amazon Elastic Block Store (Amazon EBS)

## Overview

Amazon EBS is a service that provides **block-level storage** volumes you can attach to your EC2 instances.

Highly available. EBS volume data is replicated across multiple servers in an AZ.

Scalable. Volume sizes and types can be upgraded while in-use without downtime (except for magnetic standard).

You cannot have EBS in separate regions.


## Instance termination behavior

Termination protection is turned off by default and must be manually enabled (keeps the volume/data when the instance is terminated).

Root EBS volumes are deleted on termination by default.

Extra non-boot volumes are not deleted on termination by default.

The behavior can be changed by altering the `DeleteOnTermination` attribute.


## Use Cases

Designed for **production, mission-critical workloads**.

Useful when you need to retrieve data quickly and have data persist long-term.

Volumes are commonly used in the following scenarios:

- Operating systems: Boot/root volumes to store an operating system.
- Databases: A storage layer for databases running on Amazon EC2 that rely on transactional reads and writes.
- Enterprise applications: provides reliable block storage to run business-critical applications.
- Throughput-intensive applications: Applications that perform long, continuous reads and writes.


## EBS and EC2

If you stop or terminate an Amazon EC2 instance, all the data on the attached EBS volume remains available.

Amazon EBS volumes can only be connected with one computer at a time.

You can detach an EBS volume from one EC2 instance and attach it to another EC2 instance in the same Availability Zone, to access the data on it.

With EBS volumes, you can tell AWS to keep the root device volume on instance termination.

You can scale Amazon EBS volumes in two ways:
- Increase the volume size, as long as it doesn't increase above the maximum size limit. For EBS volumes, the maximum amount of storage you can have is 16 TB.
- Attach multiple volumes to a single Amazon EC2 instance.
