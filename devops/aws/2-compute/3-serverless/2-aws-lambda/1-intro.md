# AWS Lambda

AWS Lambda is a serverless compute service. It supports web backends and runs in response to events or triggers.

Lambda functions run in their own secure and isolated runtime environments (execution environments). You cannot log in to compute instances or customize the runtime's operating system.

Lambda functions have a maximum runtime limit of 15 minutes.

When using Lambda, you are responsible only for your code.

Lambda manages the compute fleet, balancing memory, CPU, network, and other resources. Lambda handles operational and administrative activities like capacity management, monitoring, and logging.

Use cases: web backends, IoT backends, mobile backends, data processing, ...


## How Lambda Works

There are three primary components of a Lambda function: the trigger, code, and configuration.

The **code** is source code, that describes what the Lambda function should run.

When you create your Lambda function, you specify the **runtime** you want your code to run in. There are built-in runtimes such as Python, Node.js, Ruby, Go, Java, .NET Core, or you can implement your Lambda functions to run on a custom runtime.

The **configuration** of a Lambda function consists of information that describes how the function should run. In the configuration, you specify network placement, environment variables, memory, invocation type, permission sets, and other configurations.

**Triggers** describe when the Lambda function should run. A trigger integrates your Lambda function with other AWS services, enabling you to run your Lambda function in response to certain API calls that occur in your AWS account. 

![](images/aws-lambda.png)

1. You upload your code to Lambda. 
1. You set your code to trigger from an event source, such as AWS services, mobile applications, or HTTP endpoints.
1. Lambda runs your code only when triggered.
1. You pay only for the compute time that you use. 


## Billing Granularity

You pay only for the compute time that you consume. Charges apply only when your code is running, rounded up to the nearest 1ms (duration).

AWS rounds up duration to the nearest millisecond with no minimum execution time.

It can be very cost effective to run functions whose execution time is very low, such as functions with durations under 100ms or low latency APIs.