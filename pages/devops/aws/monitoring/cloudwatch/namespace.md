# Namespace

A namespace is a container for CloudWatch metrics.

Metrics in different namespaces are isolated from each other (it helps metrics from different applications not being mistakenly aggregated into the same statistics).

The following table provides some examples of namespaces for several AWS services:

| Service                | Namespace            |
|------------------------|----------------------|
| Amazon API Gateway     | AWS/ApiGateway       |
| Amazon CloudFront      | AWS/CloudFront       |
| AWS CloudHSM           | AWS/CloudHSM         |
| Amazon CloudWatch Logs | AWS/Logs             |
| AWS CodeBuild          | AWS/CodeBuild        |
| Amazon Cognito         | AWS/Cognito          |
| Amazon DynamoDB        | AWS/DynamoDB         |
| Amazon EC2             | AWS/EC2              |
| AWS Elastic Beanstalk  | AWS/ElasticBeanstalk |
