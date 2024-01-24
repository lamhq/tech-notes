# Load Balancer Types

## Application Load Balancer (Layer 7)

Operate at application layer (layer 7).

Automatically scales to handle incoming application traffic.

**Routes traffic based on request data**: HTTP protocol, the URL path, host, HTTP headers, method, source IP address.

**Redirect**: redirect to a specific website, HTTP to HTTPS

**Supports TLS offloading**: Use SSL certificate to decrypt requests before sending them to targets.

**Authenticate users**: ALB uses the OpenID Connect protocol and integrates with other AWS services to support more protocols like SAML, LDAP, Microsoft AD, and more.

**Integrate with security group** to control the access to the load balancer.

Support **round-robin** routing algorithm.

Support **least outstanding** request routing algorithm. If the requests to the backend vary in complexity where one request may need a lot more CPU time than another, then the least outstanding request algorithm is more appropriate.

Support **sticky sessions**. Allow requests to be sent to the same backend server (uses HTTP cookie to track)

IP addresses can be configured as targets which allows load balancing to applications hosted in AWS or on-premises using the IP addresses of the back-end instances/servers as targets.

Detailed **access log** information is provided and saved to an S3 bucket every 5 or 6 minutes.

Federated authentication:
- Supports authentication from OIDC compliant identity providers such as Google, Facebook, and Amazon.
- Implemented through an authentication action on a listener rule that integrates with Amazon Cognito to create user pools.
- AWS SAM can also be used with Amazon Cognito.

Limitations:
- Only support HTTP/HTTPS. SSL/TLS server certificate must be deployed to decrypt requests before sending to targets


## Network Load Balancer (Layer 4)

Routing connections to targets: Amazon EC2 instances, containers and IP addresses based on IP protocol data.

Designed to handle millions of requests/sec, support sudden volatile traffic patterns at extremely low latencies.

You access NLB using IP. Support static/Elastic IP address for each AZ.

Supports TCP, UDP, TLS protocols.

Supports long-running/lived connections (ideal for WebSocket applications).

Supports failover between IP addresses within and across AWS Regions (uses Amazon Route 53 health checks).

Can decrypt traffic with certificate installed

Support sticky sessions. Based on the source IP address of the client instead of a cookie.

Uses a flow hash routing algorithm. Based on:
- The protocol
- The source IP address and source port
- The destination IP address and destination port
- The TCP sequence number
If all of these parameters are the same, then the packets are sent to the exact same target. If any of them are different in the next packets, then the request may be sent to a different target.

Preserves source IP address (with ALB, the source IP address is the IP address of the load balancer).

Use when you need extreme performance, or protocols not supported by ALB.

Limitations:
- Not support routing rules based on protocol, authentication, and least outstanding request routing algorithm.


## Gateway Load Balancer (Layer 3)

- Operating at the Network Level on the OSI Model (Layer 3)
- Use when deploying inline virtual appliances where network traffic is not destined for the Gateway Load Balancer itself.
- For Inline Virtual Appliance Load Balancing
- Support IP protocol


## Classic Load Balancer (Layer 4/7)

- Legacy load balancers.
- Can load balance HTTP/HTTPS applications and use Laver 7-specific features, such as X-Forwarded and sticky sessions.
- Classic/Test/Dev Load Balancer (not for production).
- You can use strict Layer 4 load balancing for applications that rely purely on the TCP protocol.

Use `X-Forwarded-For` header to see the original IP address of the client.

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
