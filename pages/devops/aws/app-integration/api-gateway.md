# Amazon API Gateway

## Overview

Amazon API Gateway is a fully managed service that allows you to easily publish, create, maintain, monitor, and secure your API.

Features:
- Support WebSocket Protocol
- Handle API versioning (v1, v2...)
- Handle different environments (dev, test, prod...)
- Handle security (Authentication and Authorization)
- Support API keys and Usage Plans, quota management
- Handle request throttling
- Allow importing and exporting Swagger / Open API to quickly define APIs
- Can transform and validate requests and responses
- Generate SDK and API specifications
- Cache API responses

Allow creating 3 types of API:
- **REST API**: allow you to create and leverage things like API keys, per-client throttles, requests validation, Web application firewall (WAF) integration.
- **HTTP API**: simpler option than REST API, cheaper, minimal features.
- **WebSocket API**: collection of WebSocket routes, integrated with Lambda functions, HTTP endpoints, other AWS services.

The maximum amount of time that an API gateway can perform any request is 29 seconds.

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-api-gateway-overview.jpeg)


## Domain

API Gateway use HTTPS endpoints only.

By default API Gateway assigns an internal domain that automatically uses the API Gateway certificates.

To use custom domain names:
- You must set up a CNAME or A-alias record in Route53
- You can provide the certificate through integration with AWS Certificate Manager.
- If using Edge-Optimized endpoint, then the certificate must be in `us-east-1`
- If using Regional endpoint, the certificate must be in the API Gateway's region


## CORS

CORS must be enabled if client want to be able to call your API from another domain.

To enable CORS in Amazon API Gateway:
1. Sign in to the [API Gateway console](https://console.aws.amazon.com/apigateway).
2. Choose the API you want to enable CORS for.
3. Under the **Resources** section, click on **Actions** and then **Enable CORS**.
4. In the **Enable CORS** dialog box, you can specify the allowed origins, headers, and methods. For example:
     - **Access-Control-Allow-Origin**: `*` (to allow all origins) or specify a particular origin.
     - **Access-Control-Allow-Headers**: `Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token`.
     - **Access-Control-Allow-Methods**: `GET,POST,OPTIONS`.
5. deploy the API to make the changes effective.


## Integrating with other AWS Services

### AWS Lambda
- Can API Gateway invoke Lambda function to create a serverless REST API backed by AWS Lambda
- It's an easy way to expose Lambda function to outside world

### HTTP

- API Gateway can sit in front of any HTTP endpoints in the backend.
- It could be: an internal HTTP API on-premises or an Application Load Balancer.
- Benefit: allows leveraging API Gateway's features (rate limiting, caching, authentication, API keys, ...).

### AWS WAF
AWS WAF can be used to protect against DDoS and layer 7 attacks when placed in front of your API.

### AWS Service

- You can expose any AWS service through the API Gateway.
- Example: start an AWS Step Function workflow, post a message to SQS.
- Benefits: expose services to the public, leveraging API Gateway's features.
