# Cross-account data sharing

## Overview

You can share Data Catalog resources within an AWS account and across accounts.

You can also share tables with data filters to restrict access to the details at the row-level and cell-level details.


## How it work?

When a resource is shared, invites are sent to the recipient account

When a recipient accepts a invitation:
- AWS Resource Access Manager (AWS RAM) provides the necessary permissions to the recipient account
- The shared resources become available in the recipient account. Data lake administrator in the recipient account can grant further Lake Formation permissions on the shared resource to additional IAM principals within the recipient account


## Querying shared resources

To enable querying of the shared resources using Athena or Redshift Spectrum, a resource link need to be created and pointed to the shared resource.

The administrator then grants **Describe** permissions on the resource link and also the necessary permissions on the original shared resource.

This ensures that users have the appropriate access to both the resource link and the underlying shared resource.