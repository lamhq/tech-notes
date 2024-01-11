# Amazon Route 53

## Overview

Route 53 is Amazon's DNS service.

It allows you to register domain names, create hosted zones, and manage and create DIS records.

Route 53 is named after Route 66 (one of the original highways across the United States) but is called 53 because DNS operates on port 53.

Route 53 supports IPv4 and IPv6.


## Route 53 Traffic Flow

You can use Route 53 traffic flow to build a routing system that uses a combination of:
- geographic location
- latency
- and availability to route traffic
from your users to your cloud or on-premises endpoints.

It's a way of doing very highly complex routing of your DNS traffic, you built it out using a GUI.

You can build your traffic routing policies:
- from scratch
- or you can pick a template from a library and then customize it.


## Health Checks

You can set health checks on individual record sets.

If a record set fails a health check, it will be removed from Route 53 until it passes the health check.

You can set SNS notifications to alert vou about failed health checks.


## Amazon Route 53 and Amazon CloudFront 

![](./images/route-53-cloudfront.png)

Suppose that AnyCompany's application is running on several Amazon EC2 instances. These instances are in an Auto Scaling group that attaches to an Application Load Balancer. 

1. A customer requests data from the application by going to AnyCompany's website. 
1. Amazon Route 53 uses DNS resolution to identify AnyCompany.com's corresponding IP address, 192.0.2.0. This information is sent back to the customer. 
1. The customer's request is sent to the nearest edge location through Amazon CloudFront. 
1. Amazon CloudFront connects to the Application Load Balancer, which sends the incoming packet to an Amazon EC2 instance.