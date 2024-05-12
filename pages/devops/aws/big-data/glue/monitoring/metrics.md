# Metrics

## Metrics available in AWS Glue Studio


Some of the key metrics include:
- **Driver Memory Usage**: Indicates how much memory the driver process is using.
- **Executor Memory Usage**: Shows memory usage by executor processes.
- **Task Execution Time**: Measures the time taken by individual tasks.
- **Shuffle Read/Write Metrics**: Tracks data shuffling between stages.
- **Input/Output Metrics**: Provides information about data read and written.
- **Garbage Collection Metrics**: Monitors JVM garbage collection.
- **Job Execution Status**: Indicates whether the job succeeded, failed, or was canceled.


## Accessing Metrics
   
- In AWS Glue Studio, navigate to your job.
- Click on the **Metrics** tab to view the available metrics.
- You can also set up CloudWatch Alarms to receive notifications based on specific metric thresholds.


## Optimizing Performance
Methods to optimize your Spark jobs:
- Adjust memory settings based on memory usage metrics.
- Optimize data shuffling to reduce shuffle read/write times.
- Monitor task execution time to identify slow tasks.
- Tune the number of executors and cores for optimal resource utilization.
