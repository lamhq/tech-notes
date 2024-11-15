# AWS Lake Formation

## Overview

AWS Lake Formation is a service designed to simplify the process of building, securing, and managing data lakes.


## Features

**Data ingestion and management**: It allows you to centrally manage and govern data stored in data lakes from various sources such as databases, data streams, S3.

**Security management**: it provides a RDBMS permissions model to grant or revoke access to databases, tables, columns, rows and cells in the Data Catalog.

**Data sharing**: It allows you to share data internally and externally across multiple AWS accounts, AWS organizations or IAM principals.


## Concepts

### Data lake

The data lake is your persistent data that is stored in S3 and managed by Lake Formation.

A data lake typically stores the following:
- Structured and unstructured data
- Raw data and transformed data


### Data Catalog

Lake Formation maintains a Data Catalog that contains metadata about source data.

The metadata is organized as databases and tables.

Tables store information about the underlying data, including schema information, partition information, and data location. Databases are collections of tables.

**Data Catalog resources** include databases, tables in the Data Catalog.

Tables in the Data Catalog are referred to as **metadata tables**.

You can use AWS Glue crawlers to create metadata tables or manually create.

The data that metadata tables point to (in S3 or in data sources) is referred to as **underlying data**.

Data Catalog also contains resource links, which are links to shared databases and tables in external accounts, and are used for cross-account access to data in the data lake.

Each AWS account has one Data Catalog per AWS Region.

The Lake Formation Data Catalog is the same Data Catalog used by AWS Glue.


### Data Location

When creating a metadata table, you must specify a location.

When you create a database, the location is optional. Database locations are always S3 locations.

Table locations can be S3 locations or data source locations such as an Amazon RDS database. 


### Data lake administrator

A principal is an IAM user or role or an Active Directory user.

A data lake administrator is a principal who can grant permission on Data Catalog resource or data location.

By default, you can create upto 30 data lake administrators.

Users with the `AdministratorAccess` policy do not automatically become data lake administrators. However, they can add themselves as data lake administrators and have permissions on catalog objects.


### Blueprint

A blueprint is a template that enables you to easily ingest data into a data lake.

There're blueprints for different source types, such as a relational database or AWS CloudTrail logs. 

From a blueprint, you can create a workflow.


### Workflow

A workflow is a container of Glue jobs, crawlers, and triggers.

A workflow defines the data source and schedule to import data into your data lake.

You create a workflow from a blueprint, then executes it in AWS Glue service.


## Integrations

Integrations with other AWS services.

AWS Glue:
- AWS Glue and Lake Formation share the same Data Catalog
- AWS Glue users can access only the databases and tables on which they have Lake Formation permissions.

Amazon Athena:
- Amazon Athena users can query only the databases, tables, and columns that they have Lake Formation permissions on

Amazon Redshift Spectrum:
- Amazon Redshift users can query only the tables and columns in external schema on which they have Lake Formation permissions.

Lake Formation also works with AWS KMS to enable integrated services to encrypt and decrypt data in S3.
