# Error Handling

## Overview

A step function will execute many small tasks. Error handling should happens in step functions (not in application code).

Reasons of runtime errors:
- State machine definition issues (for example, no matching rule in a Choice state)
- Task failures (for example, an exception in a Lambda function)
- Transient issues (for example, network partition events)

Types of error handling in Step Function:
- Retry: retry failed state
- Catch: transition to failure path

Predefined error codes:
- `States.ALL`: matches any error name
- `States.Timeout`: Task ran longer than TimeoutSeconds or no heartbeat received
- `States.TaskFailed`: execution failure
- `States.Permissions`: insufficient privileges to execute code

State can report its own error and you can catch them in the Step Function.


## Retry

Retries are evaluated from top to bottom in workflow definition.

In a retry configuration for AWS Step Functions, you can specify the following parameters:
- `ErrorEquals`: A list of error types that trigger the retry. You can use predefined error names like `States.ALL` to catch all errors.
- `IntervalSeconds`: The initial wait time between retry attempts, in seconds.
- `MaxAttempts`: The maximum number of retry attempts. When attempts are fulfilled and reach, `Catch` block will kick in.
- `BackoffRate`: A multiplier that increases the wait time between retries after each attempt.

```json
{
  "Comment": "A simple AWS Step Functions state machine with retry logic",
  "StartAt": "MyTask",
  "States": {
    "MyTask": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:my-function",
      "Retry": [
        {
          "ErrorEquals": ["States.ALL"],
          "IntervalSeconds": 2,
          "MaxAttempts": 3,
          "BackoffRate": 2.0
        }
      ],
      "End": true
    }
  }
}
```


## Catch

Evaluated from top to bottom.

The `Catch` configuration allows you to handle errors gracefully by specifying what to do when a state encounters an error.

You can specify the following parameters:

- `ErrorEquals`: A list of error names that this `Catch` block will handle.
- `Next`: The name of the state to transition to if an error specified in `ErrorEquals` occurs.
- `ResultPath`: A JSONPath expression that indicates where to inject the error information into the state input.
- `Comment`: An optional field where you can add a description or comment about the `Catch` block³.

For example, this configuration specifies that if a `States.Timeout` error occurs, the state machine transitions to the `TimeoutHandler` state, and if any other error occurs, it transitions to the `GenericErrorHandler` state:
```json
{
  "Catch": [
    {
      "ErrorEquals": ["States.Timeout"],
      "Next": "TimeoutHandler",
      "ResultPath": "$.error-info",
      "Comment": "Handles timeout errors"
    },
    {
      "ErrorEquals": ["States.ALL"],
      "Next": "GenericErrorHandler",
      "ResultPath": "$.error-info",
      "Comment": "Handles all other errors"
    }
  ]
}
```
