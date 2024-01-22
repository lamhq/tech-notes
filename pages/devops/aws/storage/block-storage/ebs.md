# Amazon Elastic Block Store (Amazon EBS)

## Overview

Amazon EBS is a service that provides **block-level storage** volumes you can attach to your EC2 instances.

Highly available. EBS volume data is replicated across multiple servers in an AZ.

Scalable. Volume sizes and types can be upgraded while in-use without downtime (except for magnetic standard).

You cannot have EBS in separate regions.


## Use Cases

Designed for **production, mission-critical workloads**.

Useful when you need to retrieve data quickly and have data persist long-term.

Volumes are commonly used in the following scenarios:
- Operating systems: Boot/root volumes to store an operating system.
- Databases: A storage layer for databases running on Amazon EC2 that rely on transactional reads and writes.
- Enterprise applications: provides reliable block storage to run business-critical applications.
- Throughput-intensive applications: Applications that perform long, continuous reads and writes.


## Deployment and Provisioning

Termination protection is turned off by default and must be manually enabled (keeps the volume/data when the instance is terminated).

Root EBS volumes are deleted on termination by default.

Extra non-boot volumes are not deleted on termination by default.

The behavior can be changed by altering the `DeleteOnTermination` attribute.

Elastic Volumes allow you to increase volume size, adjust performance, or change the volume type while the volume is in use.

To migrate volumes between AZ’s create a snapshot then create a volume in another AZ from the snapshot (possible to change size and type).


## Copying, Sharing and Encryption Methods

The following diagram aims to articulate the various possible options for copying EBS volumes, sharing AMIs and snapshots and applying encryption:

![](https://digitalcloud.training/wp-content/uploads/2022/01/ebs-copying-sharing-and-encryption.jpeg)


## Amazon Data Lifecycle Manager (DLM)

Automates the creation, retention, and deletion of EBS snapshots and EBS-backed AMIs.
- Protect valuable data by enforcing a regular backup schedule.
- Create standardized AMIs that can be refreshed at regular intervals.
- Retain backups as required by auditors or internal compliance.
- Reduce storage costs by deleting outdated backups.
- Create disaster recovery backup policies that back up data to isolated accounts.


## EBS Limits (per region)

| Name | Default Limit |
|---|---|
| Provisioned IOPS | 300,000 |
| Provisioned IOPS (SSD) volume storage (TiB) | 300 |
| General Purpose (SSD) volume storage (TiB) | 300 |
| Magnetic volume storage (TiB) | 300 |
| Max Cold HDD (sc1) Storage in (TiB) | 300 |
| Max Throughput Optimized HDD (st1) Storage (TiB) | 300 |


## EBS and EC2

If you stop or terminate an Amazon EC2 instance, all the data on the attached EBS volume remains available.

Amazon EBS volumes can only be connected with one computer at a time.

You can detach an EBS volume from one EC2 instance and attach it to another EC2 instance in the same Availability Zone, to access the data on it.

With EBS volumes, you can tell AWS to keep the root device volume on instance termination.

You can scale Amazon EBS volumes in two ways:
- Increase the volume size, as long as it doesn't increase above the maximum size limit. For EBS volumes, the maximum amount of storage you can have is 16 TB.
- Attach multiple volumes to a single Amazon EC2 instance.
