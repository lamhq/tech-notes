# Backing up Data with S3 Replication

## Overview

- You can replicate objects from one bucket to another (same region or cross region).
- Versioning must be enabled on both the source and destinationsuckers
- Objects in an existing bucket are not replicated automatically.
- Once replication is turned on, all subsequent updated objects will be replicated automatically.
- Delete markers are not replicated by default.

## Instructions

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