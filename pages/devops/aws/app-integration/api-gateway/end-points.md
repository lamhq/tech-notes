# Endpoint types

An API endpoint type is a hostname for an API in API Gateway that is deployed to a specific region.

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-api-gateway-endpoint-types.jpeg)


## Edge-Optimized Endpoint

- Requests are routed to the nearest CloudFront Point of Presence (POP)
- Any custom domain name that you use for an edge-optimized API applies across all regions.
- Edge-optimized APIs capitalize the names of HTTP headers
- Default option.
- Best for geographically distributed clients.

## Regional Endpoint

- Intended for clients in the same region.
- If you deploy a regional API in multiple regions, it can have the same custom domain name in all regions.
- You can use custom domains together with Amazon Route 53 to perform tasks such as latency-based routing.

## Private Endpoint

A private API endpoint is an API endpoint that can only be accessed from your Amazon Virtual Private Cloud (VPC) using an interface VPC endpoint, which is an endpoint network interface (ENI) that you create in your VPC.
