# Introducing Google Cloud

## Cloud computing overview

Cloud computing is the on-demand delivery of IT resources over the Internet with pay-as-you-go pricing.

Five equally important traits:

- customers get computing resources that are on-demand and self-service.
- customers get access to those resources over the Internet, from anywhere.
- cloud provider has a big pool of those resources and allocates them to users out of that pool.
- resources are elastic, if customers need more resources, they can get more and quickly.
- customers pay only for what they use or reserve as they go.


## The Google Cloud network

Google Cloud’s infrastructure is based in five major geographic **locations**: North America, South America, Europe, Asia, and Australia.

Each of these locations is divided into several different **regions** and zones. Regions represent independent geographic areas and are composed of **zones**.

A zone is an area where Google Cloud resources are deployed. 

You can run resources in different regions. This is useful for bringing applications closer to users around the world, and also for protection in case there are issues with an entire region, say, due to a natural disaster.

## Pricing and billing

Google was the first major cloud provider to deliver **per-second billing** for its infrastructure as a service compute offering compute engine.

Compute Engine offers automatically applied sustained-use discounts which are **automatic discounts** that you get for running a virtual machine instance for a significant portion of the billing month. Specifically, when you run an instance for more than 25% of a month, Compute Engine automatically gives you a discount for every incremental minute you use for that instance.

You can define **budgets** at the billing account level or at the project level. A budget can be a fixed limit or it can be tied to another metric, for example, a percentage of the previous month spent.

To be notified when costs approach your budget limit, you can create an **alert**.

Google Cloud also implements **quotas** which are designed to prevent the over consumption of resources. There are two types of quotas, rate quotas and allocation quotas, applied at the project level. Rate quotas reset after a specific time. Allocation quotas govern the number of resources you can have in your projects.

Estimate your cost at: https://cloud.google.com/products/calculator
