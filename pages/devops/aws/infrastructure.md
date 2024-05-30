# AWS Infrastructure

## Regions

A Region is a physical location in the world that consists of two or more Availability Zones (AZs).

Example: `us-east-1`, `ap-northeast-1`, ...

To choose the right AWS Region:
- **Latency**: choose a Region that is close to your user base.
- **Price**: prices may vary from one Region to another.
- **Service availability**: Some services may not be available in some Regions.
- **Data compliance**:  Enterprise companies often need to comply with regulations that require customer data to be stored in a specific geographic territory


## Availability Zones

An Availability Zone is one or more discrete data centers - each with redundant power, networking and connectivity, housed in separate facilities.

AZs are located **10 miles** apart from each other. close enough to have low latency, far enough to reduce the chance that multiple AZs are affected if a disaster occurs.


AZs also have a code name:
- `us-east-1a`: an AZ in *us-east-1* (Northern Virginia Region)
- `sa-east-1b`: an AZ in *sa-east-1* (São Paulo Region in South America)

A best practice is to run applications across at least two AZs in a Region.


## Edge Locations

Edge locations are endpoints for AWS that are used for caching content.

Typically, this consists of Cloudfront, Amazon's content delivery network (CDN).

There are many more edge location than Regions (> 215).

> Suppose that your company's data is stored in Brazil, and you have customers who live in China. To provide content to these customers, you don’t need to move all the content to one of the Chinese Regions.
>
> Instead of requiring your customers to get their data from Brazil, you can cache a copy locally at an edge location that is close to your customers in China.
> 
> When a customer in China requests one of your files, Amazon CloudFront retrieves the file from the cache in the edge location and delivers the file to the customer. The file is delivered to the customer faster because it came from the edge location near China instead of the original source in Brazil.