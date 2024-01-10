# Elastic Load Balancing

## Overview

Application Load Balancers (ALBs) support AWS Lambda functions as targets.

When the load balancer forwards the request to a target group with a Lambda function as a target, it invokes your Lambda function and passes the content of the request to the Lambda function, in JSON format.

If you create the target group and register the Lambda function using the AWS Management Console, the console adds the required permissions to your Lambda function policy on your behalf. Otherwise, you must grant Elastic Load Balancing permission to invoke your Lambda function.


## Limits

- The Lambda function and target group must be in the same account and in the same Region.
- The maximum size of the request body that you can send to a Lambda function is 1 MB.
- The maximum size of the response JSON that the Lambda function can send is 1 MB.
- WebSockets are not supported. Upgrade requests are rejected with an HTTP 400 code.


## Health check

You can enable health checks to implement DNS failover with Amazon Route 53. 

The Lambda function can check the health of a downstream service before responding to the health check request.
