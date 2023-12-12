# S3 Event Notifications

## Overview

You can use the Amazon S3 Event Notifications feature to receive notifications when certain events happen in your S3 bucket.

For example, S3 notification can be set up to notify you when objects are restored from Glacier to S3.


## Supported event types

- New object created events
- Object removal events
- Restore object events
- Reduced Redundancy Storage (RRS) object lost events
- Replication events
- S3 Lifecycle expiration events
- S3 Lifecycle transition events
- S3 Intelligent-Tiering automatic archival events
- Object tagging events
- Object ACL PUT events


## Destinations

Amazon S3 can send event notification messages to the following destinations:

- Amazon Simple Notification Service (Amazon SNS) topics
- Amazon Simple Queue Service (Amazon SQS) queues
- AWS Lambda function
- Amazon EventBridge