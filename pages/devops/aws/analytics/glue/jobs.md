# Working with Spark jobs

## AWS Glue version

You can configure the AWS Glue version parameter when you add or update a job. 

The AWS Glue version determines the versions of Apache Spark and Python that AWS Glue supports.

- AWS Glue 4.0: Spark 3.3.0, Python 3.10, Java 8
- AWS Glue 3.0: Spark 3.1.1, Python 3.7, Java 8
- AWS Glue 2.0 (deprecated): Spark 2.4.3, Python 3.7

Check [available AWS Glue versions](https://docs.aws.amazon.com/glue/latest/dg/release-notes.html#release-notes-versions) for more details.

Check the [list of Python modules provided in AWS Glue version 2.0](https://docs.aws.amazon.com/glue/latest/dg/reduced-start-times-spark-etl-jobs.html#reduced-start-times-python-modules).


## Logging behavior

Support different logging behavior:
- Separate streams for drivers and executors
- For each driver and executor, there are two streams: the Output stream and the Error stream.

Check [documentation of logging](https://docs.aws.amazon.com/glue/latest/dg/reduced-start-times-spark-etl-jobs.html#reduced-start-times-logging) for the format of log stream and log group name.


## Job parameters
When creating a AWS Glue job, you can provide configuration information through **Job Parameters**.

Run a job and use `--arguments` to set a job parameter:
```sh
aws glue start-job-run --job-name "CSV to CSV" \
--arguments='--scriptLocation="s3://my_glue/libraries/test_lib.py"'
```

You can access job parameter values in AWS Glue scripts.

Suppose that you created a JobRun in a Lambda function:
```py
response = client.start_job_run(
  JobName = 'my_test_Job',
  Arguments = {
    '--day_partition_key':   'partition_0',
    '--hour_partition_key':  'partition_1',
    '--day_partition_value':  day_partition_value,
    '--hour_partition_value': hour_partition_value 
})
```

To retrieve the arguments that are passed, you can use the `getResolvedOptions` function as follows:
```py
import sys
from awsglue.utils import getResolvedOptions

args = getResolvedOptions(sys.argv, [
  'JOB_NAME',
  'day_partition_key',
  'hour_partition_key',
  'day_partition_value',
  'hour_partition_value'
])
print "The day-partition key is: ", args['day_partition_key']
print "and the day-partition value is: ", args['day_partition_value']
```

Check [`getResolvedOptions` documentation](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-crawler-pyspark-extensions-get-resolved-options.html) for more details.

View the list of [pre-defined job parameters](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-glue-arguments.html#job-parameter-reference) that you can use to set up the script environment for your jobs and job runs.


## Job properties

When you define your job on the AWS Glue console, you provide values for properties to control the AWS Glue runtime environment.

Common properties of a Spark job:
- Name
- IAM Role: the IAM role that is used for authorization to resources used to run the job and access data stores.
- Type: The type of ETL job (Spark, Spark Streaming, Python shell)
- AWS Glue version
- Worker type: 
  - G.1X: Each worker maps to 1 DPU
  - G.2X: Each worker maps to 2 DPU
  - ...
- Requested number of workers
- Language: programming language of the ETL script. Python or Scala.
- Temporary path: the location of a working directory in Amazon S3 where temporary intermediate results are written when AWS Glue runs the script.
- Job parameters override
- Maximum concurrency: maximum number of job that run concurrently
- Number of retries
- Job timeout
- Job bookmark
- Continuous logging

Check the full list of [job properties](https://docs.aws.amazon.com/glue/latest/dg/add-job.html#create-job).


## Job's Lifecycle

![](https://docs.aws.amazon.com/images/glue/latest/dg/images/job-state-diagram.png)