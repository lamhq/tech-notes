# Directing Traffic with Elastic Load Balancing

## What's a Load Balancer?

Load balancing refers to the process of distributing tasks across a set of resources.

To distribute the requests across all the servers hosting the application, you first need to enable the load balancer to take all of the traffic and redirect it to the backend servers based on an algorithm. The most popular algorithm is round-robin, which sends the traffic to each server one after the other.

A typical request for the application would start from the browser of the client. It's sent to a load balancer. Then, it's sent to one of the instances that hosts the application. The return traffic would go back through the load balancer and back to the client browser.


## Elastic Load Balancing

Elastic Load Balancing is the AWS service that automatically distributes incoming application traffic across multiple resources, such as Amazon EC2 instances. 

**Elastic Load Balancing** and **Amazon EC2 Auto Scaling** are separate services, they work together to help ensure that applications running in Amazon EC2 can provide high performance and availability.

![](elb.jpg)


## Health Checks

Taking the time to define an appropriate health check is critical. Simply making a call to the home page of an application is not the right way.

*For example, your application depends on a database, and S3. The health check should validate all of those elements. One way to do that would be to create a monitoring webpage like `/monitor` that will make a call to the database to ensure it can connect and get data, and make a call to S3. Then, you point the health check on the load balancer to the `/monitor` page.*

![](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/HAix_5anRTiIsf-WpyU4Ew_399d176189a7467795b6ffb2847106e8_healthCheck.jpeg?expiry=1663286400000&hmac=TTQDRpVHvow2ZrHkSQdkXCqxswT14JrFduZpQTZKUac)

If ELB determines that an instance is no longer working, it stops sending traffic to it and lets Auto Scaling know. Auto Scaling's responsibility is to remove it from the group and replace it with a new instance. Traffic only sends to the new instance if it passes the health check.

In the case of a scale down action that Auto Scaling needs to take due to a scaling policy, it lets ELB know that instances will be terminated. ELB can prevent Auto Scaling from terminating the instance until all connections to that instance end, while preventing any new connections. That feature is called **connection draining**.


## ELB Components

![](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/scrYrLhfRsKK2Ky4X1bC6g_4889070edee34d2aa217a6d24f23243a_ELB.jpeg?expiry=1663286400000&hmac=ucpDTmzZW5ZmlORfxsBs9O0dpD8at1iQDnTrOsU8Qro)

The ELB service is made up of three main components:

- Listeners:To define a listener, a port must be provided as well as the protocol, depending on the load balancer type. There can be many listeners for a single load balancer.
- Target groups: The backend servers, or server-side, is defined in one or more target groups. This is where you define the type of backend you want to direct traffic to, such as EC2 Instances, AWS Lambda functions, or IP addresses. Also, a health check needs to be defined for each target group.
- Rules: To associate a target group to a listener, a rule must be used. Rules are made up of a condition that can be the source IP address of the client and a condition to decide which target group to send the traffic to.


## Application Load Balancer

Here are some primary features of Application Load Balancer:

- Routes traffic based on request data: HTTP protocol, the URL path (/upload) and host, HTTP headers and method, as well as the source IP address of the client.
- Redirect: redirect to a specific website, redirect from HTTP to HTTPS
- Supports TLS offloading: To be able to pass HTTPS traffic through ALB, an SSL certificate is provided.
- Authenticate users: ALB uses the OpenID Connect protocol and integrates with other AWS services to support more protocols like SAML, LDAP, Microsoft AD, and more.
- Secure traffic: you can configure a security group to control the access to the load balancer.
- ALB uses the **round-robin** routing algorithm.
- ALB uses the **least outstanding** request routing algorithm. If the requests to the backend vary in complexity where one request may need a lot more CPU time than another, then the least outstanding request algorithm is more appropriate.
- ALB has **sticky sessions**. In the case where requests need to be sent to the same backend server because the application is stateful, then use the sticky session feature. This feature uses an HTTP cookie to remember across connections which server to send the traffic to.

ALB is specifically for **HTTP and HTTPS** traffic. If your application uses a different protocol, then consider the Network Load Balancer (NLB).


## Network Load Balancer

**Network Load Balancer supports TCP, UDP, and TLS protocols**. However, NLB operates at the connection layer, routing rules based on protocol, authentication, and least outstanding request routing algorithm, are not available with NLB.

**NLB uses a flow hash routing algorithm**. The algorithm is based on:
- The protocol
- The source IP address and source port
- The destination IP address and destination port
- The TCP sequence number

If all of these parameters are the same, then the packets are sent to the exact same target. If any of them are different in the next packets, then the request may be sent to a different target.

**NLB has sticky sessions**. Different from ALB, these sessions are based on the source IP address of the client instead of a cookie.

**NLB supports TLS offloading**. NLB understands the TLS protocol. It can also offload TLS from the backend servers similar to how ALB works.

**NLB handles millions of requests per second**. While ALB can also support this number of requests, it needs to scale to reach that number. This takes time. NLB can instantly handle this amount of requests.

**NLB supports static and elastic IP addresses**. There are some situations where the application client needs to send requests directly to the load balancer IP address instead of using DNS. For example, this is useful if your application can't use DNS or if the connecting clients require firewall rules based on IP addresses. In this case, NLB is the right type of load balancer to use.

**NLB preserves source IP address**. NLB preserves the source IP address of the client when sending the traffic to the backend. With ALB, if you look at the source IP address of the requests, you will find the IP address of the load balancer. While with NLB, you would see the real IP address of the client, which is required by the backend application in some cases. 

## Select Between ELB Types

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
