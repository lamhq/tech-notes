# Pricing

Amazon EC2 offers a variety of pricing options for different use cases.

## On-Demand

Ideal for short-term, unpredictable workloads that cannot be interrupted.

Pay by the hour or the second, depending on the type of instance you run.

Not recommended for workloads that last a year or longer (use **Reserved Instances** instead).

Use cases:

- developing and testing applications
- running applications that have unpredictable usage patterns.


## Reserved Instances

Reserved capacity for 1 or 3 years. Up to 72% off the on-demand price.

Ideal for:
- Predictable usage. applications with steady state predictable usage.
- Specific capacity requirements. Applications that require reserved capacity.
- Pay up front to reduce total costs.

**Convertible Reserved Instances**: similar to Standard Reserved Instances, has the option to change to a different reserved instance type (equal or greater value).
Up to 54% off the on-demand price.

**Scheduled Reserved Instances**: launch within the time window you define. Match your capacity reservation to a predictable recurring schedule that only require a fraction of a day, week, or month.

After Reserved Instance term, you are charged On-Demand rates until you do one of the following:
- Terminate the instance.
- Purchase a new Reserved Instance that matches the instance attributes (instance type, Region, tenancy, and platform).


## Spot Instances

You purchase unused capacity at a discount of up to 90%.

Prices fluctuate (move up & down) with supply and demand.

The hourly Spot price varies depending on capacity and region.

Ideal for:
- workloads with flexible start and end times
- any type of computing that don't need persistent storage.
- stateless, fault-tolerant, flexible applications
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


## Capacity Reservation

**Capacity Reservation** allows you to reserve compute capacity for your Amazon EC2 instances in a specific Availability Zone for any duration.

It's ideal if you have strict capacity requirements, and are running business-critical workloads that require a certain level of long or short-term capacity assurance. 

You can create Capacity Reservations at any time, without entering into a one-year or three-year term commitment. The capacity becomes available and billing starts as soon as the Capacity Reservation is provisioned in your account.

To create a Capacity Reservation, you specify the Availability Zone in which to reserve the capacity, the number of instances for which to reserve capacity, and the instance attributes (instance type, tenancy, and platform/OS).

Capacity Reservations can only be used by instances that match their attributes. By default, they are automatically used by running instances that match the attributes. If you don't have any running instances that match the attributes of the Capacity Reservation, it remains unused until you launch an instance with matching attributes.


## An Important Note About Billing

Besides the normal charges for running an EC2 instance, your AWS account might also be billed hourly amounts or license fees for the use of the AMI software itself.