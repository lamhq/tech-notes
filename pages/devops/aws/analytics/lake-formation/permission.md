# Permissions

**IMPORTANT**: This guide is written for Lake Formation permission mode only (not for IAM or Hybrid access mode).

## Overview

Lake Formation uses a combination of IAM permissions and Lake Formation-specific permissions to control data access.

To successfully access data or metadata, a principal must have both IAM and Lake Formation permissions.

Lake Formation permissions are managed using `GRANT` and `REVOKE` commands. They are granted at the database or table level and control access to specific data resources.

There are two main types of Lake Formation permissions:
- Metadata Access Permissions
- Underlying Data Access Permissions


### Metadata access permissions

These permissions control access to the metadata stored in the Data Catalog, not the underlying data itself.

They include:
- `Create table`: Allows creating new tables within a database.
- `Alter`: Allows modifying metadata of existing databases and tables.
- `Drop`: Allows deleting metadata objects, such as tables or databases
- `Describe`: Allows viewing metadata details, such as table schemas and database properties.
- `Super`: Grants all available permissions on the metadata resource

To grant metadata access permissions in the Lake Formation console:
1. Go to **Data lake permissions** section, choose **Grant**
2. Choose the principals to grant permissions
3. Choose a method to grant permissions: LF-Tags or catalog resources
4. After that, choose the permissions to grant. Note that the permissions in the **Database permissions** and **Table permissions** sections are different.

To access and manipulate the actual data, you need **Data Access Permissions** (see below).


### Underlying Data Access Permissions

These permissions control access to the actual data stored in S3 locations.

They include data access permissions and data location permissions.

Data access permissions:
- grants permissions to read/write data directly to tables stored in S3 locations
- include: `SELECT`, `INSERT`, and `DELETE` permissions
- you can grant Data access permissions in the Lake Formation console at **Data lake permissions** section

Data location permissions:
- grants permissions to read/write data files stored in S3 locations.
- include `DATA_LOCATION_ACCESS` permissions
- you can grant Data location permissions in the Lake Formation console at **Data locations** section
- when granted permission on a location, a principal can assume the associated IAM role to read/write data on that location.
- to grant data location access, you must first register that location with Lake Formation


## Register S3 locations

To enable Lake Formation to control access to underlying data at an S3 location, you must register that location with Lake Formation.

You can register data locations in the Lake Formation console at **Data lake locations** section.

When you register a location, you specify an IAM role that grants read/write permissions on that location. Lake Formation assumes that role when supplying temporary credentials to integrated AWS services.

> Lake Formation provides data access rather than using the users permissions.

You can specify either the Lake Formation service-linked role or create your own role.

When adding/removing a data location, Lake Formation service-linked role is automatically updated with read/write permissions on that location. You can't directly modify that role.

You use a custom role when:
- You plan to publish metrics in Amazon CloudWatch Logs.
- The Amazon S3 location exists in a different account.
- The Amazon S3 location contains data encrypted with an AWS managed key.
- You plan to access the Amazon S3 location using Amazon EMR.

A typical role might have the following policy attached:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::{BUCKET_NAME}/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::{BUCKET_NAME}"
      ]
    }
  ]
}
```


## Implicit permissions

Data lake administrators have implicit permissions:
- `Describe` all resources in the Data Catalog
- `Create` databases and tables in all locations
- have access on all data locations
- `Grant` and `Revoke` permissions on any resource.

Database creators get all database permissions on the databases that they create.

Table creators get all permissions on the tables that they create.


## Grantable permissions

Grantable permissions is the ability to pass that permission to another principal.


## Tag-based access control

Lake Formation tag-based access control (LF-TBAC) is a feature that allows users to group resources into user-defined categories of LF-Tags and apply permissions on those resource groups. 

Each LF-Tag is a key-value pair, such as `department=sales`. A principal that has LF-Tags that match the LF-Tags on a Data Catalog resource can access that resource. 


## IAMAllowedPrincipal group

The `IAMAllowedPrincipal` is a virtual IAM group within AWS Lake Formation.

It includes all IAM principals who have access to Data Catalog resources (through IAM policies or AWS Glue resource policies).

By default, the group has `Super` permission on all existing Data Catalog resources, and on new Data Catalog resources if **Use only IAM access control** settings are enabled..


## Change to Lake Formation permission mode

Lake Formation initially uses "Use only IAM access control" for compatibility with existing AWS Glue Data Catalog behavior, allow managing data and metadata access through IAM and S3 bucket policies.

To manage access to Data Catalog resources by Lake Formation permissions only:

1. Change the default security settings for new resources.
   1. In Lake Formation console, at **Data Catalog settings** section
   2. Clear both check boxes "**Use only IAM access ...**" and **Save**
   3. Revoke `IAMAllowedPrincipals` permission for database creators in **Administrative roles and tasks** section
2. Change the settings for existing Data Catalog resources.
   1. Revoke `Super` permission from `IAMAllowedPrincipals` on each table and database in **Data lake permissions** section
   2. When registering S3 locations with Lake Formation, set **Permission mode** to **Lake Formation**


## Hybrid access mode

To ease the transition of data lake permissions from an IAM and Amazon S3 model to Lake Formation permissions, it is recommended to use hybrid access mode for Data Catalog.

Hybrid access mode lets you use both Lake Formation permissions and IAM policies to secure and access cataloged data.

It allows data administrators to onboard Lake Formation permissions selectively and incrementally, focusing on one data lake use case at a time.


## Suggested policies for Lake Formation personas

See [IAM permissions for suggested Lake Formation personas](https://docs.aws.amazon.com/lake-formation/latest/dg/permissions-reference.html).
