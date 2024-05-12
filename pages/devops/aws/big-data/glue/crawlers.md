# Crawlers

## Supported Data Stores

See the official documentation for a list of [available data stores](https://docs.aws.amazon.com/glue/latest/dg/crawler-data-stores.html).

Currently AWS Glue does not support crawlers for data streams.

For JDBC, MongoDB, MongoDB Atlas, and Amazon DocumentDB data stores, you must specify an AWS Glue connection. A connection is a Data Catalog object that stores connection information (credentials, URL, VPC, ...)


## How crawlers work

When a crawler runs, it takes the following actions:
- Classifies data to determine the format, schema, and associated properties of the raw data. You can creat a custom classifier.
- Groups data into tables or partitions
- Writes metadata to the Data Catalog

The crawler generates the names for the tables that it creates.

If your crawler runs more than once, it looks for new or changed files or tables in your data store. The output of the crawler includes new tables and partitions found since a previous run.


## Scheduling a crawler

You can run an AWS Glue crawler on demand or on a regular schedule.

Crawler schedules can be expressed in cron format.


## Create a crawler

Create a crawler that reads files stored on Amazon S3:

1. Open [Glue console](https://console.aws.amazon.com/glue/home)
2. On the Crawlers page, choose Create crawler
3. Set Crawler name to **Flights Data Crawler**
4. **Add a data store**, choose **Specified path in another account**. Enter `s3://crawler-public-us-east-1/flight/2016/csv` for the path
5. **Create an IAM role** named `AWSGlueServiceRole-CrawlerTutorial`
6. **Add a database** named `test-flights-db`
7. For **Prefix added to tables**, enter `flights-`
8. Choose **Finish** to create the crawler.
9. Run the crawler

Note: for smaller dataset, you can use the path `s3://crawler-public-us-east-1/flight/2016/csv/mon=1`


## Schema conversions

AWS Glue can perform convert semi-structured schemas to relational schemas.

Conceptually, you are flattening a hierarchical schema to a relational schema.

Semi-structured data can have nested data structures with no fixed schema. 

Relational data is represented by tables that consist of rows and columns. Relationships between tables can be represented by a primary key (PK) to foreign key (FK) relationship.

AWS Glue uses crawlers to infer schemas for semi-structured data. It then transforms the data to a relational schema using an ETL job. 


Example:

![](https://docs.aws.amazon.com/images/glue/latest/dg/images/HowItWorks-schemaconversion.png)

Single value `A` converts directly to a relational column.

The pair of values, `B1` and `B2`, convert to two relational columns.

Structure `C`, with children `X` and `Y`, converts to two relational columns.

Array `D[]` converts to a relational column with a foreign key (FK) that points to another relational table. Along with a primary key (PK), the second relational table has columns that contain the offset and value of the items in the array.