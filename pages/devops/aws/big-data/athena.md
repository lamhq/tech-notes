# Amazon Athena

## Overview

Athena is an interactive query service that makes it easy to **analyze data in S3 using SQL**.

It's the only service that allows you to directly query data in your S3 bucket (without loading it into a database).

Most results are delivered within seconds.

You pay only for the queries that you run.


## How it works?

To use Athena, you point to your data in Amazon S3, define the schema, and start querying by using standard SQL.

You don’t need complex ETL jobs to prepare your data for analysis.


## Architecture diagram

To start, unstructured data is stored in S3 and needs to be formatted for easy querying.

Glue can be used to create a catalog and structure for the data.

Redshift Spectrum can be used to query data without loading it into the Redshift database, while Athena can run queries on Glue-structured data without loading it into any database.

QuickSight can be used to visualize the data and create a dashboard for insights.

![](https://res.cloudinary.com/practicaldev/image/fetch/s--wCLvNwLP--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/rvbhx814gfeeax0c1xml.png)
