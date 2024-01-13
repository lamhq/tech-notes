# CloudWatch Logs

## Overview

CloudWatch Logs is a tool that allows you to monitor, store, and access log files from a variety of different sources.

CloudWatch Logs can be used for real time application and system monitoring as well as long term log retention.

CloudWatch Logs metric filters can evaluate CloudTrail logs for specific terms, phrases, or values.

Can be exported to S3 (takes 21 hours).


## Features

- **Monitor logs from Amazon EC2 instances**. Monitors application and system logs and can trigger notifications.
- **Monitor CloudTrail Logged Events**. Alarms can be created in CloudWatch based on API activity captured by CloudTrail.
- **Log retention**. By default, logs are retained indefinitely. Configurable per log group from 1 day to 10 years.
- **Filter Patterns**: You can look for specific terms in your logs. Think 400 errors in your web server logs.
- **CloudWatch Logs Insights**: This allows vou to query all your logs using a SQL-like interactive solution.


## Terminologies

**Log event**: This is the record of what happened. It contains a timestamp and the data.

**Log stream**: A collection of log events from the same source creates a log stream. Think of one continuous set of logs from a single instance. *For example, logs for an EC2 instance are grouped together into a log stream that you can then filter or query for insights.*

**Log groups**: This is a collection of log streams. *For example, you would group all your Apache web server logs across hosts together.*


## CloudWatch Logs Agent

The CloudWatch Logs agent provides an automated way to send log data to CloudWatch Logs from Amazon EC2 instances or on-premises servers.

There is now a Unified CloudWatch agent that collects both logs and metrics.

The Unified CloudWatch agent includes metrics such as memory and disk utilization.

The Unified CloudWatch agent enables you to do the following:

- Collect more system-level metrics from Amazon EC2 instances across operating systems. The metrics can include in-guest metrics, in addition to the metrics for EC2 instances.
- Collect system-level metrics from on-premises servers. These can include servers in a hybrid environment as well as servers not managed by AWS.
- Retrieve custom metrics from your applications or services using the `StatsD` and `collectd` protocols.

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-cloudwatch-logs.jpeg)


## Other options

### Kinesis Firehose

For near real-time or persistent logs use Kinesis Firehose.

Use Firehose for any Firehose supported destinations.

### Kinesis Data Stream

For real-time use Lambda or Kinesis Data Stream with KCL consumers.
