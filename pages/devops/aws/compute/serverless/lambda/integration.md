# Integration with other AWS services

## Elastic Load Balancing

Application Load Balancers (ALBs) support AWS Lambda functions as targets.

The Load Balancer send the request to Lambda as a JSON event with request details and body. It expects a JSON response, which contain status code, headers, and body.

When the load balancer forwards the request to a target group with a Lambda function as a target, it invokes your Lambda function and passes the content of the request to the Lambda function, in JSON format.

To configure the Load Balancer:
- create a target group per function
- add a rule to send requests to the target group
- grant Elastic Load Balancing permission to invoke your Lambda function.


### Limitations

- The Lambda function and target group must be in the same account and in the same Region.
- The maximum size of the request body that you can send to a Lambda function is 1 MB.
- The maximum size of the response JSON that the Lambda function can send is 1 MB.
- WebSockets are not supported. Upgrade requests are rejected with an HTTP 400 code.


### Health check

You can enable health checks to implement DNS failover with Amazon Route 53. 

The Lambda function can check the health of a downstream service before responding to the health check request.


## API Gateway

API Gateway is a serverless managed API service.

Support request validation, custom domain name, caching options, throttling...

Lambda can be integrated into API gateway in two ways:

### Proxy integration

Simple integration method.

Directly routes requests to a Lambda function.

API gateway automatically manages input and output transformation.

Simplifies the initial API Gateway setup, including debugging.

AWS-recommended integration type.

### Custom integration

Can be more complex to set up and debug.

Provide more control over the request and response behavior in API gateway.

Configuration is done with mapping templates, can be reused across different endpoints.


## Amazon SQS

We can set up Event Source Mappings for Polling SQS queue and process items with Lambda.

Initially, the event source mapping read up to 5 batches from the queue, making 5 concurrent invocations of the function.

Then, **the number of processes reading batches** increases by up to 60 instances a minute, this can go up to 1000.

If a queue is filling up really quickly, it can take a little while for Lambda to scale up to process all the items.

A maximum concurrency can be configured per event source, which can be useful if downstream systems could get overwhelmed.

Examples:
- Batch size of 10 means initially 5 batches of 10 each for an item concurrency of 50.
- Batch size of 200 will mean an item concurrency of 1000 initially.

### Batch size considering

Larger batch likely means slower functions.

It can actually be quicker to have smaller batches and run five batches sequentially many times versus having a few large batches in parallel.

Yhe best advice is to try different batch sizes
for your specific use case.


## Amazon EventBridge

EventBridge invokes Lambda using the asynchronous invocation method.

The event that is sent to Lambda is from the event bus, but wrapped with some other metadata.

EventBridge schedules offer cron job functionality for your AWS account

If EventBridge fails to pass the event to the Lambda service, it will retry (default is 24 hours with a backing off strategy between each retry, up to 185 times).

If the function fails, Lambda will retry twice before passing the failure to a dead letter queue or a failure destination.


## Amazon RDS

Three main ways to connect to a RDS database from a Lambda function:

Using stored credentials: which is securely kept in Secrets Manager.

[IAM database authentication](https://aws.amazon.com/blogs/database/iam-role-based-authentication-to-amazon-aurora-from-serverless-applications/):
- No passwords needed, generated auth token can be used instead
- Downsides: connection throttling possible when high connections per second rates are seen

[RDS proxy](https://aws.amazon.com/blogs/compute/using-amazon-rds-proxy-with-aws-lambda/):
- Manages connection pooling, especially useful for many Lambdas with many connections