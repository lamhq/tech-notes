# Continuous logging

## Overview
The continuous logging feature includes the following capabilities:
- Continuous logging
- A custom script logger to log application-specific messages
- A console progress bar to track the running status of the current AWS Glue job


## Enable continuous logging

- AWS Glue console, select a Job
- In the **Job details** tab, expand the **Advanced properties** section
- Under **Continuous logging** select **Enable logs in CloudWatch**.

Note: to make the log appear, do not specify a custom log group name (with parameter `--continuous-log-logGroup`)


## Writting application log

To log application-specific messages, use the custom script logger:
```py
from awsglue.context import GlueContext
from pyspark.context import SparkContext

sc = SparkContext.getOrCreate()
glueContext = GlueContext(sc)
logger = glueContext.get_logger()
logger.info("info message")
logger.warn("warn message")
logger.error("error message")
```

To enable the progress bar to show job progress, initialize `glueContext` in the job script:
```py

import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job
import time

## @params: [JOB_NAME]
args = getResolvedOptions(sys.argv, ['JOB_NAME'])

sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)

...
...
code-to-profile
...
...


job.commit()
```


## Viewing log

To view real-time logs using the AWS Glue console dashboard:
- When you start running a job, you navigate to a page that contains information about the running job
- The **Continuous logging** tab shows a real-time progress bar when the job is running with glueContext initialized.

To access the log group, in **Continuous logging** tab, click **Driver and executor log streams** link. You can filter application log using the keyword: `GlueLogger`.

To view error logs, in **Run details** tab, click **Error logs** link in **Cloudwatch logs** section.

The default log groupname for continuous logging is `/aws-glue/jobs/logs-v2`.