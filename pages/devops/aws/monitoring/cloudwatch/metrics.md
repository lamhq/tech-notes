# Cloudwatch Metrics

## Overview

A metric represents a time-ordered set of data points that are published to CloudWatch.

Many AWS services send metrics to CloudWatch (free). You can also send your own custom metrics to CloudWatch (not free).

Metrics exist within a region.

Metrics cannot be deleted but automatically expire after 15 months.

Metrics can be either at standard or high resolution.

Metrics are identified by name, namespace, and dimensions.

A dimension is a name/value pair that is part of the metric's identity. You can use dimensions to filter the results that CloudWatch returns.

> For example, you can get statistics for a specific EC2 instance by specifying the `InstanceId` dimension when you search.


## Period

A period is the length of time associated with a specific Amazon CloudWatch statistic.

Each statistic represents an aggregation of the metrics data collected for a specified period of time.

Periods are defined in numbers of seconds, and valid values for period are 1, 5, 10, 30, or any multiple of 60.

The default value is 60 seconds.


## Default Metrics

**CPU utilization**: how much of your virtual CPU resources are being utilized over a specified amount of time.

**Network throughput**: how much data is going in/out of your particular resource.


## Custom Metrics

You can publish your own metrics to CloudWatch using the AWS CLI or an API.

You can view statistical graphs of your published metrics with the AWS Management Console.

CloudWatch stores data about a metric as a series of data points.

Each data point has an associated time stamp.

You can even publish an aggregated set of data points called a statistic set.

Examples of custom metrics: 
- Web page load times
- Request error rates
- Number of processes or threads on your instance
- Amount of work performed by your application


### EC2 instance metrics

These metrics will need to be provided by using the **CloudWatch Agent** installed on the host.

Your instances need connectivity and permission for the CloudWatch API.

Metrics included:
- **Memory utilization**: how much of your available memory is actually being utilized on your instances.
- **Storage capacity**: for your elastic block store device


### High-Resolution Metrics

You can use high-resolution custom metrics to collect custom metrics per second.

Each metric belongs to one of the following types:

- **Standard resolution**, with data having a one-minute granularity
- **High resolution**, with data at a granularity of one second

Metrics produced by AWS services are standard resolution by default.

When you publish a custom metric, you can define it as either standard resolution or high resolution.

When you publish a high-resolution metric, CloudWatch stores it with a resolution of 1 second, and you can read and retrieve it with a period of 1 second, 5 seconds, 10 seconds, 30 seconds, or any multiple of 60 seconds.

High-resolution metrics can give you more immediate insight into your application’s sub-minute activity.

Calling `PutMetricData` API more often on a high-resolution metric can lead to higher charges.

If you set an **alarm** on a high-resolution metric, you can specify a high-resolution alarm with a period of 10 seconds or 30 seconds, or you can set a regular alarm with a period of any multiple of 60 seconds.