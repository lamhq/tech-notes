# Optimization

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
