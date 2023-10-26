# Amazon CloudWatch

## Overview

Amazon CloudWatch is a web service that enables you to monitor and manage various metrics and configure alarm actions based on data from those metrics.

AWS services send metrics to CloudWatch. CloudWatch then uses these metrics to create graphs automatically that show how performance has changed over time.

You can use CloudWatch to:

- Detect anomalous behavior in your environments.
- Set alarms to alert you when something's not right.
- Visualize logs and metrics with the AWS Management Console.
- Take automated actions like scaling.
- Troubleshoot issues.
- Discover insights to keep your applications healthy.

## CloudWatch Alarm

With CloudWatch, you can create 
alarms  that automatically perform actions if the value of your metric has gone above or below a predefined threshold. 

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


## CloudWatch Logs

CloudWatch Logs can monitor, store, and access your log files from applications running on Amazon EC2 instances, AWS Lambda functions, and other sources.

CloudWatch Logs allows you to query and filter your log data. 

*With AWS Lambda, all you need to do is give the Lambda function the correct IAM permissions to post logs to CloudWatch Logs.* 

*If you want to send your application logs from an EC2 instance into CloudWatch Logs, you need to first install and configure the CloudWatch Logs agent on the EC2 instance.*


### CloudWatch Logs Terminology

**Log event**: A log event is a record of activity recorded by the application or resource being monitored, and it has a timestamp and an event message.

**Log stream**: Log events are then grouped into log streams, which are sequences of log events that all belong to the same resource being monitored.

*For example, logs for an EC2 instance are grouped together into a log stream that you can then filter or query for insights.*

**Log groups**: Log streams are then organized into log groups. A log group is composed of log streams that all share the same retention and permissions settings.

*For example, if you have multiple EC2 instances hosting your application and you are sending application log data to CloudWatch Logs, you can group the log streams from each instance into one log group. This helps keep your logs organized.*


## Metrics

Each metric in CloudWatch has a timestamp and is organized into containers called namespaces.

AWS services that send data to CloudWatch attach dimensions to each metric. A dimension is a name/value pair that is part of the metric's identity. You can use dimensions to filter the results that CloudWatch returns.

*For example, you can get statistics for a specific EC2 instance by specifying the InstanceId dimension when you search.*


## Custom Metrics

Let's say for your application you wanted to record the number of page views your website gets. It's an application-level metric, meaning that it's not something the EC2 instance would post to CloudWatch by default. This is where custom metrics come in. 

Custom metrics allows you to publish your own metrics to CloudWatch (by programmatically sending the metric to CloudWatch using the `PutMetricData` API).

Other examples of custom metrics are: 

- Web page load times
- Request error rates
- Number of processes or threads on your instance
- Amount of work performed by your application

You can use high-resolution custom metrics to collect custom metrics  per second.
