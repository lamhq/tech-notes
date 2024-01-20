# EBS Volumes

## Overview

Volumes are simply virtual hard disks. You need a minimum of 1 volume per EC2 instance.

You use EBS voulumes the same way you would you any system disk:
- create a file
- store data
- install application
- run an operating system
- run a database

EBS volumes must be in the same AZ as the instances they are attached to.

You can use block device mapping to specify additional EBS volumes to attach to an instance when it’s launched.

You cannot decrease an EBS volume size.

You can have up to 5,000 EBS volumes by default.


## Root device volume

Each instance that you launch has an associated root device volume, either an Amazon EBS volume or an instance store volume.

The root device is created under `/dev/sda1` or `/dev/xvda`.


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


### HDD, Throughput Optimized (st1)

- Frequently accessed, **throughput intensive** workloads with large datasets and large I/O sizes, such as MapReduce, Kafka, log processing, data warehouse, and ETL workloads.
- Throughput measured in MiB/s and includes the ability to burst up to 250 MiB/s per TB, with a baseline throughput of 40 MB/s per TB and a maximum throughput of 500 MiB/s per volume.
- Cannot be a boot volume.
- EBS multi-attach not supported.


### HDD, Cold – (sc1)

- Lowest cost storage – cannot be a boot volume.
- Less frequently accessed workloads with large, cold datasets.
- Can burst up to 80 MiB/s per TiB, with a baseline throughput of 12 MiB/s (less than 3000 IOPS).
- Cannot be a boot volume.
- EBS multi-attach not supported.
