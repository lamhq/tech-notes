# Directing Traffic with Elastic Load Balancing

## What's a Load Balancer?

Load balancing refers to the process of distributing tasks across a set of resources.

To distribute the requests across all the servers hosting the application, you first need to enable the load balancer to take all of the traffic and redirect it to the backend servers based on an algorithm. The most popular algorithm is round-robin, which sends the traffic to each server one after the other.

A typical request for the application would start from the browser of the client. It's sent to a load balancer. Then, it's sent to one of the instances that hosts the application. The return traffic would go back through the load balancer and back to the client browser.


## Elastic Load Balancing

Elastic Load Balancing is the AWS service that automatically distributes incoming application traffic across multiple resources, such as Amazon EC2 instances. 

**Elastic Load Balancing** and **Amazon EC2 Auto Scaling** are separate services, they work together to help ensure that applications running in Amazon EC2 can provide high performance and availability.

![](https://media.amazonwebservices.com/blog/2014/elb_instances_1.png)


## Health Checks

All AWS load balancers can be configured with health checks.

Health checks periodically send requests to load balancers' registered instances to test their status.

The load balancer performs health checks on all registered instances, whether the instance is in a healthy state (status = `InService`) or an unhealthy state (status = `OutOfService`).

The load balancer routes requests only to the healthy instances. When the load balancer determines an instance is unhealthy, it stops routing requests to that instance. The load balancer resumes routing requests to the instance when it has been restored to a healthy state.


## ELB Components

The ELB service is made up of three main components:

- **Listeners**: To define a listener, a port must be provided as well as the protocol, depending on the load balancer type. There can be many listeners for a single load balancer.
- **Target groups**: The backend servers, or server-side, is defined in one or more target groups. This is where you define the type of backend you want to direct traffic to, such as EC2 Instances, AWS Lambda functions, or IP addresses. Also, a health check needs to be defined for each target group.
- **Rules**: To associate a target group to a listener, a rule must be used. Rules are made up of a condition that can be the source IP address of the client and a condition to decide which target group to send the traffic to.

After the load balancer receives a request, it evaluates the listener rules in priority order to determine which rule to apply, and then selects a target from the target group for the rule action.


## Types of Load Balancers

### Application Load Balancer (Layer 7)

- Operate at application layer (layer 7).

Features:
- **Routes traffic based on request data**: HTTP protocol, the URL path, host, HTTP headers, method, source IP address.
- **Redirect**: redirect to a specific website, HTTP to HTTPS
- **Supports TLS offloading**: Use SSL certificate to decrypt requests before sending them to targets.
- **Authenticate users**: ALB uses the OpenID Connect protocol and integrates with other AWS services to support more protocols like SAML, LDAP, Microsoft AD, and more.
- **Integrate with security group** to control the access to the load balancer.
- Support **round-robin** routing algorithm.
- Support **least outstanding** request routing algorithm. If the requests to the backend vary in complexity where one request may need a lot more CPU time than another, then the least outstanding request algorithm is more appropriate.
- Support **sticky sessions**. Allow requests to be sent to the same backend server (uses HTTP cookie to track)

Limitations:
- Only support HTTP/HTTPS. SSL/TLS server certificate must be deployed to decrypt requests before sending to targets


### Network Load Balancer (Layer 4)

- Operating at the connection level (Layer 4)
- Use when you need extreme performance, or protocols not supported by Application Load Balancers
- Supports TCP, UDP, TLS protocols.
- Can decrypt traffic with certificate installed
- **Has sticky sessions**. Based on the source IP address of the client instead of a cookie.

**Uses a flow hash routing algorithm**. Based on:
- The protocol
- The source IP address and source port
- The destination IP address and destination port
- The TCP sequence number
If all of these parameters are the same, then the packets are sent to the exact same target. If any of them are different in the next packets, then the request may be sent to a different target.

**Supports static and elastic IP addresses**. There are some situations where the application client needs to send requests directly to the load balancer IP address instead of using DNS. For example, this is useful if your application can't use DNS or if the connecting clients require firewall rules based on IP addresses. In this case, NLB is the right type of load balancer to use.

**Preserves source IP address**. NLB preserves the source IP address of the client when sending the traffic to the backend. With ALB, if you look at the source IP address of the requests, you will find the IP address of the load balancer. While with NLB, you would see the real IP address of the client, which is required by the backend application in some cases. 

**Limitations**:
- Not support routing rules based on protocol, authentication, and least outstanding request routing algorithm.


### Gateway Load Balancer (Layer 3)

- Operating at the Network Level on the OSI Model (Layer 3)
- Use when deploying inline virtual appliances where network traffic is not destined for the Gateway Load Balancer itself.
- For Inline Virtual Appliance Load Balancing


### Classic Load Balancer (Layer 4/7)

- Legacy load balancers.
- Can load balance HTTP/HTTPS applications and use Laver 7-specific features, such as X-Forwarded and sticky sessions.
- Classic/Test/Dev Load Balancer (not for production).
- You can use strict Layer 4 load balancing for applications that rely purely on the TCP protocol.

**`X-Forwarded-For`**: To see the original IP address of the client use the `X-Forwarded-For` request header .

**Gateway Timeouts**: If your application stops responding, the Classic Load Balancer responds with a 504 error.
This means the application is having issues. This could be either at the web server layer or database layer.


## Comparison Between ELB Types

| Feature | Application Load Balancer | Network Load Balancer |
|---|---|---|
| Protocols | HTTP, HTTPS |  |
| Connection draining (deregistration delay) | ✔ |  |
| IP addresses as targets | ✔ | ✔ |
| Static IP and Elastic IP address |  | ✔ |
| Preserve Source IP address |  | ✔ |
| Routing based on Source IP address, path, host, HTTP headers, HTTP method, and query string | ✔ |  |
| Redirects | ✔ |  |
| Fixed response | ✔ |  |
| User authentication | ✔ |  |


## Deregistration Delay

Deregistration Delay allows Load Balancers to keep existing connections open if the EC2 instances are de-registered or become unhealthy.

This enables the load balancer to complete in-flight requests made to instances that are de-registering or unhealthy.

You can disable deregistration delay if you want your load balancer to immediately close
connections to the instances that are de-registering or have become unhealthy.
