# AWS Security Token Service (STS)

## Overview

AWS STS enables you to request temporary, limited privilege credentials for IAM Users or Federated Users.

Temporary security credentials are not stored with the user but are generated dynamically and provided to the user when requested.

STS supports AWS CloudTrail, which records AWS calls for your AWS account and delivers log files to an S3 bucket.

The AWS STS API action returns temporary security credentials that consist of:

- An access key which consists of an access key ID and a secret ID.
- A session token.
- Expiration or duration of validity.
- Users (or application) can use these credentials to access your resources.


## Benefits

- No need to embed token in the code
- Limited Lifetime (15min — 1 and 1/2 day)


## Use Cases

- Identity Federation: Enterprise Identity Federation[Active Directory/ADFS], Web Identity Federation (Google, Facebook)
- Cross-account access (for Organization with multiple AWS accounts)
- Applications on Amazon EC2 Instances
