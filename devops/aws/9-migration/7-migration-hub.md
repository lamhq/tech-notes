# AWS Migration Hub

## Overview

AWS Migration Hub gives you a single place to track the progress of your application migration to AWS.

It integrates with Server Migration Service (SMS) and Database Migration Service (DMS).


## Server Migration Service

![](https://d2908q01vomqb2.cloudfront.net/77de68daecd823babbb58edb1c8e14d7106e83bb/2017/03/13/AWS_SMS_1.png)

**SMS** is a service that allows you to schedule when you'd like copies of your underlying vSphere Volume to be taken. It brings that data into S3, converts it into an EBS snapshot, and then creates an AMI from that.

This allows you to take your VMware architecture and convert it to be an AMI without having to throw everything out the window and build it new inside of AWS.


## Database Migration Service

![](https://d1.awsstatic.com/reInvent/reinvent-2022/data-migration-services/product-page-diagram_AWS-DMS_Heterogenous-Brief.e64d5fda98f36a79ab5ffcefa82b2735f94540ea.png)

The **Database Migration Service** is a managed service offered by AWS that helps you securely migrate and replicate your database and analytics workloads to AWS with minimal downtime and zero data loss. It can do the following:

1. It can pick up an existing Oracle database and run it through the **Schema Conversion Tool** to convert it to an Amazon Aurora database.
2. It can take an existing on-prem or standard RDS or EC2 architecture and move it into AWS¹. You can use the DMS service to consolidate multiple databases into 1 single piece of architecture.


## Tips

You'll be given scenarios that ask you to pick a solution for application migration.

When these come up, DMS is going to be used to move databases.
SMS will be the tool of choice for moving servers. Migration Hub will give you the overview you need.