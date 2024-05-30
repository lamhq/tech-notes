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


## Resource-Based Policies

Resource-based policy is what others are allowed to do to the function.

It grants usage permissions for either invocation or management

It can grant access to AWS accounts, organizations, and other services

Resource-based policies are applied to a function, version, alias, or layer version

Example: Allow API Gateway to invoke a function to process requests

Is configured under the **Permission** section, **Resource-based policy statements**.