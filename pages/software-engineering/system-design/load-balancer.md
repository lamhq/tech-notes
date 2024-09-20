# Load balancer

## Overview

A load balancer is a machine that runs a reverse proxy software.

It evenly distributes incoming traffic among registered servers that host the application.

A load balancer communicates with servers through private IPs. A private IP is an IP address reachable only between servers in the same network; however, it is unreachable over the internet.

Servers are unreachable directly by clients anymore.

![](./load-balancer.md/../load-balancer/load-balancer.drawio.svg)


## Benefits

1. Make system more resilient. If a server fails, the load balancer reroutes requests to other servers.
2. Make system horizontally scalable. You can add more servers easily.


## Traffic Distribution Strategies

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

This is beneficial for stateful servers because it maintains the user’s session state, reducing the need for session data to be shared or synchronized across multiple servers. This can improve performance and simplify session management.

Drawbacks:
- This adds the overhead to the load balancer to track and maintain session affinity
- It's hard to scale horizontally. Adding or removing servers is much more difficult
- It is challenging to handle server failures
- If a server goes down, all active sessions on that server are lost
- It can lead to uneven load distribution. If one server receives a disproportionate number of sessions, it can become a bottleneck, while other servers remain underutilized


## Stateful Servers

A stateful server remembers client data (state) from one request to the next. The client's state is stored locally on the server.

Stateful architecture require every request from the same client must be routed to the same server.

> In below figure, user A's session data is stored in Server 1. To authenticate User A, HTTP requests must be routed to Server 1. If a request is sent to other servers like Server 2, authentication would fail because Server 2 does not contain User A's session data.

![](./load-balancer.md/../load-balancer/stateful.drawio.svg)


## Stateless Servers

Stateless architecture refers to a design where each request from a client to the server is treated as an independent transaction that is unrelated to any previous request.

State data is stored in a shared data store and kept out of web servers.

Each request contains all the information the server needs to fulfill it. Requests from a client can be sent to any of the servers.

![](./load-balancer.md/../load-balancer/stateless.drawio.svg)


### Benefits

- Simplified Server Design. Servers are simpler to design and manage because they do not need to handle session state.
- Improved Scalability. Stateless servers can be easily scaled out to handle more requests, as there is no need to synchronize session state across servers.
- Fault Tolerance. If a server fails, another server can handle the request without any loss of session data.
- Ease of Maintenance. Stateless systems are easier to maintain and debug because each request is independent and self-contained.
- Better Performance. Reduced overhead from managing session state can lead to better performance and faster response times.


### Use cases

- **RESTful APIs**: REST is a popular architectural style for designing networked applications, and it relies on stateless communication.
- **Microservices**: Stateless architecture is often used in microservices to ensure that each service can operate independently and scale efficiently.
- **Serverless Computing**: Platforms like AWS Lambda and Azure Functions are inherently stateless, allowing for automatic scaling and efficient resource utilization.
