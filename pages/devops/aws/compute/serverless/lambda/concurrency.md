# Concurrency

## Overview

Concurrency is the number of concurrently running lambda functions.

An execution environment will process one event at a time. But the same environment can run multiple events sequentially.

For example, if a function's invocation time is 100 milliseconds and a single execution environment can process 10 invocations a second, it has a concurrency of 1.


## Account concurrency

The maximum number of concurrent instances across all functions in the region.

The quota is set low on new accounts. For more established accounts, the default should be 1,000.


## Reserved Concurrency

The upper limit of a function's concurrency.

This can be for throttling how many instances of the function can run concurrently. No matter how many requests your function receives, AWS will only scale up to the specified number of instances.

This also can reserves the concurrency for the function to guarantee a set number of concurrent executions will be available for a critical function.

This can even be set to zero to stop a function running.

Be careful, if it's set high, other functions might **throttle** as they hit the unreserved **account concurrency limit**.

**Function throttling** means AWS Lambda will start rejecting incoming requests because it can't scale any further, leading to errors and failed executions.

There is no cost associated to reserve concurrency.


## Burst concurrency

Burst concurrency is a limit in how much concurrency can be increased.

The default quota is 1,000 instances every 10 seconds. Lambda will scale at that rate per function until the functions of reserved concurrency or account concurrency is hit.

Example:
- 500 invocation requests come in at the same time, Lambda will process them fine
- 1,500 requests come in at the same time, Lambda will only process 1,000 of them. The other 500 will be throttled (due to the burst concurrency limit).
- 10 seconds later, 1,500 requests come in again. All of them will be processed fine.

`TooManyRequestsExeception` may be experienced if the concurrent execution limit is exceeded.

Throttle behavior:
- For synchronous invocations, returns throttle error 429 "Request throughput limit exceeded".
- For asynchronous invocations, retries automatically (twice) then goes to a Dead Letter Queue (DLQ).

A DLQ can be an SNS topic or SQS queue. The original event payload is sent to the DLQ. The Lambda function needs an IAM role with permissions to SNS/SQS.


## Provisioned Concurrency

This feature allows pre-warming Lambda instances by initializing execution environments ahead of time.

This helps avoid cold starts.

Provisioned concurrency still adheres to burst and account concurrency limits, but can be used to help avoid throttling.

So provisioning 500 of a function will eat up 500 of the account concurrency limit.

Application Auto Scaling can be used to automatically adjust provisioned concurrency amount. This can be done with schedules or tracking the utilization of provisioning.

### Consideration

If a function can be optimized to have a minimal cold start time
or the architecture can be asynchronous so processing time is not a big factor, then provision concurrency might not be needed.

### Cost

No matter whether a function runs concurrently or sequentially, the cost is the same. Prices are based on the invocation duration, which is proportional to the allocated memory.

Provisioned concurrency is priced based on the amount of concurrency, allocated memory, length of time a function is provisioned for, invocation duration.
