# Load balancer

## Overview

A load balancer is a machine that runs a reverse proxy software.

It evenly distributes incoming traffic among registered servers that host the application.

A load balancer communicates with servers through private IPs. A private IP is an IP address reachable only between servers in the same network; however, it is unreachable over the internet.

Servers are unreachable directly by clients anymore.

![](./load-balancer.md/../load-balancer/load-balancer.drawio.svg)


## Benefits

1. Make system more resilient. If a server fails, the load balancer reroutes requests to other servers (scalability).
2. Make system horizontally scalable. You can add more servers easily (high availability).


## Routing Strategies

Load balancers use various strategies to distribute network traffic across multiple servers:
1. **Round Robin**: Distributes requests sequentially across all servers.
2. **Least Connections**: Directs traffic to the server with the fewest active connections.
3. **Least Response Time**: Sends requests to the server with the quickest response time.
4. **IP Hash**: Uses the client's IP address to determine which server receives the request.
5. **Weighted Algorithms**: Assigns more traffic to servers with higher capacities.
6. **Geographical Algorithms**: Routes traffic based on the geographical location of the client.


## Types of Load Balancers

### Layer 4

- Operates at the transport layer of the OSI model
- Routing based on: IP addresses, ports, protocol (TCP / UDP) of the request
- Suitable for applications where high performance and low latency are critical, such as in real-time applications and high-throughput environments

### Layer 7

- Operates at the application layer of the OSI model
- Has access to everything layer 4 has
- Can route based on HTTP headers, cookies, payload of the request
- More complex than Layer 4 load balancers
- Ideal for web applications where detailed inspection and intelligent routing of traffic are required.


## High Availability

To avoid becomming a Single Point of Failure (SPOF), load balancers are often deployed in a highly available configuration. This involves using multiple load balancers that can take over if one fails, ensuring continuous operation.

For example, AWS Load Balancers are deployed across multiple Availability Zones to ensure continuous operation and traffic distribution even if one AZ fails.


## Sticky sessions

Sticky sessions (session affinity) are a method used in load balancing to ensure requests from a particular client to be consistently routed to the same server.

Pros:
- Easy to integrate with stateful servers, no code changes required.
- Improved User Experience: Ensures that a user's session data is consistently handled by the same server, reducing the need for session data to be shared or synchronized between servers.

Cons:
- Adds overhead to the load balancer to track and maintain session affinity
- Hard to scale horizontally. Adding or removing servers is much more difficult
- Challenging to handle server failures
- It can lead to uneven load distribution. If one server receives a disproportionate number of sessions, it can become a bottleneck, while other servers remain underutilized
