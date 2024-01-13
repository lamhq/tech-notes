# CloudWatch Alarm

## Overview

You can use an alarm to automatically initiate actions on your behalf.

An alarm watches a single metric over a specified time period, and performs one or more specified actions, based on the value of the metric relative to a threshold over time.


Actions can be:
- an Amazon EC2 action
- an Auto Scaling action
- a notification sent to Amazon SNS.

You can add alarms to dashboards.

You can create a billing alarm in CloudWatch.


## Example

Suppose that your company's developers use Amazon EC2 instances for application development or testing purposes.

If the developers occasionally forget to stop the instances, the instances will continue to run and incur charges. 

In this scenario, you could create a CloudWatch alarm that automatically stops an Amazon EC2 instance when the CPU utilization percentage has remained below a certain threshold for a specified period.

When configuring the alarm, you can specify to receive a notification whenever this alarm is triggered.


## Alarm states

An alarm has three possible states.

- **OK**: The metric is within the defined threshold. Everything appears to be operating like normal.
- **ALARM**: The metric is outside of the defined threshold. This could be an operational issue.
- **INSUFFICIENT_DATA**: The alarm has just started, the metric is not available, or not enough data is available for the metric to determine the alarm state.
