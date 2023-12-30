# Amazon CloudFront

## Overview

CloudFront is a content delivery network
(CDN) service that securely delivers data, videos, applications, and APIs to customers globally. It helps reduce latency and provide higher transfer speeds using AWS edge locations.

Protection against against multiple types of network and denial of service attacks, sudden traffic spikes.

Provides Lambda at Edge, which improves performance by running your Lambda code at edge locations.

Provides real-time metrics and logging so that you can monitor what's being requested, where from, and how quickly. 

Uses pay-as-you-go pricing with no minimum fees.

CloudFront is the only option to add HTTPS to a static website being hosted in an S3 bucket.


## Features

**Security**. Defaults to HTTPS connections with the ability to add custom SSL certificate and domain

**Endpoint Support**. Can be used to front AWS endpoints along with non-AWS applications

**Global Distribution**. You can't pick specific countries - just general areas of the globe

**Expiring Content**. You can force an expiration of content from the cache if you can't wait for the TTL


## How it works?

When you use Route 53 to configure your domain to direct incoming DNS requests to the CloudFront distribution, requests will be automatically routed to CloudFront endpoint.

When a request is made, CloudFront assesses the user's location and calculates which endpoint will be available to deliver the content with the lowest latency.

If this is the first time this content has been requested through the endpoint, the content will be copied from the origin server. Delivery of subsequent requests will—because the cached copy is still stored at the end- point—be much faster.

If a visitor requests an expired content, CloudFront checks the origin server for new version and copies it to edge location. 


## CloudFront distribution

The kind of CloudFront distribution you create will depend on the kind of media you're providing:
- For web pages and graphic content, you'll select a web distribution
- For video content stored in S3 buckets that can use Adobe's Real-Time Messaging Protocol (RTMP), CloudFront's RTMP distribution makes the most sense.

When you configure your distribution, you'll have the option of adding a free AWS Certificate Manager (ACM) SSL/TLS encryption certificate to your distribution.


## CloudFront origins

Permitted CloudFront origins:

- Amazon S3 bucket
- AWS MediaPackage channel endpoint
- AWS MediaStore container endpoint
- Application Load Balancer
- Lambda function URL
- Custom origin (can point to an on-premises server)
