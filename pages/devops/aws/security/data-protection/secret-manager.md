# AWS Secrets Manager

## Overview

AWS Secrets Manager is a service that securely stores, encrypts, rotates your secrets needed for your applications, services, and IT resources.

Secrets are retrieved via API calls.

Encryption in transit and at rest using KMS.

Automatically rotates credentials. Rotation happens immediately after enabled.

Uses IAM permissions to control access.

Costs money but is highly scalable.


## Secret Rotation

When you enable rotation, the service creates a new version of the secret and updates the credentials in both the secret and the database or service. This ensures that the credentials are updated regularly and reduces the risk of unauthorized access.

**Disable Rotation**: If your applications are still using embedded credentials, do not enable rotation because the embedded credentials will no longer work and this will break your application.

**Enable Rotation**: This is the recommended setting if your applications are not already using embedded credentials (i.e., they are not going to try to connect to the database using the old credentials).