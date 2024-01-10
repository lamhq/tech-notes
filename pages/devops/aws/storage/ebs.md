# Amazon Elastic Block Store (Amazon EBS)

## Overview

Amazon EBS is a service that provides **block-level storage** volumes you can attach to your EC2 instances.

EBS is highly available. Automatically replicated within a single AZ to protect against hardware failures.

EBS is scalable. You can **resize** and **change the volume type** on the fly with no downtime or performance impact.

You cannot have EBS in separate regions.


## Use Cases

Designed for **production, mission-critical workloads**.

Useful when you need to retrieve data quickly and have data persist long-term.

Volumes are commonly used in the following scenarios:

- Operating systems: Boot/root volumes to store an operating system.
- Databases: A storage layer for databases running on Amazon EC2 that rely on transactional reads and writes.
- Enterprise applications: provides reliable block storage to run business-critical applications.
- Throughput-intensive applications: Applications that perform long, continuous reads and writes.


## Volumes

Volumes are simply virtual hard disks. You need a minimum of 1 volume per EC2 instance.

Volumes always are in the same AZ as EC2.

You use them the same way you would you any system disk:
- create a file
- store data
- install application
- run an operating system
- run a database


## Snapshots

- A snapshots is a point-in-time copy of a volume
- Snapshots exist on S3
- Snapshots are incremental. Only the data that has been changed since your last snapshot are moved to S3. This saves space and time to take a snapshot.

For a consistent snapshot, it's recommended to stop the instance before taking.

If you take a snapshot of an encrypted EBS volume, the snapshot will be encrypted automatically.

You can share snapshots, but only in the region in which they were created. To share to other regions, you will need to copy them to the destination region first.


## Volume Types

There are two main categories of Amazon EBS volumes: solid-state drives (**SSDs**) and hard-disk drives (**HDDs**):
- SSDs for **random input/output**, **IOPS**.
- HDDs for **sequential** I/O.


### SSD, General Purpose (gp2, gp3)

- Volume size from 1 GiB to 16 TiB.
- Up to 16,000 IOPS per volume.
- Performance:
  - 3 IOPS/GiB for gp2.
  - Up to 500 IOPS/GiB for gp3.
- Can be a boot volume.
- EBS multi-attach not supported.
- Use cases:
  - Low-latency interactive apps.
  - Development and test environments (not latency sensitive).


### SSD, Provisioned IOPS (io1/io2)

- More than 16,000 IOPS.
- Up to 64,000 IOPS per volume (Nitro instances).
- Up to 32,000 IOPS per volume for other instance types.
- Performance:
  - Up to 50 IOPS/GiB for io1.
  - Up to 500 IOPS/Gib for io2.
- Can be a boot volume.
- EBS multi-attach is supported.
- Use cases:
  - Workloads that require sustained IOPS performance or more than 16,000 IOPS.
  - I/O-intensive database workloads.


### HDD, Throughput Optimized (st1):

- Frequently accessed, **throughput intensive** workloads with large datasets and large I/O sizes, such as MapReduce, Kafka, log processing, data warehouse, and ETL workloads.
- Throughput measured in MiB/s and includes the ability to burst up to 250 MiB/s per TB, with a baseline throughput of 40 MB/s per TB and a maximum throughput of 500 MiB/s per volume.
- Cannot be a boot volume.
- EBS multi-attach not supported.


### HDD, Cold – (sc1):

- Lowest cost storage – cannot be a boot volume.
- Less frequently accessed workloads with large, cold datasets.
- Can burst up to 80 MiB/s per TiB, with a baseline throughput of 12 MiB/s.
- Cannot be a boot volume.
- EBS multi-attach not supported.


## Encryption

You can encrypt your EBS Volumes with a data key (AES-256 standard) and you can either manage the key yourself (CMK)
or you can have Amazon manage (AWS KMS) it for you.

Encryption has a minimal impact on larency. You won't get any performance degradation.

You can encrypt root device volume upon creation.

You can allow encryption when copying an unencrypted snapshot.

When you encrypt an EBS volume:
- data inside the volume is encrypted
- data moving between instance and volume is encrypted
- snapshots are encrypted
- volumes created from snapshots are encrypted

To encrypt an volume:
- create a snapshot of unencrypted volume
- copy the snapshot with encryption enabled
- create an AMI from the encrypted snapshot
- use that AMI to launch new instances

You can **unencrypt a volume** by copying it to a unencrypted volume using a temporary EC2 instance. You can then attach the unencrypted volume to your original instance.


## EBS and EC2

If you stop or terminate an Amazon EC2 instance, all the data on the attached EBS volume remains available.

Amazon EBS volumes can only be connected with one computer at a time.

You can detach an EBS volume from one EC2 instance and attach it to another EC2 instance in the same Availability Zone, to access the data on it.

With EBS volumes, you can tell AWS to keep the root device volume on instance termination.

You can scale Amazon EBS volumes in two ways:
- Increase the volume size, as long as it doesn't increase above the maximum size limit. For EBS volumes, the maximum amount of storage you can have is 16 TB.
- Attach multiple volumes to a single Amazon EC2 instance.
