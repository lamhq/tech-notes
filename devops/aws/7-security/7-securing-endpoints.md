# Securing Endpoints

## Elastic Load Balancing (ELB)

Elastic Load Balancing works with Amazon Virtual Private Cloud (VPC) to provide robust security features, including integrated certificate management, user-authentication, and SSL/TLS decryption.

https://aws.amazon.com/elasticloadbalancing/  


## Amazon API Gateway

Amazon API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale. 

https://aws.amazon.com/api-gateway/


## AWS Shield

AWS Shield is a managed Distributed Denial of Service (DDoS) protection service that safeguards applications running on AWS.

https://aws.amazon.com/shield/


## AWS WAF

[AWS WAF](https://aws.amazon.com/waf) is a web application firewall that lets you monitor network requests that come into your web applications. 

You can use AWS WAF to create custom rules that block common attack patterns, such as SQL injection or cross-site scripting, and rules that are designed for your specific application. It does this by using a [web access control list (ACL)](https://docs.aws.amazon.com/waf/latest/developerguide/web-acl.html) to protect your AWS resources. 

AWS WAF works together with Amazon CloudFront and an Application Load Balancer.

![](images/aws-waf.png)

> Suppose that your application has been receiving malicious network requests from several IP addresses. You want to prevent these requests from continuing to access your application, but you also want to ensure that legitimate users can still access it. You configure the web ACL to allow all requests except those from the IP addresses that you have specified.