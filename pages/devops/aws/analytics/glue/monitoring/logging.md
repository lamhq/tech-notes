# Logging

## Overview

When you start an AWS Glue job, it sends the real-time logging information to CloudWatch.

You can view the logs on the AWS Glue console or the CloudWatch console dashboard.

To view the logs, navigate to the `Runs` tabs, click on `Output logs` or `Error logs`.

![](https://playbook.hackney.gov.uk/Data-Platform-Playbook/assets/images/glue_run_details-520527963baa9712f891b41dff95b501.png)

The default log groups are as follows:
- `/aws-glue/jobs/logs/output` for output logs
- `/aws-glue/jobs/logs/error` for error logs

Each log group contains multiple log streams, corresponding to each job run. Name follows the format: `jr_<job_run_id>`.


## Output Logs

The output stream has the standard output (stdout) from your code.

Your application-specific messages will be logged to Output Logs.


## Error Logs

This is where you can find the details of job run's error.

Oldest log messages are on top.

You can quickly navigate to the error by typing `ERROR` or `Stack Trace` in the `Filter events` text box.

To have better view, you can click to the `Display` option and choose `View in plain text` .


## Reference

- [Running Spark ETL jobs with reduced startup times](https://docs.aws.amazon.com/glue/latest/dg/reduced-start-times-spark-etl-jobs.html#reduced-start-times-logging)
