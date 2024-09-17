# Service integration patterns

## Wait for Task Token

Allows you to pause a workflow until an external process completes and returns a task token.

### How it works

1. **Task Token Generation**: When a task configured with `waitForTaskToken` is executed, Step Functions generates a unique task token and passes it to the specified resource (e.g., an AWS Lambda function).
2. **External Process**: The external process (e.g., a human approval system, a third-party service) performs its operations and, upon completion, sends the task token back to Step Functions using the `SendTaskSuccess` or `SendTaskFailure` API.
3. **Workflow Resumption**: Once Step Functions receives the task token, it resumes the workflow from where it left off.


### Example Configuration

Here's an example of a state definition using `waitForTaskToken` in Amazon States Language (ASL):

```json
{
  "Type": "Task",
  "Resource": "arn:aws:states:::lambda:invoke.waitForTaskToken",
  "Parameters": {
    "FunctionName": "myLambdaFunction",
    "Payload": {
      "token.$": "$$.Task.Token",
      "input.$": "$"
    }
  },
  "TimeoutSeconds": 300,
  "HeartbeatSeconds": 60,
  "Next": "NextState"
}
```

In this example:
- The `Resource` field specifies the ARN of the Lambda function to invoke.
- The `Parameters` field includes the task token (`$$.Task.Token`) and any input data.
- `TimeoutSeconds` and `HeartbeatSeconds` are optional fields to manage task timeouts and heartbeats.

### Use Cases

- **Human Approval**: Pausing the workflow until a human approves or rejects a task.
- **Third-Party Integration**: Waiting for a response from an external service or system.
- **Long-Running Tasks**: Handling tasks that take an extended period to complete.
