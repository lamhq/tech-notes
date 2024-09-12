# Security

## Field-Level Encryption

Field-level encryption adds an additional layer of security on top of HTTPS that lets you protect specific data so that it is only visible to specific applications.

Sensitive information is encrypted at the edge closer to the user and remains encrypted throughout application processing.

Use asymmetric encryption.

Usage: You specify set of fields in `POST` requests that you want to be encrypted (up to 10 fields) and the public key to encrypt them.

Example:
1. User submit credit card information to an edge location
2. we use Field-level encryption for the credit card information
3. The edge location will encrypt that field using a public key.
4. The encrypted data is passed from the edge location to Amazon CloudFront, to the origin, until the web server.
5. The web server willuse a private key to decrypt that encrypted field and get the credit card number.


## AWS Web Application Firewall

CloudFront is integrated with AWS WAF.

AWS WAF is a firewall that lets you monitor HTTP and HTTPS requests that are forwarded to CloudFront and lets you control access to your content.

With AWS WAF you can shield access to content based on conditions in a Web access control list (web ACL), such as:
- Origin IP address.
- Values in query strings.

CloudFront responds to requests with the requested content or an HTTP 403 status code (forbidden).

CloudFront can also be configured to deliver a custom error page.

Need to associate the relevant distribution with the web ACL.


## DDoS protection

CloudFront distributes traffic across multiple edge locations and filters requests to ensure that only valid HTTP(S) requests will be forwarded to backend hosts.

CloudFront also supports geo-blocking, which you can use to prevent requests from geographic locations from being served.