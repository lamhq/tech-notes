# Dimensions

## Overview

A dimension further clarifies what the metric is and what data it stores.

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-cloudwatch-namespaces-and-dimensions.jpeg)

You can have up to 10 dimensions in one metric, and each dimension is defined by a name and value pair.


## Specify dimensions

How you specify a dimension is different when you use different commands:

- With `put-metric-data`, you specify each dimension as `MyName=MyValue`
- With `get-metric-statistics` or `put-metric-alarm` you use the format `Name=MyName`, `Value=MyValue`

If a single metric includes multiple dimensions, you must specify a value for every defined dimension when you use `get-metric-statistics`.
