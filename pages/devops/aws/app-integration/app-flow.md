# Amazon AppFlow

## Overview

Amazon AppFlow is a fully managed integration service for **exchanging data between SaaS apps and AWS services**.

It allows you to pull data records from third-party SaaS vendors and store them in AWS services.

It's a bi-directional service, data transfer can go both ways, with limited combinations.

![](https://d2908q01vomqb2.cloudfront.net/b6692ea5df920cad691c20319a6fffd7a4a766b8/2021/07/20/bdb-1449-image001.png)


## Concepts

- **Flow**: a flow is what transfers data between sources and destinations. A variety of Saas applications are supported.
- **Data Mapping**: Determines how your source data is stored within your destinations
- **Filters**: Criteria to control which data is transferred from a source to a destination
- **Trigger**: How the flow is started. Supported types: Run on demand, Run on event, Run on schedule


## Use Cases

- Transferring Salesforce records to Amazon Redshift
- Ingesting and analyzing Slack conversations in S3
- Migrating Zendesk and other help desk support tickets to Snowflake
- Transferring aggregate data on a scheduled basis to S3