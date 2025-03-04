# Deployment Strategies

## Zip Files

You need to add the application code and dependencies to a `.zip` archive.

*Note: the AWS SDK library is available in Lambda execution environment by default, no need to package it.*

Then you can upload to the console directly, through an S3 bucket (if more than 50MB) or through the AWS CLI.

Simple and great for experimentation in a development environment.

Not recommended for production environments - unless managed via other tooling.

An example shell command to create the zip file for code in `src/functions` directory:
```sh
(cd src/functions/ && zip -r ../../function_code.zip .)
```


## Container Images

Container can run locally and will run in the Lambda service as-is.

Supports up to a 10 GB image.

Can use custom base images and custom runtimes.

The container image must be added to Amazon ECR, and the Lambda service references this.


## Amazon CodeDeploy

Amazon CodeDeploy is an AWS service to automate deployments.

Supports many locations such as EC2 and Elastic Container Service, as well as Lambda.

Has deployment history, health tracking, rollback options, and more

Fully managed by AWS.

Works in conjunction with other deployment services like CodePipeline

It allows building, linting, testing, and deployments to multiple environments.

CodeDeploy has different deployment options for AWS Lambda
that makes use of versions and aliases:
- Canary: shifts X percent of traffic and then shifts the remaining traffic after X minutes
- Linear: Shifts X percent of traffic every X minutes, stop and reverse if any issues are found
- All At Once: All traffic moves to the new version immediately


## Infrastructure as code

- CloudFormation: an AWS service that uses templates to create, configure, and delete resources in AWS
- AWS Serverless Application Model (SAM): a toolkit for managing Serverless applications on AWS, base on CloudFormation, use SAM syntax.
  - SAM CLI can be used to manage template and building and invocke functions locally.
  - Capable to watch for changes locally and automatically synchronize them to an AWS account
- AWS Cloud Development Kit (CDK):
  - Define your infrastructure with your favorite programming language
  - Compiles down to CloudFormation templates
  - Use high-level constructs that contain sensible defaults and patterns
  - Combine function code and infrastructure code in one repository, one IDE, and one workflow
  - The CDK CLI can initialize projects as well as deploy, diff, delete, watch, and more.