# Monitoring

## Streaming output logs

By using the [`dev` command](commands.md#monitoring), you can streams logs from one or multiple AWS Lambda functions, also their inputs and outputs, as well as their SDK calls.

Only supports Node.js and Python AWS Lambda runtimes.


## Console

You can monitor AWS Lambda using a consolidated [console](https://console.serverless.com/) provided by Serverless.

Features:
- Nonitoring automatically, with no code instrumentation required.
- Consolidated Metrics view for all of your AWS Lambda functions across AWS accounts, regions and more.
- Troubleshoot any invocation by querying rich tags that are automatically added by Serverless Console.
- Detailed Traces that provides information about what happened within your AWS Lambda invocation.
- Capture Errors, Warnings and more.
- Stream Logs and other telemetry instantly while you develop via the Dev Mode user interface.

To set up Serverless Console, run:
```sh
sls --console
```
