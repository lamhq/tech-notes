# Amazon CloudWatch

## Overview

CloudWatch lets you collect, retrieve, and graph numeric performance metrics from AWS and non-AWS resources.

AWS services send metrics to CloudWatch, including:
- EC2 instance CPU utilization
- EBS volume read and write IOPS
- S3 bucket sizes
- DynamoDB consumed read and write capacity units
- Custom metrics from your applications
- ...

CloudWatch uses metrics to create graphs automatically that show how performance has changed over time.

CloudWatch Alarms can send you a notification or take an action based on the value of those metrics.

CloudWatch Logs lets you collect, store, view, and search logs from AWS and non- AWS sources

Use cases:
- Visualize logs and metrics with the AWS Management Console.
- Discover insights to keep your applications healthy.
- Troubleshoot issues.
- Set alarms to alert you when something's not right.
- Detect anomalous behavior in your environments.
- Take automated actions like scaling.


## Period

A period is the length of time associated with a specific Amazon CloudWatch statistic. Each statistic represents an aggregation of the metrics data collected for a specified period of time.

Periods are defined in numbers of seconds, and valid values for period are 1, 5, 10, 30, or any multiple of 60.

The default value is 60 seconds.


## Metrics

Each metric in CloudWatch has a timestamp and is organized into namespaces.

AWS services that send data to CloudWatch attach dimensions to each metric. A dimension is a name/value pair that is part of the metric's identity. You can use dimensions to filter the results that CloudWatch returns.

*For example, you can get statistics for a specific EC2 instance by specifying the InstanceId dimension when you search.*

Types of metrics are supported in CloudWatch:

### Default

These metrics are provided out of the box and do not require any additional work on your part to configure.

Examples:
- **CPU utilization**: how much of your virtual CPU resources are being utilized over a specified amount of time.
- **Network throughput**: how much data is going in/out of your particular resource.


### Custom

These metrics will need to be provided by using the **CloudWatch agent** installed on the host.

Your instances need connectivity and permission for the CloudWatch API.

Examples:
- **Memory utilization**: how much of your available memory
is actually being utilized on your instances.
- **Storage capacity**: for your elastic block store device

> Let's say for your application you wanted to record the number of page views your website gets. It's an application-level metric, meaning that it's not something the EC2 instance would post to CloudWatch by default. This is where custom metrics come in. 

Custom metrics allows you to publish your own metrics to CloudWatch (by programmatically sending the metric to CloudWatch using the `PutMetricData` API).

Other examples of custom metrics are: 

- Web page load times
- Request error rates
- Number of processes or threads on your instance
- Amount of work performed by your application

You can use high-resolution custom metrics to collect custom metrics  per second.


## CloudWatch Logs

CloudWatch Logs is a tool that allows you to monitor, store, and access log files from a variety of different sources. It gives you the ability to query your logs to look for potential issues or data that is relevant to you.

For **custom logs**, you use the **Amazon CloudWatch Agent**. The agent enables users to collect and monitor system and application metrics on their AWS instances and on-premises servers.

### Terminologies

**Log event**: This is the record of what happened. It contains a timestamp and the data.

**Log stream**: A collection of log events from the same source creates a log stream. Think of one continuous set of logs from a single instance. *For example, logs for an EC2 instance are grouped together into a log stream that you can then filter or query for insights.*

**Log groups**: This is a collection of log streams. *For example, you would group all your Apache web server logs across hosts together.*

### Features

- **Filter Patterns**: You can look for specific terms in your logs. Think 400 errors in your web server logs.
- **CloudWatch Logs Insights**: This allows vou to query all your logs using a SQL-like interactive solution.
- **Alarms**: Once you've identified your trends or patterns, it's time to set up alerts for them.


## CloudWatch Alarm

With CloudWatch, you can create alarms that automatically perform actions if the value of your metric has gone above or below a predefined threshold. 

> For example, suppose that your company’s developers use Amazon EC2 instances for application development or testing purposes. If the developers occasionally forget to stop the instances, the instances will continue to run and incur charges. 
>
> In this scenario, you could create a CloudWatch alarm that automatically stops an Amazon EC2 instance when the CPU utilization percentage has remained below a certain threshold for a specified period. When configuring the alarm, you can specify to receive a notification whenever this alarm is triggered.

An alarm has three possible states.

- **OK**: The metric is within the defined threshold. Everything appears to be operating like normal.
- **ALARM**: The metric is outside of the defined threshold. This could be an operational issue.
- **INSUFFICIENT_DATA**: The alarm has just started, the metric is not available, or not enough data is available for the metric to determine the alarm state.

An alarm can be triggered when it transitions from one state to another. Once an alarm is triggered, it can initiate an **action**. Actions can be an Amazon EC2 action, an Auto Scaling action, or a notification sent to Amazon Simple Notification Service (SNS).


## CloudWatch Dashboards


The CloudWatch dashboard feature enables you to access all the metrics for your resources from a single location. 

You can pull data from different Regions into a single dashboard in order to create a global view of your architecture.

> For example, you can use a CloudWatch dashboard to monitor the CPU utilization of an Amazon EC2 instance, the total number of requests made to an Amazon S3 bucket, and more.
>
> You can even customize separate dashboards for different business purposes, applications, or resources.
