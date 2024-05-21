# AWS Glue job run insights

The AWS Glue job run insights feature is available for AWS Glue versions 2.0, 3.0, and 4.0.

You can enable job run insights through AWS Glue Studio by selecting the **Generate job insights** option.

![](https://docs.aws.amazon.com/images/glue/latest/dg/images/monitor-job-run-insights-1.png)


## Accessing Cloudwatch log

With the job run insights feature enabled, there may be two log streams created when a job run fails:
- Exception analysis log stream
- Rule-based insights stream

If your job finishes successfully, neither of the streams will be generated.

Without the job run insights feature, as the job fails, you only see an ambiguous message that limits your debugging experience:

```
An error occurred while calling o111.collectToPython. Traceback (most recent call last):
```


### Exception analysis log stream

Name: `<job-run-id>-job-insights-rca-driver`.

Provides:
- Line number of your AWS Glue job script that caused the failure.
- Spark action that executed last in the Spark query plan (DAG).
- Concise time-ordered events from the Spark driver and executors that are related to the exception.

![](https://docs.aws.amazon.com/images/glue/latest/dg/images/monitor-job-run-insights-3.png)


### Rule-based insights stream

- Root cause analysis and recommendations on how to fix the errors.
- Relevant Spark events serving as the basis for root cause analysis and a recommended action.

![](https://docs.aws.amazon.com/images/glue/latest/dg/images/monitor-job-run-insights-4.png)