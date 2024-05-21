# Job bookmarks

## Overview

AWS Glue tracks data that has already been processed during a previous run of an ETL job by persisting state information (job bookmark) from the job run.

A job bookmark is composed of states for various elements of jobs, such as sources, transformations, and targets.

*For example, your ETL job might read new partitions in an Amazon S3 file. AWS Glue tracks which partitions the job has processed successfully to prevent duplicate processing and duplicate data in the job's target data store.*

Job bookmarks are implemented for:
- JDBC data sources
- the Relationalize transform
- some Amazon S3 sources.

You can't use job bookmarks with Python shell jobs.


## How it works

### Amazon S3 Input Sources

AWS Glue job bookmarks use the last modified time on objects to identify data that requires reprocessing.

Modified files since the previous job run are automatically reprocessed.

#### JDBC Sources

- For each table, AWS Glue uses one or more columns as **bookmark keys** to determine new and processed data.
- AWS Glue by default uses the primary key as the bookmark key
- You can specify the columns to use as bookmark keys in your AWS Glue script


## Using job bookmarks

To use job bookmark, pass job bookmark option as a parameter when the job is started.

Parameter name: `--job-bookmark-option`

Values: `job-bookmark-enable`, `job-bookmark-disable`, `job-bookmark-pause`


## Rewind job bookmarks

You can rewind your job bookmarks for your AWS Glue Spark ETL jobs to any previous job run.

If you intend to reprocess all the data using the same job, you can reset the job bookmark.


## Best practices

Do not change the data source property with the bookmark enabled.

Use a catalog table with bookmarks for better partition management.

Use the AWS Glue Amazon S3 file lister for large datasets.
