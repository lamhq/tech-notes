# FSx for Windows

## Overview

File storage for Windows instances.

FSx for Windows File Server provides the compatibility and features that your Microsoft applications rely on.

Supports Windows-native file system features:
- Access Control Lists (ACLs), shadow copies, and user quotas.
- **NTFS** file systems that can be accessed from up to thousands of compute instances using the **SMB** protocol.

Works with Microsoft Active Directory (AD) to easily integrate file systems with Windows environments.

You can easily move your Windows-based applications that require file storage to AWS.

Fast performance:
- up to 2 GB/second throughput per file system
- hundreds of thousands of IOPS
- consistent sub-millisecond latencies

High availability:
- Data is replicated within an AZ.
- In Multi-AZ deployment, file systems include an active and standby file server in separate AZs, changes are synchronously replicated to standby servers.

Use cases: SharePoint migrations, shared storage.


## Pricing

You pay for only the resources used, with no upfront costs, or licensing fees.

Automatically encrypts your data at-rest and in-transit.

User quotas provide tracking, monitoring, and enforcing of storage consumption to help reduce costs.


## FSx for Windows vs. EFS

| FSx for Windows | EFS                     |
|-----------------------------------------|-----------------------------------------------|
| A managed Windows Server that **runs Windows Server Message Block** (SMB)-based file services.   | A managed NAS filer for EC2 instances based on Network File System (NFS) version 4. |
| Designed for Windows and Windows applications. | One of the first network file sharing protocols native to Unix and Linux.           |
| Supports Active Directory users, access control lists, groups, and security policies, along with Distributed File System (DFS) namespaces and replication. |  |
