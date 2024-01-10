# Lambda and Amazon VPC

## Overview

You can connect a Lambda function to private subnets in a VPC.

Lambda needs the following VPC configuration information so that it can connect to the VPC:
- Private subnet ID.
- Security Group ID (with required access).

Lambda uses this information to setup an Elastic Network Interface (ENI) using an available IP address from your private subnet.

Lambda functions provide access only to a single VPC.

Only connect to a VPC if you need to as it can slow down function execution.


## Permissions

Lambda uses your function’s permissions to create and manage network interfaces. To connect to a VPC, your function’s execution role must have the following permissions:
- `ec2:CreateNetworkInterface`
- `ec2:DescribeNetworkInterfaces`
- `ec2:DeleteNetworkInterface`

These permissions are included in the `AWSLambdaVPCAccessExecutionRole` managed policy.


## Internet access

Lambda functions configured to access resources in a VPC will not have access to the Internet as a default configuration.

If you need access to the internet, you will need to create a NAT in your VPC to forward this traffic and configure your security group to allow this outbound traffic.
