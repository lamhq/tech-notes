# AWS Step Functions

## Overview

AWS Step Functions is a serverless **workload orchestration service**, allow you to model your workflows as state machines (one machine per workflow).

You will define a workflow in JSON, then you can get a visualization of the workflow, the execution of the workflow, as well as history.

You can start a workflow with:
- SDK
- API Gateway
- Event Bridge (CloudWatch Event)
- Console

You can automatically retry failed or timed-out tasks, catch errors.

IAM policies can be used to control access to the Step Functions APIs.

Services and data can be orchestrated that run on Amazon EC2 instances, containers, or on-premises servers.


## Use Cases

Build workflows across multiple Amazon services.

Build data pipeline, long-running ETL jobs.

Automate recurring tasks: updating patches, selecting infrastructure, synchronizing data, ...

Create responsive serverless applications and microservices with multiple AWS Lambda functions without writing code for workflow logic, parallel processes, error handling, or timeouts.


## How it works

1. **Define a State Machine**: you define a state machine using Amazon States Language (ASL) that outlines the workflow.
2. **Configure States**: Add states such as `Task`, `Choice`, `Wait`, `Parallel`, and more to perform specific actions
3. **Integrate with AWS Services**: Use built-in integrations to connect with AWS services like Lambda, S3, DynamoDB, and more.
4. **Deploy and Execute**: Deploy the state machine and start executions. Monitor the progress and errors. The console highlights the real-time status of each step and provides a detailed history of every execution.
