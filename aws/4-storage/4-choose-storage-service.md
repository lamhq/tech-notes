# Choose the Right Storage Service

When choosing the right storage option for your use case, keep in mind pricing models, durability and availability characteristics, and the three categories of storage. 

## Amazon EC2 Instance Store

Instance store is ephemeral block storage.

This is preconfigured storage that exists on the same physical server that hosts the EC2 instance and cannot be detached from Amazon EC2.

Instance store is generally well-suited for temporary storage of information that is constantly changing, such as buffers, caches, and scratch data.

## Amazon EBS

Amazon EBS is meant for data that changes frequently and needs to persist through instance stops, terminations, or hardware failures. 

Amazon EBS has two different types of volumes: SSD-backed volumes and HDD-backed volumes.

SSD-backed volumes have the following characteristics. 

- Performance depends on IOPS (input/output operations per second).
- Ideal for transactional workloads such as databases and boot volumes.

HDD-backed volumes have the following characteristics: 

- Performance depends on MB/s.
- Ideal for throughput-intensive workloads, such as big data, data warehouses, log processing, and sequential data I/O.

Amazon EBS is block storage.

You pay for what you provision (you have to provision storage in advance).

EBS volumes are replicated across multiple servers in a single Availability Zone.

Most EBS volumes can only be attached to a single EC2 instance at a time.


## Amazon S3

If your data doesn’t change that often, Amazon S3 might be a more cost-effective and scalable storage solution.

S3 is ideal for storing static web content and media, backups and archiving, data for analytics, and can even be used to host entire static websites with custom domain names.

It is object storage.

You pay for what you use (you don’t have to provision storage in advance).

Amazon S3 replicates your objects across multiple Availability Zones in a Region.

Amazon S3 is not storage attached to compute.


## Amazon Elastic File System (Amazon EFS) and Amazon FSx

For file storage that can mount on to multiple EC2 instances, you can use Amazon Elastic File System (Amazon EFS) or Amazon FSx.

| Service | Characteristic | More Information |
|---|---|---|
| Amazon Elastic File System (EFS) | Fully managed NFS file system. | EFS FAQs |
| Amazon FSx for Windows File Server | Fully managed file server built on Windows Server that supports the SMB protocol. | FSx for Windows File Server FAQs |
| Amazon FSx for Lustre | Fully managed Lustre file system that integrates with S3. | FSx for Lustre FAQs |

Here are a few important features of Amazon EFS and FSx to know about when comparing them to other services:

- It is file storage.
- You pay for what you use (you don’t have to provision storage in advance).
- Amazon EFS and Amazon FSx can be mounted onto multiple EC2 instances.