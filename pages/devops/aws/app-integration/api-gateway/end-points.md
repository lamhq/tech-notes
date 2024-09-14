# Endpoint types

There're 3 ways to deploy your API Gateway, called endpoint types.

An API endpoint type is a hostname for an API in API Gateway that is deployed to a specific region.

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-api-gateway-endpoint-types.jpeg)


## Edge-Optimized Endpoint (default)

Requests are routed to the nearest CloudFront Edge locations (improve latency).

Any custom domain name that you use for an edge-optimized API applies across all regions.

Edge-optimized APIs capitalize the names of HTTP headers

Best for geographically distributed clients.


## Regional Endpoint

Intended for clients in the same region.

You can combine with your CloudFront distributions to have the same result with Edge-Optimized but more control over distribution location and caching strategies.

If you deploy a regional API in multiple regions, it can have the same custom domain name in all regions.

You can use custom domains together with Amazon Route 53 to perform tasks such as latency-based routing.


## Private Endpoint

Can only be accessed from your VPC using an interface VPC endpoint (ENI).

You use a resource policy to define access to your API Gateway.