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