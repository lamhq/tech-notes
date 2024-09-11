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

The expiration time is controlled through the TTL.

The minimum expiration time is 0.


## S3 Bucket Origin

For distributing files and caching them at the edge.

To guarantee that only CloudFront can access your S3 bucket, you can use Origin Access Control (OAC).

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


### EC2 as custom origin

When using EC2 for custom origins:
- Use an AMI that automatically installs the software for a web server.
- Use ELB to handle traffic across multiple EC2 instances.
- Specify the URL of your load balancer as the domain name of the origin server.

### S3 static website

CloudFront is the only option to add HTTPS to a static website being hosted in an S3 bucket.

To use an Amazon S3 static website as an origin, set the origin domain name to your S3 bucket's website endpoint.


## Origin Failover

You can set up CloudFront with origin failover for scenarios that require high availability.

Uses an origin group in which you designate a primary origin plus a second origin.

CloudFront automatically switches to the second origin when the primary origin returns specific HTTP status code failure responses.

Also works with Lambda@Edge functions.
