# Origins

## Overview

An origin is the location where the original content is stored. CloudFront retrieves content from this origin to deliver it to viewers.

CloudFront have several type of origins:
- S3 bucket
- Custom origin (HTTP)
- Lambda function URL
- Route 53
- AWS MediaPackage channel endpoint
- AWS MediaStore container endpoint

Objects are cached for 24 hours by default.

The expiration time is controlled through the TTL. The minimum expiration time is 0.


## S3 Bucket Origin

When you create a CloudFront distribution, you specify the S3 bucket as the origin to effectively deliver your content.

To guarantee that only CloudFront can access your S3 bucket, you can use Origin Access Control (OAC).

You can define the TTL for specific objects in S3 by adding a `Cache-Control` header to the object's metadata (key: `Cache-Control`, value: `max-age=3600` or `no-cache`).

CloudFront can be used to upload files to S3 (ingress).

To use an Amazon S3 bucket as an origin:
1. Navigate to the CloudFront console and create a new distribution
2. In the "Origin domain", select your S3 bucket
3. Under "Origin access", choose "Origin access control settings (recommended)"
4. Under “Origin access control, click "Create new OAC".
5. CloudFront will provide a bucket policy that you need to add to your S3 bucket policy. This policy allows CloudFront to access your S3 bucket.
6. Add the bucket policy provided by CloudFront to your S3 bucket policy


## Custom Origin (HTTP)

You can have CloudFront stand in front of any custom origin HTTP backend:
- Application Load Balancer
- EC2 instance
- S3 static website (**Static Website Hosting** must be enabled)
- any HTTP backend

When using an on-premises or non-AWS based web server you must specify the DNS name, ports, and protocols that you want CloudFront to use when fetching objects from your origin.

To restrict access to your origin to CloudFront only:
- Configure your origin server to accept requests only from CloudFront's IP ranges using AWS-provided lists.
- Utilize custom headers in CloudFront and configure your origin to accept only requests with these headers.


### EC2 Origin

When using EC2 as custom origins:
- Our HTTP backend will run on the EC2 instance.
- Users will connect to CloudFront's edge locations.
- These edge locations will forward requests to our EC2 instance.
- The EC2 instances must be publicly accessible; otherwise, the edge locations won't be able to reach them.
- We need a security group that permits access from all the public IP addresses of CloudFront's edge locations.

For Application Load Balancers:
- It must be public
- The public IPs of the edge locations must be allowed in the security group of the ALB


### S3 static website

CloudFront is the only option to add HTTPS to a static website being hosted in an S3 bucket.

To use an Amazon S3 static website as an origin, set the origin domain name to your S3 bucket's website endpoint.


## Multiple Origins

You can have multiple origins so that when requests sent to CloudFront, you can route them to different origins based on the content type or the URI path.

For example:
- Requests with URIs starting with `/images/` will be routed to an S3 bucket origin.
- Requests with URIs starting with `/api/` will be routed to an API Gateway.
- Everything else (`/*`) will be routed to a custom HTTP server.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*fu9jLxAnX3XnmHTCCgytrg.png)

See [cache behaviors](./cache-behavior.md#cache-behaviors) for more details.


## Origin Path

If you have an **Origin path** set in your CloudFront configuration, it will be prefixed to the request URI.

For instance, if your origin path is `/backend`, the request to `https://your-distribution.cloudfront.net/api/users` will be forwarded to the origin as `/backend/api/users`.

![](https://user-images.githubusercontent.com/1059139/39093857-3c948a30-45f4-11e8-9a62-df5edac33f07.png)


## Origin Groups

You can set up Origin Group to increase high-availability and do failover.

An origin group consists of one primary and one secondary origin.

If the primary origin fails then CloudFront will try to failover to the second origin.

You can also use this with S3 to get region level high availability and disaster recovery.

Also works with Lambda@Edge functions.
