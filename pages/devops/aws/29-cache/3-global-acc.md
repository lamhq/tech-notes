# AWS Global Accelerator (GA)

## Overview

AWS Global Accelerator is a networking service that sends your users' traffic through AWS's global network infrastructure via accelerators.

It can increase performance and help deal with IP caching by leveraging Anycast IP addresses.

It is meant for TCP or UDP traffic, different from CloudFront.

GA uses edge locations to help speed everything up.

Keywords: IP caching, optimizing traffic, reduce latency.


## GA vs. CloudFront

CloudFront is meant to be a content delivery network service
focused on content caching and distribution
via HTTP and HTTPS,

Global Accelerator is tailored for optimizing network traffic and routing via TCP and UDP.

They function at different layers.


## Concepts

- **Accelerator**: Directs user traffic to the optimal AWS endpoints. It acts as the entry point for incoming traffic
and helps improve the performance
and availability of the applications
- **Listener**: Processes inbound connections based on ports and protocols.
- **Endpoint**: Resources that Global Accelerator directs traffic to (e.g., application load balancers,
network load balancers, E2 instances,).


## How it work?

GA provides two static Anycast IP addresses for your accelerators.

In case of using dual-stack IP addressing, it provides four static IP addresses (two IPv4 and two IPv6).

These static IPs act as a single, fixed entry for ALL client traffic.

Global Accelerator offers you two accelerator types
to control how your traffic is actually directed:
- **Standard**: GA chooses the healthiest closest endpoint for your traffic.
- **Custom**: you use application logic to directly map one traffic
to a specific EC2 instance among many different destinations. It is useful when you have an application that requires groups of users to interact with each other via the same session,
so an example of this would be a gaming application.


## Architecture example

In this scenario, we have an AWS account on the right side of the architecture with different endpoints present across two distinct regions in the world. These endpoints can include diverse applications, such as IoT services, web servers, and APIs. 

AWS Global Accelerator serves as a solution that creates two global accelerators for us to use, and these leverage a point of presence or an edge networking location via the CloudFront network. By doing so, the accelerators provide faster and more reliable delivery of traffic from global clients to our applications. 

In the process of creating the accelerators, we are assigned two Anycast IP addresses that can be used within our routing logic and our DNS configuration. This process ensures that traffic gets directed to the optimized endpoint for any incoming request. 

We can map these IP addresses to our web IoT service, which listens on port 443 using TCP and UDP connections. Two different elastic load balancer types, which are natively supported via standard endpoints, are present on the right-hand side. 

From a traffic flow perspective, suppose we have users in different countries like Ghana and Australia. Whenever they make their request to our web service using port 443, Global Accelerator automatically handles the load balancing of traffic and directs traffic to the most optimized endpoint. This process happens without us having to specify any particular destination. 

The traffic is sent through the AWS Backbone network, which is free from jitter and congestion when compared to the global public internet. As a result, the networking performance is incredibly high. And the beautiful thing is all of this happens
without us needing to actually implement
any major architectural changes.

![](./images/ga-arch.png)