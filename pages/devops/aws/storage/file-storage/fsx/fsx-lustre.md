# FSx for Lustre

## Lustre

Lustre is an open source distributed filesystem built to give **Linux** clusters access to **high-performance filesystems** for use in compute-intensive operations.

A parallel file system provides high throughput for processing large amounts of data and performs operations with consistently low latencies.

It does so by storing data across multiple networked servers that thousands of compute instances can interact with concurrently.

The Lustre file system provides a POSIX-compliant file system interface.


## Overview

Amazon FSx for Lustre provides a fully managed high-performance Lustre file system optimized for fast processing of workloads.

FSx for Lustre also enables you to burst your data processing workloads from **on-premises** to AWS, by allowing you to access your FSx file system over AWS Direct Connect or VPN.


## Use cases

- High-performance workloads, processing massive datasets (hundreds of gigabytes per second, millions of IOPS), low latencies (sub-millisecond)
- Machine Learning
- Financial modeling
- Media Data Processing Workflows
- Electronic Design Automation


## Performance

Performance is based on the size of the filesystem.

Can scale up to hundreds of gigabytes per second of throughput, and millions of IOPS.

Provides high throughput for processing large amounts of data and performs operations with consistent, sub-millisecond latencies.

Supports file access to thousands of EC2 instances.


## How to use?

You can access your file system from your compute instances using the open-source Lustre client.

Once mounted, you can work with the files and directories in your file system just like you would with a local file system.

FSx for Lustre is compatible with the most popular Linux-based AMIs, including Amazon Linux, Red Hat Enterprise Linux (RHEL), CentOS, Ubuntu, and SUSE Linux.

You access your Amazon FSx file system from endpoints in your Amazon VPC, which enables you to isolate your file system in your own virtual network.


## File system deployment

Amazon FSx for Lustre provides two file system deployment options: **scratch** and **persistent**.

### Scratch file systems

Designed for temporary storage and shorter-term processing of data.

Provide high burst throughput, up to 6x the baseline throughput, 200 MBps per TiB of storage capacity.

Use when you need cost-optimized storage for short-term, processing-heavy workloads.

Data is not replicated. Lost if file servers fail.


### Persistent file systems

Designed for longer-term storage and workloads.

Highly available. Data is replicated within the same AZ in which the file system is located.

If a file server becomes unavailable, it's replaced automatically within minutes of failure.

Use for:
- longer-term storage.
- throughput-focused workloads that run for extended periods or indefinitely, and that might be sensitive to disruptions in availability.


## S3 integration

Amazon FSx works natively with Amazon S3, making it easy to access your S3 data to run data processing workloads.

Your S3 objects are presented as files in your file system, and you can write your results back to S3.

This lets you run data processing workloads on FSx for Lustre and store your long-term data on S3 or on-premises data stores.


## On-premises

You can use Amazon FSx for Lustre for on-premises workloads that need to burst to the cloud due to peak demands or capacity limits.

To move your existing on-premises data into Amazon FSx, you can mount your Amazon FSx for Lustre file system from an on-premises client over AWS Direct Connect or VPN, and then use parallel copy tools to import your data to your Amazon FSx for Lustre file system.

At any time you can write your results back to be durably stored in your data lake.


## Security

All Amazon FSx file system data is encrypted at rest.

You can configure security group rules and control network access to your Amazon FSx file systems.

Amazon FSx is integrated with AWS Identity and Access Management (IAM):
- You can control the actions your AWS IAM users and groups can take to manage your file systems (such as creating and deleting file systems).
- You can also tag your Amazon FSx resources and control the actions that your IAM users and groups can take based on those tags.


## Deployments

Can be deployed in persistent or scratch.

### Scratch

Scratch is designed for best performance for short term or temporary use cases.

Does not provide HA or replication.

Larger files systems require more servers and disks (more chance of failure).

Auto heals when hardware failure occurs.

Min size is 1.2 TiB with increments of 2.4 TiB.

### Persistent

Longer term use cases.

Provides HA in one AZ and self-healing.

50 MB/s, 100 MB/s, and 200 MB/s per TiB of storage.

Burst up to 1,300 Mb/s per TiB (uses a credit system).
