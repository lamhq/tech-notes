# AWS Amplify

## Overview

AWS Amplify is a complete solution that offers tools for front-end web and mobile developers to quickly **build full-stack applications** on AWS.

## Products

Amplify provides the following independent products to build fullstack iOS, Android, Flutter, Web, and React Native apps:
- **Amplify Hosting** provides hosting for static and server-side rendered Next.js apps.
- **Amplify CLI**: Configure all the services needed to power your backend through a simple command line interface.
- **Amplify Libraries**: Client libraries to build common use cases such as Auth, data, and File Storage by connecting your frontend app to your backend resources.
- **Amplify Studio**: Build your fullstack web and mobile app using a simple and intuitive visual development environment.
- **Amplify UI Components**: UI libraries to build your frontend app built for React, React Native, Angular, Vue and Flutter.


## Architecture example

The following diagram outlines a few scenarios you could implement with Amplify. 

![Different Amplify implementations.](https://docs.amplify.aws/images/how-amplify-works/nextImageExportOptimizer/amplify-scenarios-opt-1920.WEBP)


## Pricing

### Free tier

Free for 12 months.

- **Build & Deploy**: No cost up to 1,000 build minutes per month 
- **Data Storage**: No cost up to 5 GB stored on CDN per month 
- **Data Transfer Out**: No cost up to 15 GB per month 
- **Request Count (SSR)**: No cost up to 500,000 requests per month
- **Request Duration (SSR)**: No cost up to 100 GB-hours per month


### Pay-as-You-Go
Once you exceed the free tier limits, Amplify switches to pay-as-you-go pricing.

The following AWS backend services are offered on the AWS free tier and pay-as-you-go basis:
- **API Gateway**
- **AppSync**
- **CloudFront**
- **Cognito**
- **DynamoDB**
- **Elasticsearch**
- **Kinesis** (pay-as-you-go only)
- **Lambda**
- **Lex**
- **Location Service**
- **Pinpoint**
- **Rekognition**
- **S3**

Here are the pay-as-you-go rates:
- **Build & Deploy**: $0.01 per minute
- **Data Storage**: $0.023 per GB per month (recurs until the app is deleted)
- **Data Transfer Out**: $0.15 per GB served
- **Request Count (SSR)**: $0.30 per 1 million requests
- **Request Duration (SSR)**: $0.20 per hour (GB-hour)

No flat fee per user; includes multiple sites per project and public SSL certificates at no extra cost.


### Pricing Examples

These examples are applied outside the free tier:
- Example 1: Suppose you build and deploy an app for 1 hour (60 minutes). The cost would be $0.01.
- Example 2: If your app stores 10 GB of data on the CDN for a month, the cost would be $0.23.
