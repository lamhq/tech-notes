# AWS Serverless Application Model

## Overview

AWS Serverless Application Model (AWS SAM) is an open-source framework designed to simplify the process of building and deploying serverless applications on AWS.

AWS SAM Framework use AWS SAM template (an extension of AWS CloudFormation) to define serverless application.

It provides the AWS SAM CLI that:
- simplifies project initialization with boilerplate codebases for different workloads
- emulates the AWS environment on your local machine, allows you to build, test, and debug locally
- supports transpiling TypeScript code into JavaScript (using `esbuild`)


## Pros

- Easy Deployment. Package and deploy application with a single command
- Support local testing for Lambda functions and API Gateway endpoints
- SAM template allows defining Infrastructure as Code (IaC), making infrastructure management more intuitive


## Cons

- Require knowledge of CloudFormation and SAM template
- Limited support for TypeScript. Cannot debug TypeScript code with IDE