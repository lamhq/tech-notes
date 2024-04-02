# AWS AppSync

## Overview

AWS AppSync is a fully managed serverless GraphQL service for real-time data queries, synchronization, communications and offline programming features.

Keywords: GraphQL, fetching app data, declarative coding, frontend app data fetching.


## Features

Publish real-time data updates to your applications through subscriptions.

Access data from one or more data sources from a single GraphQL API endpoint (Amazon DynamoDB, AWS Lambda, ...).

Combine multiple source GraphQL APIs into a single, merged GraphQL API.

Leverage built-in security, monitoring, logging, tracing, caching for low latency.

Support JavaScript and TypeScript.

Security:
- Restrict API access through an associated VPC endpoint (VPCE)
- Integrate with AWS WAF

Authorization, support:
- API keys
- IAM
- Amazon Cognito
- OpenID Connect providers
- Lambda authorization for custom logic


## Pricing

Pay-as-you-go for API requests and delivered real-time messages.


## References

- [Developer Guide](https://docs.aws.amazon.com/appsync/latest/devguide/what-is-appsync.html)