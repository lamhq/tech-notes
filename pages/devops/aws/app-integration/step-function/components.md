# Components

AWS Step Functions consist of the following key components:

## State machines

A state machine define the workflow and consist of different steps within it.


## States

Each state represents a step in the workflow.

Example: steps in an online pickup order:
- place order
- fulfill order
- mark order as ready for pickup
- mark it as picked up.

You can leverage states to:
- make decisions based on input
- perform certain actions
- pass output to the next state.

Available states:
- **Pass**: Passes any input directly to its output - no work done
- **Task**: Single unit of work performed (e.g., Lambda, Batch, and SNS)
- **Choice**: Adds branching logic to state machines
- **Wait**: Creates a specified time delay within the state machine
- **Succeed**: Stops executions successfully
- **Fail**: Stops executions and marks them as failures
- **Parallel**: Runs parallel branches of executions within state machines
- **Map**: Runs a set of steps based on elements of an input array


## Tasks

A task is a state in a workflow represent a single unit of work.

A task in Step Function can be:
- Invoke a Lambda function
- Run an AWS Batch job
- Run ECS task and wait for it to complete
- Insert an item from DynamoDB
- Publish message to SNS, SQS
- Launch another Step Function workflow
- An Activity Worker running on EC2, ECS,on-premises that poll the Step Functions for work and send results back
- ...

Here’s an example of a JSON definition for a task that invokes a Lambda function:
```json
{
  "Comment": "A simple AWS Step Functions state machine that invokes a Lambda function with parameters and a timeout.",
  "StartAt": "InvokeLambdaFunction",
  "States": {
    "InvokeLambdaFunction": {
      "Type": "Task",
      "Resource": "arn:aws:states:::lamnbda:invoke",
      "Parameters": {
        "FunctionName": "arn:aws:lambda:us-east-1:123456789012:function:MyFunction",
        "Payload.$": "$.input"
      },
      "TimeoutSeconds": 60,
      "End": true
    }
  }
}
```


## Activity Tasks

Activity Tasks allow you to integrate external processes into your state machine workflows

Useful when you need to perform actions that **can't be executed directly** within AWS services.

### How it works

You define an activity in Step Functions, which generates an ARN for the activity.

In your state machine definition, You reference to the activity using the ARN.

An external process (worker) polls Step Functions for tasks (`GetActivityTask` API), performs the required work, and then reports the result back to Step Functions (`SendTaskSuccess` or `SendTaskFailure`).

Activity Worker apps can be running on EC2, Lambda, mobile device...

### Example
Here’s an example of how you might define an activity task:
```json
{
  "Type": "Task",
  "Resource": "arn:aws:states:us-east-1:123456789012:activity:MyActivity",
  "TimeoutSeconds": 300,
  "HeartbeatSeconds": 60,
  "Next": "NextState"
}
```
- The `Resource` field specifies the ARN of the activity.


### Configuration Options

`TimeoutSeconds`:
- Specifies the maximum time, in seconds, that a state can run before it is considered to have failed
- Useful for preventing tasks from running indefinitely and helps in managing resources effectively.

`HeartbeatSeconds`:
- Specifies the interval, in seconds, at which the task must send a heartbeat signal to Step Functions to indicate that it is still working.
- Useful for long-running tasks.
- Activity Task can wait up to 1 year
