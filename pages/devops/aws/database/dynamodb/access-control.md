# Access control

All authentication and access control is managed using IAM.

DynamoDB doesn’t support resource-based policies.

DynamoDB supports identity-based policies by:
- Attach a permissions policy to a user or a group in your account.
- Attach a permissions policy to a role (grant cross-account permissions).

You can use a IAM condition to restrict user access to only their own records.

Resources:
- the primary resources are tables.
- supports additional resource types, indexes, and streams.
- indexes and streams are sub-resources

ARNs format:

| Resource Type  | ARN Format |
|---|---|
| Table | arn:aws:dynamodb:region:account-id:table:table/name-name |
| Index | arn:aws:dynamodb:region:account-id:table:table/name-name/index/index-name |
| Stream | arn:aws:dynamodb:region:account-id:table:table/name-name/stream/stream-label |
