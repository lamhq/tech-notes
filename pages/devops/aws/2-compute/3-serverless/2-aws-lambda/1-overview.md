# AWS Lambda

## Overview

AWS Lambda is a serverless compute service that lets you run code without provisioning or managing the underlying servers.

You are responsible only for your code.

It allows to run your code on demand with automated scaling.

Lambda functions run in their own secure and isolated runtime environments. You cannot log in to compute instances or customize the runtime's operating system.

Use cases: web backends, IoT backends, mobile backends, data processing, ...


## Pricing

Free tier of 1,000,000 requests and 400,000 GBs of compute per month.

After that, pay per request, rounded up to the nearest 1ms (duration).

It can be very cost effective to run functions whose execution time is very low, such as functions with durations under 100ms or low latency APIs.


## Features

- Intergrates with numerous AWS services, including S3, DynamoDB, EventBridge, SQS/SNS, Kinesis.
- Bult-in monitoring. Logging and monitoring using CloudWatch.
- Memory requirement can be set up to **10,240 MB**. CPU scales with memory.
- Support popular programming languages: Python, Golang, Java, Node.js, ...


## Configuration

- **Runtime**: You'll need to pick from an available runtime or bring your own. This is the environment your code will run in.
- **Permissions**: If your Lambda function needs to make an AWS API call, you'll need to attach a role.
- **Networking**: Optionally define the VPC, subnet, and security groups your functions are a part of. If you don't specify networking configurations, your Lambda functions run in an AWS owned VPC with internet access in place.
- **Resources**: Define the amount of available memory allocated to your function. CPU scales with memory.
- **Trigger**: Things can kick off Lambda functions. Common triggers: S3, Kinesis, and EventBridge


## Quotas (limitations)

### Compute and storage

- 1,000 concurrent executions (1000 instances)
- 512 MB - 10 GB disk storage (`/tmp`)
- Can integrate with EFS if needed (require VPC configuration). This enables multiple functions to access the same file system
- Environment variables have size limit of 4 KB in total
- 128 MB - 10 GB memory allocation
- Can run for up to 900 seconds (15 minutes). For anything longer, use ECS, Batch or EC2.

### Deployments and Configuration

- Compressed deployment package (`.zip`) size must be ≤ 50 MB
- Uncompressed deployment package (unzipped) must be ≤ 250
MB
- If you have a large deployment package,
you should upload that to an Amazon S3 bucket,
and configure your function to reference that for its code
- Request and response payload sizes up to 6 MB
- Streamed responses up to 20 MB


## How Lambda Works

![](https://blog.vsoftconsulting.com/hubfs/AWS%20Lambda%20working.png)

1. You upload your code to Lambda. 
1. You set your code to trigger from an event source, such as AWS services, mobile applications, or HTTP endpoints.
1. Lambda runs your code only when triggered.
1. You pay only for the compute time that you use. 


## AWS Lambda Power Tuning

AWS Lambda Power Tuning is an open-source tool that helps find the most optimal memory and CPU allocation for your lambda functions.

It runs in your own AWS account, and it supports three optimization strategies: cost, speed, and balanced.

To work with AWS Lambda Power Turning, you provide a Lambda function Amazon Resource Name (ARN) as input. It then invokes that function with multiple power configurations. Then, it analyzes all the execution logs and suggests the best power configuration to minimize cost or maximize performance.

AWS Lambda Power Turning also supports cross-Region invocations, and you can enable parallel execution to generate results in a few seconds.

> For example, the following diagram shows results for two CPU-intensive functions, which become both cheaper and faster with more power.

![](./images/power-tunning.png)


## AWS Lambda Powertools

AWS Lambda Powertools helps you optimize your Lambda functions and use best practices. 

It's a suite of utilities for AWS Lambda functions that is designed to make it easier to adopt best practices such as tracing, structured logging, custom metrics, idempotency, batching, and more. 


## Reuse execution environment 

An optimization technique is to move certain initialization tasks in your code so they are outside the handler. These tasks can then be reused across invocations (which is also known as execution environment reuse).

> To do this, initialize SDK clients and database connections outside of the function handler, and cache static assets locally in the `/tmp` directory. Subsequent invocations that are processed by the same instance of your function can reuse these resources. This reuse saves cost by reducing function run time. 

To avoid potential data leaks across invocations, don’t use the execution environment to store user data, events, or other information with security implications.