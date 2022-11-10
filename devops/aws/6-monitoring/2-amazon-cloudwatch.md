# Amazon CloudWatch

## How CloudWatch Works

Amazon CloudWatch is a monitoring and observability service.

Many AWS services send metrics automatically to CloudWatch per 5-minute interval (basic monitoring). You can get more granularity by posting metrics every minute instead of every 5 minutes using a feature like detailed monitoring.

CloudWatch provides actionable insights into your applications, and enables you to respond to system-wide performance changes, optimize resource utilization, and get a unified view of operational health. This unified view is important. 

You can use CloudWatch to:

- Detect anomalous behavior in your environments.
- Set alarms to alert you when something’s not right.
- Visualize logs and metrics with the AWS Management Console.
- Take automated actions like scaling.
- Troubleshoot issues.
- Discover insights to keep your applications healthy.

## Metrics

Each metric in CloudWatch has a timestamp and is organized into containers called namespaces (you can think of them as belonging to different categories).

AWS services that send data to CloudWatch attach dimensions to each metric. A dimension is a name/value pair that is part of the metric’s identity. You can use dimensions to filter the results that CloudWatch returns.

*For example, you can get statistics for a specific EC2 instance by specifying the InstanceId dimension when you search.*


## Custom Metrics

Let’s say for your application you wanted to record the number of page views your website gets. It’s an application-level metric, meaning that it’s not something the EC2 instance would post to CloudWatch by default. This is where custom metrics come in. 

Custom metrics allows you to publish your own metrics to CloudWatch (by programmatically sending the metric to CloudWatch using the `PutMetricData` API).

Other examples of custom metrics are: 

- Web page load times
- Request error rates
- Number of processes or threads on your instance
- Amount of work performed by your application

You can use high-resolution custom metrics to collect custom metrics  per second.


## CloudWatch Dashboards

Once you’ve provisioned your AWS resources and they are sending metrics to CloudWatch, you can then visualize and review that data using the CloudWatch console with dashboards.

Dashboards are customizable home pages that you use for data visualization for one or more metrics through the use of widgets, such as a graph or text.

You can pull data from different Regions into a single dashboard in order to create a global view of your architecture.

You can also choose whether your metric widgets display live data. Live data is data published within the last minute that has not been fully aggregated.

You can control who has access to view or manage your CloudWatch dashboards through AWS Identity and Access Management (IAM) policies that get associated with IAM users, IAM groups, or IAM roles.


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


## CloudWatch Alarm

You can create CloudWatch alarms to automatically initiate actions based on sustained state changes of your metrics. You configure when alarms are triggered and the action that is performed. 

You first need to decide what **metric** you want to set up an alarm for, then you define the **threshold** at which you want the alarm to trigger. Next, you define the specified **time period** of which the metric should cross the threshold for the alarm to be triggered.

*For example, if you wanted to set up an alarm for an EC2 instance to trigger when the CPU utilization goes over a threshold of 80%, you also need to specify the time period the CPU utilization is over the threshold. You don’t want to trigger an alarm based on short temporary spikes in the CPU. You only want to trigger an alarm if the CPU is elevated for a sustained amount of time, for example if it is over 80% for 5 minutes or longer, when there is a potential resource issue.*

An alarm has three possible states.

- **OK**: The metric is within the defined threshold. Everything appears to be operating like normal.
- **ALARM**: The metric is outside of the defined threshold. This could be an operational issue.
- **INSUFFICIENT_DATA**: The alarm has just started, the metric is not available, or not enough data is available for the metric to determine the alarm state.

An alarm can be triggered when it transitions from one state to another. Once an alarm is triggered, it can initiate an **action**. Actions can be an Amazon EC2 action, an Auto Scaling action, or a notification sent to Amazon Simple Notification Service (SNS).


### Use CloudWatch Alarms to Prevent and Troubleshoot Issues

Let’s say you set up a metric filter for 500-error response codes.
 
Then, you define an alarm for that metric that will go into the ALARM state if 500-error responses go over a certain amount for a sustained time period.

Let’s say if it’s more than five 500-error responses per hour, the alarm should enter the ALARM state. 

Next, you define an action that you want to take place when the alarm is triggered. It makes sense to send an email or text alert to you so you can start troubleshooting the website, hopefully fixing it before it becomes a bigger issue.