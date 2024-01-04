# S3 Event Notifications

## Overview

You can use the Amazon S3 Event Notifications feature to receive notifications when certain events happen in your S3 bucket.

*For example, S3 notification can be set up to notify you when objects are restored from Glacier to S3.*


## Destinations

Notification can be sent to:
- Amazon SNS topics
- Amazon SQS queues
- AWS Lambda function
- Amazon EventBridge

Need to grant Amazon S3 permissions to:
- post messages to an Amazon SNS topic / Amazon SQS queue.
- invoke an AWS Lambda function


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
