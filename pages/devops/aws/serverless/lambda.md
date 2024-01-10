# AWS Lambda

## Overview

AWS Lambda lets you run code without provisioning or managing servers.

Lambda-based applications are composed of functions triggered by events.

With serverless computing, your application still runs on servers, but all the server management is done by AWS.

Lambda functions:
- Consist of code and any associated dependencies.
- Configuration information is associated with the function.
- You specify the configuration information when you create the function.
- API provided for updating configuration data.

Use cases: web backends, IoT backends, mobile backends, data processing, ...

You specify the amount of memory you need allocated to your Lambda functions. AWS Lambda allocates CPU power proportional to the memory you specify using the same ratio as a general purpose EC2 instance type.

Lambda assumes an IAM role when it executes the function.

Lambda also integrates with X-Ray for debugging:
- Can trace Lambda with X-Ray.
- Need to enable in the Lambda configuration and it will run the X-Ray daemon.
- Use AWS SDK in your code.


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

![](https://blog.vsoftconsulting.com/hubfs/AWS%20Lambda%20working.png)

1. You upload your code to Lambda. 
1. You set your code to trigger from an event source, such as AWS services, mobile applications, or HTTP endpoints.
1. Lambda runs your code only when triggered.
1. You pay only for the compute time that you use. 


## Configuration

- **Runtime**: You'll need to pick from an available runtime or bring your own. This is the environment your code will run in.
- **Permissions**: If your Lambda function needs to make an AWS API call, you'll need to attach a role.
- **Networking**: Optionally define the VPC, subnet, and security groups your functions are a part of. If you don't specify networking configurations, your Lambda functions run in an AWS owned VPC with internet access in place.
- **Resources**: Define the amount of available memory allocated to your function. CPU scales with memory.
- **Trigger**: Things can kick off Lambda functions. Common triggers: S3, Kinesis, and EventBridge


## Building Lambda Apps

You can deploy and manage your serverless applications using the AWS Serverless Application Model (AWS SAM).

AWS SAM is a specification that prescribes the rules for expressing serverless applications on AWS.

You can automate your serverless application’s release process using AWS CodePipeline and AWS CodeDeploy.

You can enable your Lambda function for tracing with AWS X-Ray.


## Invoking Lambda Function

You can invoke Lambda functions directly with the Lambda console, the Lambda API, the AWS SDK, the AWS CLI, and AWS toolkits.

You can also configure other AWS services to invoke your function, or you can configure Lambda to read from a stream or queue and invoke your function.

When you invoke a function, you can choose to invoke it synchronously or asynchronously.

### Synchronous invocation

You wait for the function to process the event and return a response.

### Asynchronous invocation

You don’t wait for a response from the function code. Lambda places the event in a queue and returns a success response without additional information.

Lambda handles retries and can send invocation records to a destination.


## Success and Failure Destinations

With Destinations, you can route asynchronous function results as an execution record to a destination resource without writing additional code.

An execution record contains details about the request and response in JSON format including:
- version
- timestamp
- request context
- request payload
- response context
- response payload.

For each execution status such as Success or Failure you can choose one of four destinations:
- another Lambda function
- SNS
- SQS
- EventBridge

Lambda can also be configured to route different execution results to different destinations.

On-Success:

- When a function is invoked successfully, Lambda routes the record to the destination resource for every successful invocation.
- You can use this to monitor the health of your serverless applications via execution status or build workflows based on the invocation result.


On-Failure:
- Destinations gives you the ability to handle the Failure of function invocations along with their Success.
- When a function invocation fails, such as when retries are exhausted or the event age has been exceeded (hitting its TTL),
- Destinations routes the record to the destination resource for every failed invocation for further investigation or processing.
- Destinations provide more useful capabilities than Dead Letter Queues (DLQs) by passing additional function execution information, including code exception stack traces, to more destination services.
- Destinations and DLQs can be used together and at the same time although Destinations should be considered a more preferred solution.


## Dead Letter Queue (DLQ)

A dead-letter queue saves discarded events for further processing. A dead-letter queue acts the same as an on-failure destination in that it is used when an event fails all processing attempts or expires without being processed.

However, a dead-letter queue is part of a function’s version-specific configuration, so it is locked in when you publish a version.

On-failure destinations also support additional targets and include details about the function’s response in the invocation record.

You can setup a DLQ by configuring the ‘DeadLetterConfig’ property when creating or updating your Lambda function.

You can provide an SQS queue or an SNS topic as the ‘TargetArn’ for your DLQ, and AWS Lambda will write the event object invoking the Lambda function to this endpoint after the standard retry policy (2 additional retries on failure) is exhausted.


## Function Dependencies

If your Lambda function depends on external libraries such as AWS X-Ray SDK, database clients etc. you need to install the packages with the code and zip it all up.

Upload the zip file straight to Lambda if it's less than 50MB, otherwise upload to S3.

AWS SDK comes with every Lambda function by default.


## Lambda Layers

A layer is a ZIP archive that contains libraries, a custom runtime, or other dependencies.

With layers, you can use libraries in your function without needing to include them in your deployment package.

A function can use up to 5 layers at a time.

Layers are extracted to the `/opt` directory in the function execution environment.

Each runtime looks for libraries in a different location under `/opt`, depending on the language.


## Event source mappings

Lambda is an event-driven compute service where AWS Lambda runs code in response to events.

You can use event source mappings to process items from a stream or queue in services that don’t invoke Lambda functions directly.

An event source mapping uses permissions in the function’s execution role to read and manage items in the event source.

Permissions, event structure, settings, and polling behavior vary by event source.

The configuration of the event source mapping for stream-based services (DynamoDB, Kinesis), and Amazon SQS, is made on the Lambda side.

Supported AWS event sources include:
- Amazon S3.
- Amazon DynamoDB.
- Amazon Kinesis Data Streams.
- Amazon Simple Notification Service.
- Amazon Simple Email Service.
- Amazon Simple Queue Service.
- Amazon Cognito.
- AWS CloudFormation.
- Amazon CloudWatch Logs.
- Amazon CloudWatch Events.
- AWS CodeCommit.
- AWS Config.
- Amazon Alexa.
- Amazon Lex.
- Amazon API Gateway.
- AWS IoT Button.
- Amazon CloudFront.
- Amazon Kinesis Data Firehose.
- Other Event Sources: Invoking a Lambda Function On Demand.


## Lambda Aliases

Lambda aliases are pointers to a specific Lambda version.

Using an alias you can invoke a function without having to know which version of the function is being referenced.

Aliases are mutable.

Aliases enable stable configuration of event triggers / destinations.

Aliases also have static ARNs but can point to any version of the same function.

Aliases can also be used to split traffic between Lambda versions (blue/green).

Aliases enable blue green deployment by assigning weights to Lambda version (doesn’t work for `$LATEST`, you need to create an alias for `$LATEST`).


## Lambda Versions

You can have multiple versions of your function.

The function version includes the following information:
- The function code and all associated dependencies.
- The Lambda runtime that executes the function.
- All the function settings, including the environment variables.
- A unique Amazon Resource Name (ARN) to identify this version of the function.

You work on `$LATEST` which is the latest version of the code – this is mutable (changeable). When you’re ready to publish a Lambda function you create a version (these are numbered).

Numbered versions are assigned a number starting with `1` and subsequent versions are incremented by `1`.

Each version has its own ARN. This allows you to effectively manage them for different environments like Production, Staging or Development.

A qualified ARN has a version suffix.

An unqualified ARN does not have a version suffix.

You cannot create an alias from an unqualified ARN.


## Pricing

Priced based on:
- Number of requests.
- Duration of the request calculated from the time your code begins execution until it returns or terminates.
- The amount of memory allocated to the function.

Free tier of 1,000,000 requests and 400,000 GBs of compute per month.

It can be very cost effective to run functions whose execution time is very low, such as functions with durations under 100ms or low latency APIs.


## Traffic Shifting

Traffic shifting makes it's possible to implement canary deployments of Lambda functions.

By updating additional version weights on an alias, invocation traffic is routed to the new function versions based on the weight specified.

Detailed CloudWatch metrics for the alias and version can be analyzed during the deployment, or other health checks performed, to ensure that the new version is healthy before proceeding.


## Lambda@Edge

Lambda@Edge allows you to run code across AWS locations globally without provisioning or managing servers, responding to end users at the lowest network latency.

Lambda@Edge lets you run Node.js and Python Lambda functions to customize content that CloudFront delivers:
- After CloudFront receives a request from a viewer (viewer request).
- Before CloudFront forwards the request to the origin (origin request).
- After CloudFront receives the response from the origin (origin response).
- Before CloudFront forwards the response to the viewer (viewer response).


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