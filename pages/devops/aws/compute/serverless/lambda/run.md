# Running Lambda function

## Invoking Lambda Function

You can invoke Lambda functions directly with the Lambda console, the Lambda API, the AWS SDK, the AWS CLI, and AWS toolkits.

You can also configure other AWS services to invoke your function, or you can configure Lambda to read from a stream or queue and invoke your function.

When you invoke a function, you can choose to invoke it synchronously or asynchronously.

### Synchronous invocation

You wait for the function to process the event and return a response.

### Asynchronous invocation

You don’t wait for a response from the function code. Lambda places the event in a queue and returns a success response without additional information.

Lambda handles retries and can send invocation records to a destination.


## Event source mappings

Lambda is an event-driven compute service where AWS Lambda runs code in response to events.

You can use event source mappings to process items from a stream or queue in services that don’t invoke Lambda functions directly.

An event source mapping uses permissions in the function’s execution role to read and manage items in the event source.

Permissions, event structure, settings, and polling behavior vary by event source.

The configuration of the event source mapping for stream-based services (DynamoDB, Kinesis), and Amazon SQS, is made on the Lambda side.

### Supported event sources

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
