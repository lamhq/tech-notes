# AWS Data Pipeline

## Overview

AWS Data Pipeline is a managed ETL service for **implementing automated workflow for movement and transformation of data**.

Perfect for data-driven and task-dependent ETL workloads.

**Highly available**, **fault tolerant**. Automatically retries failed activities.

You can configure notifications via **Amazon SNS** for failures or even successful tasks.

Integrates with storage services (e.g., DynamoDB, RDS, Redshift, S3) and compute services (e.g., EC2 and EMR).

To use data pipeline, you create steps that are dependent on previous tasks completing successfully. Within it, you define parameters for data transformations.


## Use cases

- Processing data in EMR using Hadoop streaming
- Importing or exporting DynamoDB data
- Copying CV files or data between S3 buckets
- Exporting RDS data to S3
- Copying data to Redshift


## Components

**Pipeline Definition**: Specify the business logic of your data management needs.

**Managed Compute**: The service will create EC2 instances to perform your activities - or leverage existing EC2. Activities are pipeline components that define the work to perform.

**Task Runners**: Task runners (EC2 instances) will poll for different tasks and perform them when found.

**Data Nodes**: Define the locations and types of data that will be input and output.


## Example diagram

We set up task runners that run on EC2 instances.

Our task runners authenticate into the MySQL database, export the data to Amazon S3.

After our data is exported to Amazon S3, we can then leverage that to generate reports in our Amazon EMR service.

![](./data-pipeline/data-pl.drawio.svg)