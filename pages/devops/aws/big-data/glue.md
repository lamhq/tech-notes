# Amazon Glue

## Overview

Glue is a serverless ETL service (it replaces EMR).

We can categorize, clean, and enrich our data from various sources and output that data into other sources.

You can specify the number of DPUs (data processing units) you want to allocate to an ETL job.

AWS Glue is based on the Apache Spark big data framework, so it can be used to query massively large data sets.


## Pricing

You pay for the time your ETL job takes to run.

You are charged an hourly rate based on the number of Data Processing Units (or DPUs) used to run your ETL job.

No upfront costs, no charged for startup or shutdown time.


## Use cases

### Query data in S3

You can use AWS Glue to crawl your S3 data lake to prepare tables that you can then query using Athena to see your data.


### Joining Data for a Data Warehouse

Example: You have clickstream data in RDS and customer data in S3.
- You can use AWS Glue to join and enrich your data and then load the results into Redshift
- Use Redshift Spectrum to query your data or use QuickSight to visualize the data.


### Creating a Centralized Data Catalog

Example: You have different types of data stored in many different locations.
- You can use AWS **Glue** to manage the metadata and create a central repository.
- You can then access the Data Catalog for ETL and analytics with many other AWS services.


## How it works

General workflow when working with AWS Glue:

### Populate Data Catalog

You can add a crawler to populate the AWS Glue Data Catalog.

You choose one or more data stores for your crawler to access. You can also create a schedule to determine the frequency of running your crawler.

For data streams, you can manually create the table definition, and define stream properties.

You can provide a custom classifier that infers the schema of your data.

You can create a connection that provides authentication and location information of data stores in the AWS Glue console.

The crawler reads your data store and creates data definitions and named tables in the AWS Glue Data Catalog. These tables are organized into a database of your choosing.

You can also populate the Data Catalog with manually created tables.


### Define a job

Define a job that describes the transformation of data from source to target.

Choose a table from the AWS Glue Data Catalog to be the source of the job. Your job uses this table definition to access your data source and interpret the format of your data.

Choose a table or location from the AWS Glue Data Catalog to be the target of the job. Your job uses this information to access your data store.

Tell AWS Glue to generate a script to transform your source to target.


### Run job to transform data

You can run your job on demand, or start it based on a one of these trigger types:

- A trigger that is based on a cron schedule.
- A trigger that is event-based;
- A trigger that starts a job on demand.


### Monitor your crawlers and jobs

Use the AWS Glue console to view the following:

- Job run details and errors.
- Crawler run details and errors.
- Any notifications about AWS Glue activities


## Auditing

The Data Catalog, along with CloudTrail and Lake Formation, provides comprehensive audit and governance capabilities, with schema change tracking and data access controls.

This helps ensure that data is not inappropriately modified or inadvertently shared.


## Streaming

AWS Glue enables you to perform ETL operations on streaming data using continuously-running jobs.

AWS Glue streaming ETL can ingest streams from:
- Amazon Kinesis Data Streams
- Apache Kafka
- Amazon Managed Streaming for Apache Kafka (Amazon MSK)

Streaming ETL can clean and transform streaming data and load it into Amazon S3 or JDBC data stores.

Streaming ETL is built on the Apache Spark Structured Streaming engine.

Use cases: process event data like IoT streams, clickstreams, and network logs.

Streaming ETL job can automatically determines the schema from the incoming data.


## Runtime environments

### AWS Glue for Spark
- **Purpose**: AWS Glue on Apache Spark (AWS Glue ETL) allows you to handle data at scale using **PySpark**. It's a powerful solution, but transitioning from Python-focused backgrounds to Spark can be unintuitive. The Spark DataFrame model isn't seamlessly "Pythonic" due to its Scala and Java roots.
- **Python Shell Jobs**: In AWS Glue, you can use **Python shell jobs** to run native Python data integrations. These jobs execute on a single Amazon EC2 instance, limiting throughput for big data processing.
- **Cost Consideration**: Maintaining EC2 instances for large-scale data processing can be expensive.
- **Strengths**: Familiarity with Spark and its capabilities.
- **Limitations**: Not as Python-friendly as desired.

### AWS Glue for Ray
- **Purpose**: AWS Glue for Ray leverages the open-source **Ray framework** to scale Python workloads without extensive Spark learning.
- **Ray**: Ray is a distributed computation framework focused on Python.
- **Advantages**:
  - **Parallel Computations**: Run Python scripts across multiple machines in parallel.
  - **Familiar Libraries**: Use familiar Python libraries like **pandas** for easy workflows.
  - **Big Data at Scale**: Process big data with just a few lines of code.
- **Job Types**:
  - **Ray Jobs**: Scheduled or event-triggered Python scripts. Log information and monitoring stats are stored in CloudWatch.
  - **Interactive Sessions**: Sequential code snippets on the same provisioned resources.
- **Visual Jobs in AWS Glue Studio**: Not yet supported for Ray