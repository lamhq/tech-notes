# Permissions

## Overview

You use the Data Catalog together with IAM policies and Lake Formation to control access to the tables and databases.


## Setting up IAM permissions for Glue

You can use **AWS Glue console** to:
- Grant your IAM identities access to AWS Glue resources and Amazon S3. You choose the IAM identities (roles or users) that you want to give AWS Glue permissions to. AWS Glue attaches the `AWSGlueConsoleFullAccess` managed policy to these identities.
- Create a service role for AWS Glue. It uses that service role to access resources in other AWS services on your behalf. AWS Glue attaches these policies to the existing role.