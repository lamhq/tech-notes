# Roles, Permission, Policies

## Execution Roles

In AWS Lambda an IAM role can be assigned as an execution role.

Execution role is assumed by the Lambda service on invocation, so that the function has permissions to access AWS services and resources.

The trust policy of the role (used to state who can assume the role) must specify Lambda service: `lambda.amazonaws.com`.

Role can be changed after creation.

Execution Role is configured under the **Permission** section.

A permission policiy that gives the Lambda permission to publish
to an Amazon SSNS topic named `MyTopic`:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sns:Publish",
      "Resource": "arn:aws:sns:REGION:ACCOUNT_ID:MyTopic"
    }
  ]
}
```
