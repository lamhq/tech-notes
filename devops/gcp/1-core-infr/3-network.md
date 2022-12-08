# Virtual Machines and Networks in the Cloud

## Virtual Private Cloud networking

- VPC networks connect Google Cloud resources to each other and to the internet
- Segmenting networks
- Using firewall rules to restrict access to instances
- Creating static routes to forward traffic to specific destinations
- Google VPC networks are global and can have subnets in any Google Cloud region worldwide.

Subnets can span the zones that make up a region.

Resources can even be in different zones on the same subnets.

### Routing table

VPCs have built-in routing tables. They're used to forward traffic from one instance to another within the same network, across subnetworks, or even between Google Cloud zones, without requiring an external IP address.

### Firewall

VPCs provide a global distributed firewall, which can be controlled to restrict access to instances through both incoming and outgoing traffic.

Firewall rules can be defined through network tags on Compute Engine instances. For example, you can tag all your web servers with, say, "WEB" and write a firewall rule saying that traffic on ports 80 or 443 is allowed into all VMs with the "WEB" tag.

Every VPC network has two implied IPv4 firewall rule:
- An egress rule lets (allow) any instance send traffic to any destination
- An ingress rule protects (deny) all instances by blocking incoming connections to them

The implied rules cannot be removed, but they have the lowest possible priorities.

### VPC Peering

If your company has several Google Cloud projects, and the VPCs need to talk to each other? With VPC Peering, a relationship between two VPCs can be established to exchange traffic.

### Connecting networks to Google VPC

Many google cloud customers want to connect their google virtual private clouds to other networks in their system, There are several effective ways to accomplish this:

- start with a virtual private network connection over the Internet and use the IPsec VPN protocol to create a tunnel connection
- using Direct Peering. Peering means putting a router in the same public data center as a google point of presence, and using it to exchange traffic between networks.
- if getting the highest up times for interconnection is important, using Dedicated Interconnect would be a good solution.
- a Partner Interconnect connection is useful if a data center is in a physical location that can't reach a Dedicated Interconnect co location facility. 


## Compute Engine

With Compute Engine, users can create and run virtual machines on Google infrastructure.

A VM can be configured much like a physical server: by specifying the amount of CPU power, memory, storage needed, and the operating system.

A virtual machine instance can be created via the Google Cloud console, the Google Cloud CLI, or the Compute Engine API.

A quick way to get started with Google Cloud is through the Cloud Marketplace.

Compute Engine bills by the second with a one-minute minimum, and sustained-use discounts start to apply automatically to virtual machines the longer they run.

For each VM that runs for more than 25% of a month, Compute Engine automatically applies a discount for every additional minute. Compute Engine also offers committed-use discounts.

Compute Engine lets you choose the machine properties of your instances, like the number of virtual CPUs and the amount of memory, by using a set of predefined machine types or by creating your own.


## Scaling virtual machines

Compute Engine has a feature called Autoscaling, where VMs can be added to or subtracted from an application based on load metrics.

The maximum number of CPUs per VM is tied to its "machine family" and is also constrained by the quota available to the user, which is zone-dependent.


## Cloud Load Balancing

Cloud Load Balancing is a fully distributed, software-defined, managed service for all your traffic.

You can put Cloud Load Balancing in front of all of your traffic: HTTP or HTTPS, other TCP and SSL traffic, and UDP traffic too.

Cloud Load Balancing provides cross-region load balancing, including automatic multi-region failover.

If you need cross-regional load balancing for a web application, use **Global HTTP(S) load balancing**. For Secure Sockets Layer traffic that is not HTTP, use the **Global SSL Proxy load balancer**. If it’s other TCP traffic that doesn’t use SSL, use the **Global TCP Proxy load balancer**.

If you want to load balance UDP traffic, or traffic on any port number, you can still load balance across a Google Cloud region with the **Regional load balancer**.

If you want to load balance traffic inside your project, say, between the presentation layer and the business layer of your application? For that, use the **Regional internal load balancer**. It accepts traffic on a Google Cloud internal IP address and load balances it across Compute Engine VMs.


## Cloud DNS

Cloud DNS is a managed DNS service. The DNS information you publish is served from redundant locations around the world.

Cloud DNS is also programmable. You can publish and manage millions of DNS zones and records using the Cloud Console, the command line interface or the API.


## Cloud CDN

Google also has a global system of edge caches. Edge caching refers to the use of caching servers to store content closer to end users.


## Reference

https://cloud.google.com/vpc/docs/overview