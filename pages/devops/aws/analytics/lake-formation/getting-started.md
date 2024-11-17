# Getting started

Set up AWS Lake Formation


## Create a data lake administrator

See [Create a data lake administrator](https://docs.aws.amazon.com/lake-formation/latest/dg/initial-lf-config.html#create-data-lake-admin).


## Change the default permission model

If you have existing Glue Data Catalog databases and tables, follow [Upgrading AWS Glue data permissions to the AWS Lake Formation model](https://docs.aws.amazon.com/lake-formation/latest/dg/upgrade-glue-lake-formation.html).

Lake Formation initially uses "Use only IAM access control" for compatibility with existing AWS Glue Data Catalog behavior. This effectively causes access to Data Catalog resources and S3 locations to be controlled solely by IAM policies.

To manage access to Data Catalog resources by Lake Formation permission model:

1. Change the default security settings for new resources.
   1. In Lake Formation console, at **Data Catalog settings** section
   2. Clear both check boxes "**Use only IAM access ...**" and **Save**
   3. Revoke `IAMAllowedPrincipals` permission for database creators in **Administrative roles and tasks** section
2. Change the settings for existing Data Catalog resources.
   1. Revoke `Super` permission from `IAMAllowedPrincipals` on each table and database in **Data lake permissions** section
   2. When registering S3 locations with Lake Formation, set **Permission mode** to **Lake Formation**



## Assign permissions to Lake Formation users

To assign permissions to a non-administrator user to access Lake Formation data, follow these [steps](https://docs.aws.amazon.com/lake-formation/latest/dg/initial-lf-config.html#permissions-lf-principal).


## Configure S3 locations

To enable Lake Formation to control access to underlying data at an S3 location, you must register that location with Lake Formation.

You can register data locations in the Lake Formation console at **Data lake locations** section.

When you register a location, you specify an IAM role that grants read/write permissions on that location. Lake Formation assumes that role when supplying temporary credentials to integrated services.

> Lake Formation provides data access rather than using the users permissions.

You can specify either the Lake Formation service-linked role or create your own role.

The registered IAM role must have all required access to the Amazon S3 location (including AWS KMS keys if the bucket is encrypted).

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

For more details, see [Requirements for roles used to register locations](https://docs.aws.amazon.com/lake-formation/latest/dg/registration-role.html).


## Grant access to the Data Catalog encryption key

If the AWS Glue Data Catalog is encrypted, you need to grant IAM permissions on the AWS KMS key to any principals who need to grant Lake Formation permissions.

To know which kms key is used to encrypt the Data Catalog, go to **Catalog settings** section in the Glue console.


## Create an IAM role for workflows

Create IAM role for [workflows](../lake-formation.md#workflow) executed by Glue crawlers.

Attach the `AWSGlueServiceRole` managed policy to the role.

Add the following inline policy to the role:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "lakeformation:GetDataAccess",
        "lakeformation:GrantPermissions"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "iam:PassRole"
      ],
      "Resource": [
        "arn:aws:iam::<account-id>:role/LakeFormationWorkflowRole"
      ]
    }
  ]
}
```
- `lakeformation:GetDataAccess` enables jobs created by the workflow to write to the target location.
- `lakeformation:GrantPermissions` enables the workflow to grant the SELECT permission on target tables.
- `iam:PassRole` enables the service to assume the role `LakeFormationWorkflowRole` to create crawlers and jobs and to attach the role to the created crawlers and jobs.

> The `LakeFormationWorkflowRole` is an IAM role used in AWS Lake Formation to manage workflows. This role is essential for creating metadata tables in the Data Catalog and writing data to target locations in Amazon S3

If you are ingesting data that is outside the data lake location, add an inline policy granting permissions to read the source data.


## References

- [Set up AWS Lake Formation](https://docs.aws.amazon.com/lake-formation/latest/dg/initial-lf-config.html)
