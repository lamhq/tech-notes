# Amazon FSx

## FSx for Windows

File storage for Windows instances. Centralized storage solution across multiple AZs.

FSx for Windows File Server integrates operations with Server Message Block (SMB), NTFS, and Microsoft Active Directory.

You can easily move your Windows-based applications that require file storage to AWS.

Use cases: SharePoint migrations, shared storage.


### FSx for Windows vs. EFS?

| FSx for Windows | EFS                     |
|-----------------------------------------|-----------------------------------------------|
| A managed Windows Server that **runs Windows Server Message Block** (SMB)-based file services.   | A managed NAS filer for EC2 instances based on Network File System (NFS) version 4. |
| Designed for Windows and Windows applications. | One of the first network file sharing protocols native to Unix and Linux.           |
| Supports Active Directory users, access control lists, groups, and security policies, along with Distributed File System (DFS) namespaces and replication. |  |


## FSx for Lustre

Lustre is an open source distributed filesystem built to give **Linux** clusters access to **high-performance filesystems** for use in compute-intensive operations.

A fully managed file system that is optimized for **compute-intensive workloads** of Linux-based applications.

Use cases:
- High-performance workloads, processing massive datasets (hundreds of gigabytes per second, millions of IOPS), low latencies (sub-millisecond)
- Machine Learning
- Media Data Processing Workflows
- Electronic Design Automation
