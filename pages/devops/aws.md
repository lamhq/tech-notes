# AWS

## What is AWS?

AWS is cloud computing provider.


## Interacting with AWS

In AWS, you can make API calls to services and resources through:

- **The AWS Management Console (web-based console)**: includes wizards and automated workflows that can simplify the process of completing tasks.
- **AWS Console mobile**: monitoring resources, viewing alarms, and accessing billing information
- **The AWS Command Line Interface (CLI)**: control multiple AWS services directly from the command line.
- **The AWS Software Development Kits (SDKs)**: use AWS services through an API designed for your programming language or platform.
- **AWS Elastic Beanstalk**: you provide code and configuration settings, Elastic Beanstalk perform : Adjust capacity, Load balancing, Automatic scaling, Application health monitoring
- **AWS Cloudformation**: treat your infrastructure as code. Enabling you to frequently build your infrastructure and applications without having to perform manual actions or write custom scripts.


## Sevice naming convention

### Utility services

- Services that typically use or support other services
- Example: AWS Lambda, AWS CloudFormation, or AWS Data Pipeline
- Prefixed with `AWS`.

### Standalone services 

- Services that provide a core functionality or infrastructure
- Example: Amazon S3, Amazon EC2, or Amazon Redshift.
- Prefixed with `Amazon`.

This name convention not a strict rule. For example:
- Amazon API Gateway is prefixed with Amazon but is a utility service
- Amazon EBS is prefixed with Amazon but can only be used with Amazon EC2