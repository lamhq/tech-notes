# Amazon Redshift

## Overview

Amazon Redshift is a **managed data warehousing service** that you can use for big data analytics.

It's a very large relational database, based on PostgreSQL database engine.

Primarily used for OLAP workloads. You use SQL and BI tools to interact with it.

Helps you to understand relationships and trends across your data.

Able to collect data from many sources.

Support up to **16 PB**.

**High performance**. Can perform near real-time complex querying on massive data sets.

Storage of data is **column-based** instead of row-based. Allows for efficient parallel queries.
Make it a powerful choise for data analysis and data retrieval.

**High availability**. Supports Multi-AZ deployments. It only spans two AZs at this time. No conversions from Single-AZ to Multi-AZ (or vice versa) but you can use snapshot to restore it to a new cluster.

**Snapshots** are incremental and point-in-time. Can be restored to other regions. They can be automated or manual.
Always contained in Amazon S3 (you cannot manage the bucket).

**Fun fact**: Its name is due to AWS wanted to have people 
leave Oracle databases and leverage this AWS service instead.


## Features

### Redshift Spectrum

Allows you to efficiently **query and retrieve exabytes of unstructured data from Amazon S3** without having to load the data into Amazon Redshift tables. 

It leverages massive parallelism, allows it to run very fast against large datasets.

It uses Redshift servers that are independent of your cluster.


### Enhanced VPC Routing

All COPY and UNLOAD traffic between your cluster and your data repositories is forced through your VPC. This enhances data security and controls.

It also enables you to use VPC features like VPC Endpoints, VPC Flow Logs, etc.


## Tips

To optimize Redshift insert performance, favor large data inserts (large batch insert).