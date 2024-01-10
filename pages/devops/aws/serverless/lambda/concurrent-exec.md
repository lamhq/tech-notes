# Concurrent executions

## Function's Concurrency

The first time you invoke your function, AWS Lambda creates an instance of the function and runs its handler method to process the event.

If you invoke the function again while the first event is being processed, Lambda initializes another instance, and the function processes the two events concurrently.

Your function's concurrency is the number of instances that serve requests at a given time.


## Concurrency Limits

Initial burst Concurrency Limits:

- 3000 – US West (Oregon), US East (N. Virginia), Europe (Ireland).
- 1000 – Asia Pacific (Tokyo), Europe (Frankfurt).
- 500 – Other Regions.

After the initial burst, your functions’ concurrency can scale by an additional 500 instances each minute. This continues until there are enough instances to serve all requests, or until a concurrency limit is reached.

The default account limit is up to 1000 executions per second, per region (can be increased).

Each invocation over the concurrency limit will trigger a throttle.

`TooManyRequestsExeception` may be experienced if the concurrent execution limit is exceeded.

You may receive a HTTP status code: 429 and the message is "Request throughput limit exceeded".

Throttle behavior:
- For synchronous invocations returns throttle error 429.
- For asynchronous invocations retries automatically (twice) then goes to a Dead Letter Queue (DLQ).

A DLQ can be an SNS topic or SQS queue. The original event payload is sent to the DLQ.

The Lambda function needs an IAM role with permissions to SNS / SQS.


## Reserved Concurrency

You can set a reserved concurrency at the function level to guarantee a set number of concurrent executions will be available for a critical function.

You can reserve up to the **Unreserved account concurrency** value (that is shown in the console) minus 100 for functions that don’t have reserved concurrency.

To throttle a function, set the reserved concurrency to zero. This stops any events from being processed until you remove the limit.

To reserve concurrency for a function:
- Open the Lambda console Functions page.
- Choose a function.
- Under Concurrency, choose Reserve concurrency.
- Enter the amount of concurrency to reserve for the function.
- Choose Save.


## Provisioned Concurrency

When provisioned concurrency is allocated, the function scales with the same burst behavior as standard concurrency.

When all provisioned concurrency is in use, the function scales up normally to handle any additional requests.

Provisioned concurrency runs continually and is billed in addition to standard invocation costs.

With Application Auto Scaling:
- Application Auto Scaling takes scaling a step further by providing autoscaling for provisioned concurrency.
- With Application Auto Scaling, you can create a target tracking scaling policy that adjusts provisioned concurrency levels automatically, based on the utilization metric that Lambda emits.
- Use the Application Auto Scaling API to register an alias as a scalable target and create a scaling policy.
