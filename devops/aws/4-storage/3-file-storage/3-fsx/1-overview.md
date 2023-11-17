# Amazon FSx

## FSx for Windows

Amazon FSx for Windows File Server provides a fully managed native Microsoft
Windows file system so you can easily move your Windows-based applications that require file storage to AWS.

Amazon FSx is bult on Windows server.

For scenarios about SharePoint migrations, shared storage, think of FSx for Windows.

### How is FSx for Windows different from EFS?

| FSx for Windows | EFS                     |
|-----------------------------------------|-----------------------------------------------|
| A managed Windows Server that **runs Windows Server Message Block** (SMB)-based file services.   | A managed NAS filer for EC2 instances based on Network File System (NFS) version 4. |
| Designed for Windows and Windows applications. | One of the first network file sharing protocols native to Unix and Linux.           |
| Supports Active Directory users, access control lists, groups, and security policies, along with Distributed File System (DFS) namespaces and replication. |                                                                                     |


## Amazon FSx for Lustre

A fully managed file system that is optimized for compute-intensive workloads

- High Performance Computing
- Machine Learning
- Media Data Processing Workflows
- Electronic Design Automation

With Amazon FSx, you can launch and run a Lustre file system that 
can process massive datasets at up to hundreds of gigabytes per second of throughput, 
millions of IOPS, and sub-millisecond latencies.

When it's about processing massive datasets,
hundreds of gigabytes per second of throughput,
millions of IOPS and sub-millisecond latencies,
think of Amazon FSx for Lustre.
It gives you amazing performance capabilities.