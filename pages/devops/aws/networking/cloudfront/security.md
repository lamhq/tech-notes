# Security

## Field-Level Encryption

Field-level encryption adds an additional layer of security on top of HTTPS that lets you protect specific data so that it is only visible to specific applications.

Field-level encryption allows you to securely upload user-submitted sensitive information to your web servers.

The sensitive information is encrypted at the edge closer to the user and remains encrypted throughout application processing.


## AWS WAF

AWS WAF is a web application firewall that lets you monitor HTTP and HTTPS requests that are forwarded to CloudFront and lets you control access to your content.

With AWS WAF you can shield access to content based on conditions in a web access control list (web ACL) such as:

- Origin IP address.
- Values in query strings.

CloudFront responds to requests with the requested content or an HTTP 403 status code (forbidden).

CloudFront can also be configured to deliver a custom error page.

Need to associate the relevant distribution with the web ACL.


## DDoS protection

CloudFront distributes traffic across multiple edge locations and filters requests to ensure that only valid HTTP(S) requests will be forwarded to backend hosts.

CloudFront also supports geo-blocking, which you can use to prevent requests from geographic locations from being served.