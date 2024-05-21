# Components

## Architecture

![](https://docs.aws.amazon.com/images/glue/latest/dg/images/HowItWorks-overview.png)


## Data store, data source, data target

AWS Glue can read and write data from:
- Amazon S3
- Amazon DynamoDB
- Amazon Redshift
- Amazon RDS
- Third-party JDBC-accessible databases
- MongoDB and Amazon DocumentDB (with MongoDB compatibility)
- Other marketplace connectors and Apache Spark plugins

Data can be stored onto:
- S3
- Hadoop cluster in EMR
- Redshift
- any other JDBC connection

Output files formats: JSON, CSV, ORC (Optimized Row Columnar), Apache Parquet, and Apache Avro.

A data store is a repository for persistently storing your data.

A data source is a data store that is used as input to a process or transform.

A data target is a data store that a process or transform writes to.


## Crawlers

You define a crawler, point your crawler at a data store, and the crawler creates table definitions in the Data Catalog.

Crawlers can:
- scan data in all kinds of repositories
- classify it
- extract schema information from it
- store the metadata in Data Catalog.


## Data Catalog

The AWS Glue Data Catalog contains table definitions, job definitions, and other control information to manage your AWS Glue environment.

They don't contain data from a data store.

Each AWS account has one AWS Glue Data Catalog per region.

We can use services like Athena and EMR to query our data that's in our input data sources.


## Tables

Each Data Catalog is a highly scalable collection of tables organized into databases.

A table is metadata representation of a collection of structured or semi-structured data (stored in sources such as Amazon RDS, Apache Hadoop Distributed File System, Amazon OpenSearch Service, and others).


## Jobs

The business logic that is required to perform ETL work.

It is composed of a **transformation script**, data sources, and data targets.

Job runs are initiated by triggers that can be scheduled or triggered by events, or on demand.

You can monitor job runs to understand runtime metrics such as completion status, duration, and start time.

Three types of jobs:
- A **Spark** job is run in an Apache Spark environment managed by AWS Glue. It processes data in batches.
- A **streaming ETL** job is similar to a Spark job, except that it performs ETL on data streams. It uses the Apache Spark Structured Streaming framework.
- A **Python shell** job runs Python scripts as a shell. You can use these jobs to schedule and run tasks that don't require an Apache Spark environment.


## Script

Code that extracts data from sources, transforms it, and loads it into targets.

*For example, a script might convert a CSV file into a relational form and save it in Amazon Redshift.*

The script can be either Scalar or Python code. They can be either manually written or automatically generated.
