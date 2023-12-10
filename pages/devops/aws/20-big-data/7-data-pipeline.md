# AWS Data Pipeline

## Overview

AWS Data Pipeline is a managed ETL service for automating movement and transformation of your data.

It's a web service that allows you to define **data-driven workflows** and then automate those.

You create steps that are dependent on previous tasks completing successfully. Within it, you define parameters for data transformations.

The service is **highly available**. AWS hosts the infrastructure on highly available and distributed infrastructure. Also **fault tolerant**.

It automatically retries failed activities.

You can configure notifications via **Amazon SNS** for failures or even successful tasks.

It works with many Amazon storage services: DynamoDB, RDS, Redshift, S3, ...

Works closely with EC2 and EMR for compute needs.


## Components

- Pipeline Definition: Specify the business logic of your data management needs.
- Managed Compute: The service will create EC2 instances to perform your activities - or leverage existing EC2. Activities are pipeline components that define the work to perform.
- Task Runners: Task runners (EC2 instances) will poll for different tasks and perform them when found.
- Data Nodes: Define the locations and types of data that will be input and output.


## Use cases

- Processing data in EMR using Hadoop streaming
- Importing or exporting DynamoDB data
- Copying CV files or data between S3 buckets
- Exporting RDS data to S3
- Copying data to Redshift


## Example diagram

We export MySQL data to Amazon S3 for report generation using a data pipeline with resources such as EC2, RDS, Amazon S3, and EMR.

We set up our task runners to authenticate into our database. We then export our data from RDS into Amazon S3 using those task runners.

After our data is exported to Amazon S3, we can then leverage that to generate reports
in our Amazon EMR service.

![](./images/data-pl-arch.png)