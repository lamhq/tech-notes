# Statistics

Statistics are metric data aggregations over specified periods of time.

CloudWatch provides statistics based on the metric data points provided by your custom data or provided by other AWS services to CloudWatch.

## Minimum

The lowest value observed during the specified period. You can use this value to determine low volumes of activity for your application.


## Maximum

The highest value observed during the specified period. You can use this value to determine high volumes of activity for your application.


## Sum

All values submitted for the matching metric added together. This statistic can be useful for determining the total volume of a metric.


## Average

The value Sum/SampleCount during the specific period. By comparing this statistic with the Minimum and Maximum you can determine the full scope of a metric and how close the average is to the Minimum and Maximum. This comparison helps you know when to increase or decrease your resources as needed.


## SampleCount

The count (number) of data points used for the statistical calculation.


## pNN.NN

The value of the specified percentile.

You can specify and percentile using up to two decimal places (e.. p45.45).

Percentile statistics are not available for metric that include negative values.
