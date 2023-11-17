# File Storage

## Overview

In file storage, multiple clients (such as users, applications, servers, and so on) can access data that is stored in shared file folders. 

Clients access data through file paths.

File storage is ideal for use cases in which a large number of services and resources need to access the same data at the same time.


You place your files in a tree-like hierarchy that consists of folders and subfolders. 

Each file has metadata such as file name, file size, and the date the file was created. The file also has a path, when you need to retrieve a file, your system can use the path to find it in the file hierarchy.

Common use cases for file storage include:

- Large content repositories
- Development environments
- User home directories


## When to use EFS, FSx for Windows, FSx for Lustre?

You'll be given different scenarios and asked to choose whether you should use EFS, FSx for Windows, or FSx for Lustre.

- **EFS**: When you need distributed, highly resilient storage for Linux instances and Linux-based applications.
- **Amazon FSx for Windows**: When you need centralized storage for Windows-based applications, such as SharePoint, Microsoft SQL Server, Workspaces, IS Web Server, or any other native Microsoft application.
- **Amazon FSx for Lustre**: When you need high-speed, high-capacity distributed storage. This will be for applications that do high performance computing (HPC), financial modeling, etc. Remember that FS for Lustre can store data directly on S3.