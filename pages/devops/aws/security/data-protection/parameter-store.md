# Parameter Store

## Overview

Parameter Store is a feature of AWS Systems Manager that provides secure, hierarchical storage for configuration data management and secrets management.

You can store values as plain text or encrypted data.

Great place for distributed configuration values that may be accessed from many different systems, not just for secrets.

Support several types:
- `String`
- `StringList`: comma-separated text, unencrypted
- `SecureString`: encrypted text via AWS KMS, can be decrypted before being returned.

Free at the standard tier. KMS product related incur cost.

Integrates with Secrets Manager: your code can use the SSM API or SDK to retrieve secrets
that are actually stored in Secrets Manager.

Accessing secrets using AWS SDK. The calling application need permissions to access Parameter Store.


## Limitations

- Limit to the number of parameters you can store (currently 10,000)
- No key rotation
- No password generation using CloudFormation
