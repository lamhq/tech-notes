# CloudWatch Events

## Overview

Amazon CloudWatch Events delivers a near real-time stream of system events that describe changes in AWS resources.

CloudWatch Events can be used to schedule automated actions that self-trigger at certain times using cron or rate expressions.

Can match events and route them to one or more target functions or streams.


## Targets

- AWS Lambda functions.
- Streams in Amazon Kinesis Data Streams.
- Delivery streams in Amazon Kinesis Data Firehose.
- Amazon EC2 instances.
- AWS Batch jobs.
- Step Functions state machines.
- Log groups in Amazon CloudWatch Logs.
- Amazon ECS tasks.
- Systems Manager Run Command.
- Systems Manager Automation.
- Pipelines in CodePipeline.
- CodeBuild projects.
- Amazon Inspector assessment templates.
- Amazon SNS topics.
- Amazon SQS queues.


## Example

In the following example, an EC2 instance changes state (terminated) and the event is sent to CloudWatch Events which forwards the event to the target (SQS queue).

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-cloudwatch-events-example.jpeg)