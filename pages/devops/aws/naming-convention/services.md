# Sevice Naming Convention

## Utility services

- Services that typically use or support other services
- Example: AWS Lambda, AWS CloudFormation, or AWS Data Pipeline
- Prefixed with `AWS`.

## Standalone services 

- Services that provide a core functionality or infrastructure
- Example: Amazon S3, Amazon EC2, or Amazon Redshift.
- Prefixed with `Amazon`.

This name convention not a strict rule. For example:
- Amazon API Gateway is prefixed with Amazon but is a utility service
- Amazon EBS is prefixed with Amazon but can only be used with Amazon EC2