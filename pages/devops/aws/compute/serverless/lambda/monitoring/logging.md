# Logging

## Overview

Lambda pushes logs to CloudWatch Logs.

Default location: `/aws/lambda/{function-name}`

This includes default logs from the runtime and any log output from the code.

No cost associated with logging in Lambda, but CloudWatch costs apply (includes a free tier but after that there are charges for ingestion, archiving and querying)

Logs are organized into groups. One group per function is the default.

Each group contains a collection of log streams, one stream per function.

Log stream name's format: `YYYY/MM/DD[Function version][Execution environment GUID]`

By default, logs are retained indefinitely, even if the function is deleted.


## Default Log Messages

Log Messages are logged automatically by the runtime.

When a Lambda function is invoked, the start log entry is logged. It contains the function version and unique request ID.

When the function is completed, there is an end log entry. It contains the request ID.

A `REPORT` line is logged that contains:
- The unique request ID
- For cold requests, the duration of initialization
- The duration of the handler processing, and the billed duration
- The memory allocated and the maximum amount of memory used
- If tracing is enabled, the entry will include:
  - The AWS X-Ray trace ID
  - The AWS X-Ray segment ID
  - A Boolean value showing whether it was a sampled request or not


## Custom logs

Any messages sent to the `stdout` or `stderr` stream will be stored in CloudWatch logs.

You can use `console` or `print` methods, as well as common logging libraries.

Logging can be configured in **Monitoring and operations tools** section in your function Configuration tab, you can:
- Set the log format to Text or JSON
- Set a specific log level for **System log** and **Application log**
- Set a custom log group for your function


Logging for python:
```py
logging.getLogger().info('hello')
```

Node.js:
```js
console.info('hello')
```

If using the JSON log format, extra parameters can be included to be output in the structured log message:
```py
import logging
logger = logging.getLogger()
def lambda_handler(event, context):
  logging.info(
    "Processing customer record",
    extra={
      "event": event,
      "customerId": 5664
    },
  )
```
Log output:
```json
{
  "timestamp": "2023-12-1514:00:04Z",
  "level": "INFO",
  "message": "Processing customer record",
  "logger": "root",
  "requestId": "a1d914fc-1054-45ca-8df7-88453a5ac0a0",
  "event": {
    "firstName": "jeff",
    "email": "email@address.com"
  },
  "customerId": 5664
}
```


## Permissions

A function's execution role needs permissions:
- `logs:CreateLogGroup`
- `logs:CreateLogStream`
- `logs:PutLogEvents`

The `AWSLambdaBasicExecutionRole` policy includes these.


## Best practices

Do:
- Set up log retention to avoid cost for storing logs
- Use log levels and configure them per environment. For example, use environment variable to enable `DEBUG` logs in dev, but only `WARN` and `ERRORs` in production.
- Use structured logging. It's much easier to filter and search. You can also create CloudWatch metrics from the structured logs.
- Make log messages more specific to easily find the related code (e.g. an ID to a row in a database)
- Use Logs Insights to remove noise and drill down to failures

Don't:
- Log too much or too little
- Log sensitive data
