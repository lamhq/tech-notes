# Logging and Auditing

You can record the actions that are taken by users, roles, or AWS services on Amazon S3 resources and maintain log records for auditing and compliance purposes.

AWS recommend that you use **AWS CloudTrail** for logging bucket and object-level actions for your Amazon S3 resources.

**Server access logging** provides detailed records for the requests that are made to a bucket.

You must not set the bucket being logged to be the destination for the logs as this creates a logging loop and the bucket will grow exponentially.