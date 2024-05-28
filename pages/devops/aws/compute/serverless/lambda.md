# AWS Lambda

## Overview

AWS Lambda lets you run code without provisioning or managing servers. Your application runs on servers that are managed by AWS.

You upload the function code in many supported programming languages. AWS Lambda then runs function code in response to events.

You can also set the required performance,
concurrency limits, link directly to event sources,
...

Lambda isn't supposed to be a long running process.

Lambda is an example of Function-as-a-Service.

No upfront or monthly subscription costs for a standard function. You'll simply pay per request as well as pay
based on the duration of the code execution.


## Use cases

Using Lambda functions with AWS services as event sources, for example:
- Configure CloudWatch Events to invoke your function on a timer
- Configure Amazon S3 to invoke your function when an object is created

On-demand Lambda function invocation over HTTPS using Amazon API Gateway.

On-demand Lambda function invocation using custom applications (mobile, web apps, clients) and AWS SDKs, AWS Mobile SDKs, and the AWS Mobile SDK for Android.

Scheduled events can be configured to run code on a scheduled basis through the AWS Lambda Console.


## Features

- Intergrates with numerous AWS services, including S3, DynamoDB, EventBridge, SQS/SNS, Kinesis.
- Bult-in monitoring. Logging and monitoring using CloudWatch.
- Memory requirement can be set up to **10,240 MB**. CPU scales with memory.
- Support popular programming languages: Python, Golang, Java, Node.js, ...


## How Lambda Works

### Lambda Function

The Lambda Function is the definition that will be initialized and called by the Lambda service, including:
- The function code
- Configuration of how to execute it: RAM, CPU, permissions, ...

### Lambda Service

The Lambda service handles:
- initializing and calling Lambda functions
- inputs and outputs


## Function Configuration

- **Runtime**: You'll need to pick from an available runtime or bring your own. This is the environment your code will run in.
- **Permissions**: If your Lambda function needs to make an AWS API call, you'll need to attach a role.
- **Networking**: Optionally define the VPC, subnet, and security groups your functions are a part of. If you don't specify networking configurations, your Lambda functions run in an AWS owned VPC with internet access in place.
- **Resources**: Define the amount of available memory allocated to your function. CPU scales with memory.
- **Trigger**: Things can kick off Lambda functions. Common triggers: S3, Kinesis, and EventBridge


## Traffic Shifting

Traffic shifting makes it's possible to implement canary deployments of Lambda functions.

By updating additional version weights on an alias, invocation traffic is routed to the new function versions based on the weight specified.

Detailed CloudWatch metrics for the alias and version can be analyzed during the deployment, or other health checks performed, to ensure that the new version is healthy before proceeding.


## AWS Lambda Power Tuning

AWS Lambda Power Tuning is an open-source tool that helps find the most optimal memory and CPU allocation for your lambda functions.

It runs in your own AWS account, and it supports three optimization strategies: cost, speed, and balanced.

To work with AWS Lambda Power Turning, you provide a Lambda function Amazon Resource Name (ARN) as input. It then invokes that function with multiple power configurations. Then, it analyzes all the execution logs and suggests the best power configuration to minimize cost or maximize performance.

AWS Lambda Power Turning also supports cross-Region invocations, and you can enable parallel execution to generate results in a few seconds.

> For example, the following diagram shows results for two CPU-intensive functions, which become both cheaper and faster with more power.

![](./lambda/images/power-tunning.png)


## AWS Lambda Powertools

AWS Lambda Powertools helps you optimize your Lambda functions and use best practices. 

It's a suite of utilities for AWS Lambda functions that is designed to make it easier to adopt best practices such as tracing, structured logging, custom metrics, idempotency, batching, and more. 


## Reuse execution environment 

An optimization technique is to move certain initialization tasks in your code so they are outside the handler. These tasks can then be reused across invocations (which is also known as execution environment reuse). This reuse saves cost by reducing function run time.

- initialize SDK clients and database connections outside of the function handler
- cache static assets locally in the `/tmp` directory.

To avoid potential data leaks across invocations, don’t use the execution environment to store user data, events, or other information with security implications.


## Development Best Practices

Perform one-off time-consuming tasks outside of the function handler, e.g.:
- Connect to databases.
- Initialize the AWS SDK.
- Pull in dependencies or datasets.

Use environment variables for:
- Connection strings, S3 bucket etc.
- Passwords and other sensitive data (can be encrypted with KMS).

Minimize deployment packages size to runtime necessities:
- Break down the function if required.
- Remember the Lambda limits.

Cache static assets locally in the` /tmp` directory.

Avoid using recursive code.

Don’t put you Lambda function in a VPC unless you need to (can take longer to initialize).