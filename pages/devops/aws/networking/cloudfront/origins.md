# Origins

## Overview

An origin is the origin of the files that the CDN will distribute.

Permitted CloudFront origins:
- Amazon S3 bucket
- Application Load Balancer
- Lambda function URL
- Custom origin (web servers)
- Route 53
- AWS MediaPackage channel endpoint
- AWS MediaStore container endpoint

Objects are cached for 24 hours by default.

The expiration time is controlled through the TTL.

The minimum expiration time is 0.


## Custom Origins

CloudFront can provide performance optimizations for custom origins even if they are running on on-premises servers. These include:
- persistent TCP connections to the origin
- SSL enhancements such as Session tickets and OCSP stapling.

When using an on-premises or non-AWS based web server you must specify the DNS name, ports, and protocols that you want CloudFront to use when fetching objects from your origin.

Does not support RTMP distributions (must be an S3 bucket).

### EC2 as custom origin

When using EC2 for custom origins:
- Use an AMI that automatically installs the software for a web server.
- Use ELB to handle traffic across multiple EC2 instances.
- Specify the URL of your load balancer as the domain name of the origin server.

### S3 static website

For S3 static website, enter the S3 static website hosting endpoint for your bucket in the configuration.


## High availability with Origin Failover

You can set up CloudFront with origin failover for scenarios that require high availability.

Uses an origin group in which you designate a primary origin plus a second origin.

CloudFront automatically switches to the second origin when the primary origin returns specific HTTP status code failure responses.

Also works with Lambda@Edge functions.
