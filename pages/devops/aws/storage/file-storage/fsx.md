# Amazon FSx

## Overview

Amazon FSx provides fully managed third-party file systems.

Amazon FSx provides you with the native compatibility of third-party file systems with feature sets for workloads, such as Windows-based storage, high-performance computing (HPC), machine learning, and electronic design automation (EDA).

Amazon FSx provides you with four file systems to choose from:

- Amazon FSx for Windows File Server for Windows-based applications
- Amazon FSx for Lustre for compute-intensive workloads.
- Amazon FSx for NetApp ONTAP.
- Amazon FSX for OpenZFS.


## When to use EFS, FSx for Windows, FSx for Lustre?

You'll be given different scenarios and asked to choose whether you should use EFS, FSx for Windows, or FSx for Lustre.

- **EFS**: When you need distributed, highly resilient storage for **Linux-based applications**.
- **Amazon FSx for Windows**: When you need centralized storage for **Windows-based applications**, such as SharePoint, Microsoft SQL Server, Workspaces, IS Web Server, or any other native Microsoft application.
- **Amazon FSx for Lustre**: When you need high-speed, high-capacity distributed storage. This will be for applications that do **high performance computing** (HPC), financial modeling, etc.