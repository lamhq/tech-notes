# Continuous logging

The continuous logging feature includes the following capabilities:
- Continuous logging
- A custom script logger to log application-specific messages
- A console progress bar to track the running status of the current AWS Glue job

To enable continuous logging:
- AWS Glue console, select a Job
- In the **Job details** tab, expand the **Advanced properties** section
- Under **Continuous logging** select **Enable logs in CloudWatch**.

To log application-specific messages, use the custom script logger:
```py
from awsglue.context import GlueContext
from pyspark.context import SparkContext

sc = SparkContext()
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


To view real-time logs using the AWS Glue console dashboard:
- When you start running a job, you navigate to a page that contains information about the running job
- The **Continuous logging** tab shows a real-time progress bar when the job is running with glueContext initialized.