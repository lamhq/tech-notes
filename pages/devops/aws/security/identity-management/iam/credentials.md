# AWS Credentials

## Overview

AWS credentials are used to authenticate and authorize your access to AWS services and resources. They verify your identity and determine what actions you are allowed to perform.

Here are the main types of AWS credentials:
1. **Access Keys**: These consist of an `AWS Access Key ID` and a `Secret Access Key`. They are used for programmatic access to AWS services via the AWS CLI, SDKs, or APIs.
2. **IAM Roles**: These provide temporary security credentials for users or services that need to perform actions in AWS.
3. **IAM Users**: These are individual user accounts within AWS Identity and Access Management (IAM). Each user has long-term credentials such as passwords and access keys.
4. **Federated Users**: These are users from external identity providers who are granted temporary access to AWS through federation.
5. **Root User**: This is the account owner who has full access to all AWS services and resources.


## Best Practices

Never store AWS Credentials in your code.

If your application is working within AWS, use IAM Roles:
- EC2 Instances Roles for EC2 Instances
- ECS Roles for ECS tasks
- Lambda Roles for Lambda functions

If working outside of AWS, use environment variables / named profiles