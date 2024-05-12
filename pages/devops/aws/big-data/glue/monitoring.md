# Monitoring AWS Glue job

## Overview

AWS Glue provides Spark UI, and CloudWatch logs and metrics for monitoring your AWS Glue jobs.

You can get information about AWS Glue job's execution:
- Line number of your AWS Glue job script that had a failure.
- Spark action that executed last in the Spark query plan just before the failure of your job.
- Spark exception events related to the failure presented in a time-ordered log stream.
- Root cause analysis and recommended action to fix the issue.
- Common Spark events with a recommended action that addresses the root cause.
