# Routing Policices

## Simple Routing Policy

When you create a record, if you choose the simple routing policy, you can only have one record with multiple IP addresses.

If you specify multiple values in a record, Route 53 returns all values to the user in a random order.


## Weighted Routing Policy

Allows you to split your traffic based on different weights assigned.

> For example, you can set 10% of your traffic to go to `us-east-1` and 90% to go to `eu-west-1`.


## Failover Routing Policy

Failover routing policies are used when you want to create an active/passive set up.

> For example, you may want your primary site to be in EU-WEST-2 and your secondary disaster recovery Site in AP-SOUTHEAST-2.

Route53 will monitor the health of your primary site using a health check.

> In this example Route53 will send the traffic to AP-SOUTHEAST-2
because it has detected a failure in EU-WEST-2

![](./images/failover-policy.png)


## Geolocation Routing Policy

Geolocation routing lets you choose where your traffic will be sent based on the geographic location of your users (i.e., the location from which DNS queries originate).

> For example, you might want all queries from Europe to be routed to a fleet of C2 instances that are specifically configured for your European customers.
>
> These servers may have the local language of your European customers and display all prices in euros.

![](./images/geo-policy.png)


## Geoproximity Routing

Only available when built with Traffic Flow.

Geoproximity routing lets Amazon Route 53 route traffic to your resources based on the geographic location of your users and your resources.

You can also optionally choose to route more traffic or less to a given resource by specifying a value, known as a bias. A bias expands or shrinks the size of the geographic region from which traffic is routed to a resource.


## Latency Routing Policy

Allows you to route your traffic based on the lowest network latency for your end user (i.e., which region will give them the fastest response time).

To use latency-based routing, you create a **latency resource record set** for the EC2 (or ELB) resource in each region that hosts your website.

When Route 53 receives a query for your site, it selects the latency resource record set for the region that gives the user the lowest latency.


## Multivalue Answer Routing

Multivalue answer routing lets you configure Amazon Route 53 to return multiple values in response to DNS queries.

You can specify multiple values for almost any record.

Route 53 returns only values for healthy resources.

This is similar to simple routing; however, it allows you to put health checks on each record set.