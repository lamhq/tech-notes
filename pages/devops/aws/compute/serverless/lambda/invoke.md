# Invoking Lambda Function

## Invocation models

The different ways a function can be called:

### Synchronous invoke

The calling code pauses and waits until a Lambda function returns a result.
- The calling application makes a request to the Lambda service to execute a function
- AWS Lambda will route this request to an available data center,
where a function will be initialized and then executed.
- The response will then be rooted back
to the calling application

### Asynchronous invoke
- The calling application makes a request to the Lambda service to execute a function
- The service will queue this request and then return an immediate response
and the application can continue
- Lambda will then run each queued execution against a function.
The response can then be rooted to an output service (SNS topic, SQS Queue,
EventBridge bus, another Lambda function).

### Event Source Mappings
Lambda service will handle mapping events
from a source to the functions.
- An event source is configured in the Lambda service
- The Lambda service will poll the source on your behalf:  
  - Read events from the sources
  - Perform batching of the events together
  - Filter events based on your configuration
  - Initialize functions as required and invoke them with the events as an input.
- Response of these executions can then be rooted
to an output service (SNS topic, SQS Queue, ...)

Supported AWS event sources:
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
