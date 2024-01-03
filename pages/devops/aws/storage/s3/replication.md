# Replication

## Overview

You can replicate objects from one bucket to another (same region or cross region).

Cross Region Replication requires versioning to be enabled on the source and destination buckets.

Once replication is turned on, existing objects are not replicated, all subsequent updated objects will be replicated automatically.

Delete markers are not replicated by default.

You can set up replication at a bucket level, a shared prefix level, or an object level (by using Amazon S3 object tags).


## Use Cases

**Compliance**: Amazon S3 stores your data across multiple geographically distant Availability Zones by default. However, compliance requirements might require you to store data at even greater distances. You can use CRR to replicate data between distant AWS Regions to satisfy these requirements.

**Latency performance**: If your customers or end users are distributed across one or more geographic locations, you can minimize latency for data access by maintaining multiple object copies in AWS Regions that are geographically closer to your customers.

**Regional efficiency**: If you have compute clusters in two or more AWS Regions that analyze the same set of objects, you might choose to maintain object copies in all of those AWS Regions.


## How to do?

To enable S3 replication in the AWS Management Console, follow these steps:

1. Open the Amazon S3 console.
2. Choose the source bucket that you want to replicate.
3. Choose the **Management** tab and then choose **Replication**.
4. Choose **Add rule**.
5. In the **Add replication rule** dialog box, specify the following:
    - **Name**: A name for the replication rule.
    - **Source**: The source bucket that you want to replicate.
    - **Destination**: The destination bucket where you want to replicate objects.
    - **Storage class**: The storage class of the replicated objects.
    - **Replication time control**: The frequency with which you want Amazon S3 to replicate objects.
    - **IAM role**: The IAM role that Amazon S3 can assume to replicate objects on your behalf.

In the confirmation dialog, you can choose to replicate existing objects.