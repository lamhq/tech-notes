# Identity and Access Management

## Overview

There are several mechanisms for controlling and managing access to an API:

- Resource-based policies.
- Standard IAM Roles and Policies (identity-based policies).
- IAM Tags.
- Endpoint policies for interface VPC endpoints.
- Lambda authorizers.
- Amazon Cognito user pools.
- STS credentials


## Resource-Based Policies

JSON policy documents that you attach to an API to control whether a specified principal (typically an IAM user or role) can invoke the API.

You can use API Gateway resource policies to allow your API to be securely invoked by:

- Users from a specified AWS account.
- Specified source IP address ranges or CIDR blocks.
- Specified virtual private clouds (VPCs) or VPC endpoints (in any account).
- You can use resource policies for all API endpoint types in API Gateway: private, edge-optimized, and Regional.

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-api-gateway-resource-based-policy.jpeg)


## IAM Identity-Based Policies

You need to create IAM policies and attach to users / roles.

API Gateway verifies IAM permissions passed by the calling application.

Leverages sigv4 capability where IAM credentials are passed in headers.

Handles authentication and authorization.

Great for user / roles within your AWS account.


## Lambda Authorizer

Use AWS Lambda to validate the token in the header being passed.

Option to cache the result of the authentication.

Lambda must return an IAM policy for the user.

You pay per Lambda invocation.

Handles authentication and authorization.

Good for using OAuth, SAML or 3rd party authentication.

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-api-gateway-lambda-authorizer.jpeg)