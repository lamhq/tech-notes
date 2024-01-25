# Database Migration Service (AWS DMS)

## Overview

![](https://d1.awsstatic.com/reInvent/reinvent-2022/data-migration-services/product-page-diagram_AWS-DMS_Heterogenous-Brief.e64d5fda98f36a79ab5ffcefa82b2735f94540ea.png)

The **Database Migration Service** helps you migrate databases to (and from) AWS quickly and securely.

The source database remains fully operational during the migration, minimizing downtime to applications that rely on the database.

It can migrate your data to and from most widely used commercial and open-source databases.

You have the option to perform a one-time migration or continuously replicate ongoing changes.

You can use the Schema Conversion Tool to translate database schemas into new platforms.

You can easily migrate between source and target endpoints with the same or different engine types.


## How it works

DMS is a server running replication software.

You create a source and a target connection for loading from and to.

You schedule tasks to run on DMS server to move data.

AWS DMS will create the tables and primary keys for you if they do not exist on your target. You can create your target tables beforehand if you want to do that instead.

You leverage the SCT for creating some or all of your tables, indexes, and more.

Source and target data stores are referred to as endpoints.


## Schema Conversion Tool

Schema Conversion Tool (SCT) can copy database schemas for homogenous migrations (same database) and convert schemas for heterogeneous migrations (different database).

It supports many types of relational databases, including both OLAP and OLTP, also data warehouses.

Support different targets. Converted schemas can be used for any supported Amazon RDS engine type, Amazon Aurora, or Amazon Redshift.

You can even use the converted schemas with databases running on EC2 or data stored in S3.


## Migration types

**Full Load**. All existing data is moved from sources to targets in parallel. While this is in progress,
any changes made to your tables that are being loaded are cached on your replication server.

**Full Load and Change Data Capture (CDC)**. Migrate existing data and replicate ongoing changes.

**CDC Only**. Only replicate the data changes from the source database. CDC is the only one that guarantees transactional integrity of your target database.


## Migrating Large Data Stores via AWS Snowball

You can migrate massive databases to AWS more efficiently by using Snowball devices with DMS.

Snowball devices are ideal for scenarios dealing with terabytes or petabytes of information with network throttling. 

You can leverage certain Edge devices and Amazon S3 with AWS DMS to quickly migrate large data sets.

The AWS SCT can be used to extract your data into Snowball devices and then into Amazon S3.

Once that's done, you can still use DMS to load your extracted data from Amazon S3 and migrate that data to your chosen destination like RDS.

You can still leverage CDC for capturing your changes when you're extracting data to store it in Amazon S3.

![](https://d2908q01vomqb2.cloudfront.net/e1822db470e60d090affd0956d743cb0e7cdf113/2020/03/04/Architecture-diagram-of-the-migration-workflow.png)