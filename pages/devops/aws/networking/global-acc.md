# AWS Global Accelerator (GA)

## Overview

AWS Global Accelerator is a networking service that **sends your users' traffic through AWS's global network infrastructure** via accelerators.

It can increase performance and help **deal with IP caching**.

It's for TCP or UDP traffic.

GA uses edge locations to help speed everything up.

Keywords: IP caching, optimizing traffic, reduce latency.


## Concepts

- **Accelerator**: Directs user traffic to the optimal AWS endpoints. It acts as the entry point for incoming traffic
and helps improve the performance
and availability of the applications
- **Listener**: Processes inbound connections based on ports and protocols.
- **Endpoint**: Resources that Global Accelerator directs traffic to (e.g., application load balancers,
network load balancers, E2 instances,).


## How it work?

GA gives you 2 any-cast static IPv4 addresses that you can use to route traffic to resources in any region (in case of using dual-stack IP addressing, it provides four static IP addresses, 2 IPv4 and 2 IPv6).

GA static addresses are spread across different AWS points-of-presence (POPs) in over 30 countries. Users connecting to a static address are automatically routed to the nearest POP.

The GA listener receives the TCP or UDP connection, and then proxies it to the resources you’ve specified in an endpoint group.

GA offers you two accelerator types to control how your traffic is actually directed:
- **Standard**: GA chooses the healthiest closest endpoint for your traffic.
- **Custom**: you use application logic to directly map one traffic
to a specific EC2 instance among many different destinations. It is useful when you have an application that requires groups of users to interact with each other via the same session (for example, gaming application).


## Architecture example

In this scenario, we have an AWS account on the right side of the architecture with different endpoints present across two distinct regions in the world. These endpoints can include diverse applications, such as IoT services, web servers, and APIs. 

AWS Global Accelerator serves as a solution that creates two global accelerators for us to use, and these leverage a point of presence or an edge networking location via the CloudFront network. 

In the process of creating the accelerators, we are assigned two Anycast IP addresses that can be used within our routing logic and our DNS configuration. We can map these IP addresses to our web IoT service, which listens on port 443 using TCP and UDP connections.

Two different elastic load balancer types, which are natively supported via standard endpoints, are present on the right-hand side. 

We have users in different countries like Ghana and Australia. Whenever they make their request to our web service using port 443, Global Accelerator automatically handles the load balancing of traffic and directs traffic to the most optimized endpoint. This process happens without us having to specify any particular destination. 

The traffic is sent through the AWS Backbone network. The networking performance is incredibly high. All of this happens
without us needing to actually implement
any major architectural changes.

![](./images/ga-arch.png)


## GA vs. CloudFront

CloudFront is meant to be a content delivery network service
focused on content caching and distribution
via HTTP and HTTPS,

Global Accelerator is tailored for optimizing network traffic and routing via TCP and UDP.

They function at different layers.
