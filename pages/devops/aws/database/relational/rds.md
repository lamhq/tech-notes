# Amazon Relational Database Service

## Overview

Amazon Relational Database Service (Amazon RDS) is a managed service that you can use to launch and manage relational databases on AWS

It is best suited to structured, relational data store requirements, OLTP workloads.

RDS is a managed service and you do not have access to the underlying EC2 instance (no root access).

*The exception to the above rule is Amazon RDS Custom which allows access to the underlying operating system. This is new, available for limited DB engines, and does not appear on the exam yet.*

The Amazon RDS managed service includes the following:

- Security and patching of the DB instances.
- Automated backup for the DB instances.
- Software updates for the DB engine.
- Easy scaling for storage and compute.
- Multi-AZ option with synchronous replication.
- Automatic failover for Multi-AZ option.
- Read replicas option for read heavy workloads.


## Database engines

Amazon RDS supports the following database engines:

- Commercial: Oracle, Microsoft SQL Server
- Open Source: MySQL, PostgreSQL, MariaDB
- Cloud Native: Amazon Aurora

Each database instance runs only one database engine.


## Amazon RDS Proxy

RDS Proxy establishes a database **connection pool** and reuses connections in this pool without the memory and CPU overhead of opening a new database connection each time.

RDS Proxy can handle database **failover**, allowing applications to remain connected to the proxy endpoint for the duration of the failover.

Amazon RDS Proxy allows you to use **AWS IAM** to connect to a secured database without providing an encrypted connection string that contains authentication credentials. Amazon RDS Proxy supplies the connection string and securely store credentials in AWS Secrets Manager.

You can control the number of database connections that are created to protect the database against **over subscription**.
