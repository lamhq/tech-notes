# AWS Global Infrastructure

## What is AWS?

AWS is cloud computing provider.


## Regions

Regions are geographically isolated areas where AWS hosts its data centers.

Each AWS Region is associated with a geographical name and a Region code: *us-east-1*, *ap-northeast-1*, ...

![](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/Qum59ddKRmOpufXXSoZjhQ_95fce241b88c4c7bac1aa88954d013cb_globalinfra_2.jpeg?expiry=1662163200000&hmac=4gXK19tzYnVBD_WUTccxS3VWU68nOgA0CEaklNlMu6k)

**Choose the Right AWS Region**

- **Latency**: choose a Region that is close to your user base.
- **Price**: prices may vary from one Region to another.
- **Service availability**: Some services may not be available in some Regions.
- **Data compliance**:  Enterprise companies often need to comply with regulations that require customer data to be stored in a specific geographic territory


## Availability Zones

An Availability Zone is a single data center or a group of data centers within a Region.

Availability Zones are located tens of miles apart from each other. This is close enough to have low latency. They are distant enough to reduce the chance that multiple Availability Zones are affected if a disaster occurs.

AZs also have a code name:

- *us-east-1a*: an AZ in *us-east-1* (Northern Virginia Region)
- *sa-east-1b*: an AZ in *sa-east-1* (São Paulo Region in South America)

A best practice is to run applications across at least two Availability Zones in a Region.

A well-known best practice for cloud architecture is to use Region-scoped, managed services. These services come with availability and resiliency built in (e.g. Elastic load balancing).


## Edge Locations

An edge location is a site that Amazon CloudFront uses to store cached copies of your content closer to your customers for faster delivery.

> Suppose that your company’s data is stored in Brazil, and you have customers who live in China. To provide content to these customers, you don’t need to move all the content to one of the Chinese Regions.
>
> Instead of requiring your customers to get their data from Brazil, you can cache a copy locally at an edge location that is close to your customers in China.
> 
> When a customer in China requests one of your files, Amazon CloudFront retrieves the file from the cache in the edge location and delivers the file to the customer. The file is delivered to the customer faster because it came from the edge location near China instead of the original source in Brazil.


## AWS Outpost

Allow you to run AWS infrastructure right in your own data center.


## Interacting with AWS

In AWS, you can make API calls to services and resources through:

- **The AWS Management Console (web-based console)**: includes wizards and automated workflows that can simplify the process of completing tasks.
- **AWS Console mobile**: monitoring resources, viewing alarms, and accessing billing information
- **The AWS Command Line Interface (CLI)**: control multiple AWS services directly from the command line.
- **The AWS Software Development Kits (SDKs)**: use AWS services through an API designed for your programming language or platform.
- **AWS Elastic Beanstalk**: you provide code and configuration settings, Elastic Beanstalk perform : Adjust capacity, Load balancing, Automatic scaling, Application health monitoring
- **AWS Cloudformation**: treat your infrastructure as code. Enabling you to frequently build your infrastructure and applications without having to perform manual actions or write custom scripts.
