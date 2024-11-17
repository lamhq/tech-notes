# Permissions

**IMPORTANT**: This guide is written for Lake Formation permission mode only (not for IAM or Hybrid access mode).

## Overview

Lake Formation uses a combination of IAM permissions and Lake Formation-specific permissions to control data access.

To successfully access data or metadata, a principal must have both IAM and Lake Formation permissions.

Lake Formation permissions are managed using `GRANT` and `REVOKE` commands. They are granted at the database or table level and control access to specific data resources.

There are two main types of Lake Formation permissions:
- **Metadata Access Permissions**: access to Data Catalog resources
- **Underlying Data Access Permissions**: ability to assume IAM roles associated with registered data locations


## Create database permissions

Database creation is controlled at the account-level using the Lake Formation settings.

You can grant Database creation permission in the Lake Formation console at **Administrative roles and tasks** section.


## Implicit permissions

Data lake administrators:
- `DESCRIBE`: have `DESCRIBE` permission to all resources, except for resources shared from another account
- `DATA_LOCATION_ACCESS`: Data locationhave access on all data locations
- **Grant/Revoke Access**: can grant or revoke access to any resources to any principal, including themselves
- `CREATE_DATABASE`: Can create databases
- Can grant the permission to create a database
- *Can register Amazon S3 locations only if they have IAM permissions to do so*
- *Do not have implicit permissions to drop databases or alter/drop tables created by others*

Database creators:
- get all database permissions on the databases/tables that they create
- can grant principals in the same AWS account permission to create tables

Table creators:
- get all permissions on the tables that they create.


## Grantable permissions

Grantable permissions is the ability to pass that permission to another principal.


## Tag-based access control

Lake Formation tag-based access control (LF-TBAC) is a feature that allows users to group resources into user-defined categories of LF-Tags and apply permissions on those resource groups. 

Each LF-Tag is a key-value pair, such as `department=sales`. A principal that has LF-Tags that match the LF-Tags on a Data Catalog resource can access that resource. 


## IAMAllowedPrincipal group

The `IAMAllowedPrincipal` is a virtual IAM group within AWS Lake Formation.

It includes all IAM principals who have access to Data Catalog resources (through IAM policies or AWS Glue resource policies).

If this permissions exists on a database or table, all principals will be granted access to the database or table.

If **Use only IAM access control** is enabled, the group has `Super` permission on all existing Data Catalog resources, and on new Data Catalog resources by default.


## Upgrading to the Lake Formation permission model

*Upgrading from AWS Glue data permissions to the AWS Lake Formation model.*

By default, AWS Glue model grants data access via Identity based and resource based IAM policies.

Lake Formation uses Data filtering and cell-level security to restrict table access at the column, row, and cell-level

You can use the Lake Formation permissions model to manage your existing AWS Glue Data Catalog objects and data locations in S3.

To start using Lake Formation permissions with your existing Glue Data Catalog resources, follow these [steps](https://docs.aws.amazon.com/lake-formation/latest/dg/upgrade-glue-lake-formation.html#upgrade-glue-lake-formation-step1).


## Hybrid access mode

To ease the transition of data lake permissions from an IAM and Amazon S3 model to Lake Formation permissions, it is recommended to use hybrid access mode for Data Catalog.

Hybrid access mode lets you use both Lake Formation permissions and IAM policies to secure and access cataloged data.

It allows data administrators to onboard Lake Formation permissions selectively and incrementally, focusing on one data lake use case at a time.


## Suggested policies

For suggested policies for Lake Formation personas, see [Lake Formation personas and IAM permissions reference](https://docs.aws.amazon.com/lake-formation/latest/dg/permissions-reference.html).
