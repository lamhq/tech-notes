# Lambda Insight

## Overview

Lambda Insights is an enhanced monitoring solution for Lambda functions.

It uses a Lambda extension to gather system level metrics and sends them to the CloudWatch service. CloudWatch passes the data and exposes theme for reporting, alarms, ...

Metrics also integrate into CloudWatch application insights for intelligent dashboards.


## Collected Metrics

- CPU system time & CPU user time
- Init duration: time spent in the initialization phase
- Memory utilization
- Number of sent and received bytes
- Number of threads used by the function process
- Ephemeral storage size and amount used


## Enabling Lambda Insights

You can enable Lambda Insights under **Monitoring and Operations Tools** section, turn on **Enhanced monitoring**.

Enabling enhanced monitoring in the console will:
- Add the Lambda Insights Extension layer.
- Add appropriate permissions to the function's execution role with `CloudWatchLambdaInsightsExecutionRolePolicy`

If using Infrastructure as Code, both steps need to be completed:
- adding permissions
- adding the Lambda Insights extension layer to the function

It can take up to 20 minutes for data to be displayed in CloudWatch.

You can set an environment variable `LAMBDA_INSIGHTS_LOG_LEVEL=info`to see internal logs from the extension.

Once the data is started to be collected in CloudWatch then you can use the CloudWatch Lambda Insights Console to see the data.


## Pricing

No direct cost for using Insights.

Any extra execution duration from using an extension will be charged (should be minimal).

CloudWatch will also cost for the stored metrics and logs. Metrics can add up fast as they have a monthly cost per metric.