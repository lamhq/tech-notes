# Tracing

Tracing helps to see the paths through a system, as well as pinpoint specific problem areas.

## X-Ray

You can use AWS X-Ray to visualize the components of your application, identify performance bottlenecks, and troubleshoot requests that resulted in an error.

Your Lambda functions send trace data to X-Ray, and X-Ray processes the data to generate a service map and searchable trace summaries.

With sampling, not every single invocation will be an X-Ray.

### Permissions

The function excution role needs to have:
- `xray:PutTraceSegments`
- `xray:PutTelemetryRecords`
- `xray:GetSamplingRules`
- `xray:GetSamplingTargets`
- `xray:GetSamplingStatisticSummaries`

The `AWSXRayDaemonWriteAccess` managed policy has these.


## X-Ray Daemon

The AWS X-Ray Daemon is a software application that gathers raw segment data and relays it to the AWS X-Ray service.

The daemon works in conjunction with the AWS X-Ray SDKs so that data sent by the SDKs can reach the X-Ray service.

When you trace your Lambda function, the X-Ray daemon automatically runs in the Lambda environment to gather trace data and send it to X-Ray.

Must have permissions to write to X-Ray in the execution role.