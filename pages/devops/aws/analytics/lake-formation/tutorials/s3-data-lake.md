# Creating a data lake from an S3 data source

## Overview

This tutorial guides you through the actions to take in the AWS Console to create a data lake and load data from an S3 data source.

Assumptions:
- Lake Formation permission model is being used (no hybrid access)
- S3 bucket for data lake is not encrypted

High-level steps:
1. Create an S3 bucket for storing data of the data lake
2. Upload your data files to the S3 bucket
3. Register an S3 location to Lake Formation
4. Create a Lake Formation database
5. Set up a crawler to scan the S3 bucket
6. Run the crawler to create a table
7. Set up Amazon Athena to query the created table


## Create an S3 bucket

This bucket will contain all the data of your data lake.

Bucket name: `test-bucket`.


## Upload data file

Upload your data files to S3 bucket.

The files will contain all records of a table in your database.

Example files to use:
- [customers.csv](https://aws-dojo.com/ws3/customers.csv)
- [products](https://static.godatafeed.com/content/example-files/MyDataFeeds-Products.csv)

S3 URI after uploaded: `s3://test-bucket/raw/customers/customers.csv`.


## Register an S3 location

Each data catalog table will store data in S3. Lake Formation needs to know where the data is stored to query and write data. These locations need to be registered with Lake Formation.


### Create an IAM role for registered location

While accessing data in S3, Lake Formation needs IAM permissions to read and write to registered S3 locations.

For each registered location, we need to associate it with an IAM role that has permissions to access the S3 location (read or write).

Role name: `raw-location-role`.

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
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::test-bucket/raw/*"
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
- `s3:GetObject`: principals (Glue crawler) need to read all data files in an S3 path to build the metadata for data catalog table
- `arn:aws:s3:::test-bucket`: the action `s3:ListBucket` need to be granted to the whole bucket


### Register location

In Lake Formation console, at **Data lake locations** section, click on **Register location**:
- Amazon S3 path: `s3://test-bucket/raw`
- IAM role: `raw-location-role`


## Create a Lake Formation database

- Name: `raw_db`
- Do not check "Use only IAM access control" option.


## Set up a crawler

The crawler will scan all the files stored in its S3 paths to gather information about the data. It then creates data catalog tables for each S3 path.

The actual data for catalog tables is stored in the files uploaded to S3. The crawler doesn't insert any data into the tables. Also, the data is append-only because the data file is in CSV format.


### Create an IAM role for the crawler

The crawler need permissions to:
- Be executed by AWS Glue service (trust policy)
- Get Lake Formation credentials for crawling the data source (inline policy)
- Read data stored in S3 location (Location Access)
- Create table in database (Metadata Access)

Role name: `customer-crawler-role`

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
      "Action": [
        "lakeformation:GetDataAccess",
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
```
- `lakeformation:GetDataAccess`: Allow the crawler to use Lake Formation credentials for crawling the data source (S3).


Attached policy: `AWSGlueServiceRole`.

For more details, see:
- [Crawler prerequisites](https://docs.aws.amazon.com/glue/latest/dg/crawler-prereqs.html)
- [Create an IAM role for AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/create-an-iam-role.html)


### Grant Location Access

In the Lake Formation console, at **Data locations** section, choose **Grant**:
- IAM users and roles: `customer-crawler-role`
- Storage locations: `s3://test-bucket/raw` (the location must match with the registered location)


### Grant Metadata Access

In the Lake Formation console, at **Data lake permissions** section, choose **Grant**:
- IAM users and roles: `customer-crawler-role`
- In **Choose a method to grant permissions**, choose **Named Data Catalog resources**
- Databases: `raw_db`
- Database permissions: `Create table`


### Create crawler

- Name: `customer-crawler`
- Data sources:
  - S3 path: `s3://test-bucket/raw/customers`
- Role name: `customer-crawler-role`
- Target database: `raw_db`
- Lake Formation configuration: select **Use Lake Formation credentials for crawling S3 data source**


## Run the crawler

In crawler detail page, choose **Run**.

After running, it will create a data catalog table in the provided database.

The table name is the final part of the S3 path. In this case, `customers`.


## Query data

Query the created table to ensure the data is ingested successfully.

### Grant Select permission to data lake administrator

Your data lake administrator may not have permissions to query the data catalog table. To fix this, in the Lake Formation console, at **Data lake permissions** section, choose **Grant**:
- IAM users and roles: your data lake administrator role
- In **Choose a method to grant permissions**, choose **Named Data Catalog resources**
- Databases: `raw_db`
- Tables: `customers`
- Table permissions: `Select`


### Set up Athena

1. Open **Query editor** in Amazon Athena, in **Settings** section, choose **Manage**
2. Enter the **Location of query resul**: `s3://test-bucket/athena-output/`


### Query data catalog table
- Back to **Editor** section
- Select the Data source: `AwsDataCatalog`
- Select Database: `raw_db`
- Select table `customers`
- Choose `Preview Table`
- Run the created query