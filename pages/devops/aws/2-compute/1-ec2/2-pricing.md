# Pricing

Amazon EC2 offers a variety of pricing options for different use cases.

## On-Demand Instances

Pay by the houror the second, depending on the type ò instance you run.

Ideal for short-term, unpredictable workloads that cannot be interrupted.

Use cases:

- developing and testing applications
- running applications that have unpredictable usage patterns.

Not recommended for workloads that last a year or longer because these workloads can experience greater cost savings using **Reserved Instances**.


## Reserved Instances

Reserved capacity for 1 or 3 years. Up to 72% off the on-demand price.

Ideal for:
- Predictable usage. applications with steady state predictable usage.
- Specific capacity requirements. Applications that require reserved capacity.
- Pay up front to reduce total costs.

**Convertible Reserved Instances**: similar to Standard Reserved Instances, 
has the option to change to a different reserved instance type (equal or greater value).
Up to 54% off the on-demand price.

**Scheduled Reserved Instances**: launch within the time window you define. Match your capacity reservation to a predictable recurring schedule that only require a fraction of a day, week, or month.

At the end of a Reserved Instance term, you can continue using the Amazon EC2 instance without interruption. However, you are charged On-Demand rates until you do one of the following:

- Terminate the instance.
- Purchase a new Reserved Instance that matches the instance attributes (instance type, Region, tenancy, and platform).


## Spot Instances

You purchase unused capacity at a discount of up to 90%.

Prices fluctuate (move up & down) with supply and demand.

The hourly Spot price varies depending on capacity and region.

Ideal for:
- any type of computing that don't need persistent storage.
- stateless, fault-tolerant, flexible applications
- workloads with flexible start and end times
- tasks that can withstand interruptions, such as background processing job.
- cost sensitive applications

Not good for:
- persistent workloads
- web server, database server
- critical jobs

Use cases:
- big data and analytics
- containerized workloads
- CI/CD and testing
- image and media rendering
- high-performance computing
- algorithmic trading engines


## Dedicated Hosts

A physical server dedicated for your use. Most expensive option. 

Use case:
- **Compliance**: this is where you've got regulatory requirements that may not support multi-tenant virtualization (the underlying hardware is shared with other AWS customers).
- **Licensing**: great for licensing that does not support multi-tenancy or cloud deployments.
- **On-demand**: can be purchased on-demand (hourly)
- **Reserved**: can be purchased as a reservation for up to 70% off the on-demand price.
