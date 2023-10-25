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



## Amazon EFS

Amazon Elastic File System (Amazon EFS) is a scalable file system used with AWS Cloud services and on-premises resources.

As you add and remove files, Amazon EFS grows and shrinks automatically. It can scale on demand to petabytes without disrupting applications. 

## Comparison

### Amazon EBS

- Volumes attach to EC2 instances
- An Amazon EBS volume stores data in a single Availability Zone. 
- To attach an Amazon EC2 instance to an EBS volume, both the Amazon EC2 instance and the EBS volume must reside within the same Availability Zone.

### Amazon EFS

- Amazon EFS is a regional service. It stores data in and across **multiple** Availability Zones. 
- The duplicate storage enables you to access data concurrently from all the Availability Zones in the Region where a file system is located. Additionally, on-premises servers can access Amazon EFS using AWS Direct Connect.