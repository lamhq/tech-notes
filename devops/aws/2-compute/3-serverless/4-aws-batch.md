# AWS Batch

## Overview

AWS Batch is a managed service, allow you to create/run batch computing workload within AWS (run on EC2 or Fargate).

Removes any heavy lifting for configuration and management of infrastructure required for computing.

Automatically scale to an accurately-sized infrastructure
based on the number of submitted jobs and optimizes the distribution of workloads.

No Install Required. Skip installation and maintenance of batch computing software, so you can focus on obtaining and analyzing the results.


## Components

- **Jobs**: Units of work that are submitted to
AWS Batch (e.g., shell scripts, executables, and Docker images).
- **Job Definitions**: Specify how your jobs are to be run (essentially, the blueprint for the resources in the job)
- **Job Queues**: Jobs get submitted to specific queues and reside there until scheduled to run in a compute environment
- **Compute Environment**: Set of managed or unmanaged compute
resources used to run your jobs


## Fargate vs EC2 (for compute environment)

### Fargate

- Recommended approach for MOST workloads
- Require fast start times (< 30 seconds)
- Require 16 vCPU or less
- Require no GPUs
- Require 120 GiB of memory or less

### EC2

- Need more control over instance selection
- Require GPUs
- Require Elastic Fabric Adapter
- Require custom AMIs
- High levels of concurrency
- Require access to Linux Parameters


## AWS Batch vs AWS Lambda

- **Time Limits**: Lambda currently has a 15-minute execution time limit. Batch does not have this.
- **Disk Space**: AWS Lambda has limited disk space. If use EFS, it requires functions live within a VPC.
- **Run time**: Lambda has limited runtimes. Batch uses Docker, so any runtime can be used.


## Architecture example

An S3 event is triggered when a user uploads a large CSV file that needs to be processed within the application.

The S3 event is configured to trigger a Lambda function, which submits a job to a queue within the batch service.

The batch compute environment and the job can pull a custom Docker image required to process the large document.

The compute environment can reference the object and the bucket using the job configuration that was sent and process data in different steps.

Once complete, the Batch service can run a batch write item command to store the processed data in a DynamoDB table.

![](images/batch-arch.png)