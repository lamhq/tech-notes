# Creating a Glue job to transform data

## Overview

This tutorial guides you through the actions to take in the AWS Console to create a simple AWS Glue job that copy data from a data lake to another.

Assumptions:
- You're using the resources from the [data lake tutorial](./s3-data-lake.md) (to keep this tutorial short).
  - S3 bucket: `test-bucket`
  - Source database: `raw_db`
  - Tables in the source database: `customers`, `products`
- You're familiar with common Lake Formation operations like creating database, granting permissions

High-level steps:
1. Register an S3 location
2. Create a Lake Formation database
3. Set up a Glue job
4. Run the job
5. Set up Amazon Athena to query the target data lake


## Register an S3 location

The location of data stored in the target data lake

### Create an IAM role for registered location

Role name: `processed-location-role`.

Trust policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "lakeformation.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Inline policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::test-bucket/processed/*"
    },
    {
      "Action": [
        "s3:ListBucket"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::test-bucket"
    }
  ]
}
```
- `s3:GetObject`, ...: allow integrated services like Athena per to access to data stored in location of the processed database


### Register location

- Amazon S3 path: `s3://test-bucket/processed`
- IAM role: `processed-location-role`


## Create a Lake Formation database

- Name: `processed_db`
- Do not check "Use only IAM access control" option.


## Set up a Glue job

Set up a Glue job to copy data from `customers` table in `raw_db` database to a new table in `processed_db`, the table will also be create by the Glue job.

### Create an IAM role for Glue job

The Glue job need permissions to:
- Be executed by AWS Glue service (trust policy)
- Get Lake Formation credentials for reading data stored in S3 locationn of source table (inline policy)
- Select records from the source table (Metadata Access)
- Read data stored in S3 location of the source table (Location Access)
- Create data tables in target database (Metadata Access)
- Write data to the S3 bucket of target data lake (inline policy)

Role name: `glue-job-role`

Trust policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "glue.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Inline policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "lakeformation:GetDataAccess",
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
      ],
      "Resource": "arn:aws:s3:::test-bucket/processed/*"
    }
  ]
}
```
- `s3:PutObject`: allow writting to data stored in S3 location

Attached policy: `AWSGlueServiceRole`.


### Grant Location Access

Grant location access for the Glue job on S3 location of the source database:
- IAM users and roles: `glue-job-role`
- Storage locations: `s3://test-bucket/raw`

We don't grant location access on S3 location of the target database because the job is using its own IAM permission (defined in inline policy).


### Grant Metadata Access

Grant the `SELECT`, `DESCRIBE` permissions on the source table `raw_db.customers` to enable querying records from `customers` table.

Grant the `CREATE_TABLE`, `DESCRIBE` permissions on `processed_db` database.

You may need to grant `DESCRIBE` permission on the `default` database if the job fail to fetch data from the source table.

### Create Glue job

- Name: `copy-table`
- IAM role: `glue-job-role`
- Type: `Spark`
- Glue version: `4.0`
- Language: `Python 3`

Script:
```py
import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job

args = getResolvedOptions(sys.argv, ['JOB_NAME'])
sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)

# Script generated for node Source
Source_node1731658248975 = glueContext.create_dynamic_frame.from_catalog(database="raw_db", table_name="customers", transformation_ctx="Source_node1731658248975")

# Script generated for node Target
Target_node1731737568441 = glueContext.getSink(path="s3://test-bucket/lf-demo/dev/target/", connection_type="s3", updateBehavior="UPDATE_IN_DATABASE", partitionKeys=[], enableUpdateCatalog=True, transformation_ctx="Target_node1731737568441")
Target_node1731737568441.setCatalogInfo(catalogDatabase="processed_db",catalogTableName="target_customers")
Target_node1731737568441.setFormat("json")
Target_node1731737568441.writeFrame(Source_node1731658248975)
job.commit()
```


## Run the job

In job detail page, choose **Run**.

After running, it will create a table named `target_customers` in the `processed_db` database.


## Set up Amazon Athena to query the target data lake

- Open **Query editor** in Amazon Athena, in **Editor** section
- Select the Data source: `AwsDataCatalog`
- Select Database: `processed_db`
- Select table `target_customers`
- Choose `Preview Table`
- Run the created query


## Improvements

To simplify access management, you can transfer S3 permissions from the Glue job's IAM role to the Lake Formation registered location IAM role, and then grant location access to the Glue job.

This approach allows you to leverage the Lake Formation permission model to manage permissions for integrated services, and hide the complexity of internal structure of your data lake.
