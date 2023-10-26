# Denial-of-Service Attacks

## Denial-of-Service Attacks

A denial-of-service (DDoS) attack is a deliberate attempt to make a website or application unavailable to users.

> For example, an attacker might flood a website or application with excessive network traffic until the targeted website or application becomes overloaded and is no longer able to respond.

If the website or application becomes unavailable, this denies service to users who are trying to make legitimate requests.

![](images/dos.png)


## Distributed Denial-of-Service Attacks

In a distributed denial-of-service (DDoS) attack, multiple sources are used to start an attack that aims to make a website or application unavailable.

This can come from a group of attackers, or even a single attacker. The single attacker can use multiple infected computers (also known as “bots”) to send excessive traffic to a website or application.

![](images/ddos.png)


## AWS Shield

To help minimize the effect of DoS and DDoS attacks on your applications, you can use AWS Shield.

AWS Shield is a service that protects applications against DDoS attacks. AWS Shield provides two levels of protection: **Standard** and **Advanced**.


### AWS Shield Standard

AWS Shield Standard automatically protects all AWS customers at no cost. It protects your AWS resources from the most common, frequently occurring types of DDoS attack. 

As network traffic comes into your applications, AWS Shield Standard uses a variety of analysis techniques to detect malicious traffic in real time and automatically mitigates it. 


### AWS Shield Advanced

AWS Shield Advanced is a paid service that provides detailed attack diagnostics and the ability to detect and mitigate sophisticated DDoS attacks. 

It also integrates with other services such as Amazon CloudFront, Amazon Route 53, and Elastic Load Balancing. Additionally, you can integrate AWS Shield with AWS WAF by writing custom rules to mitigate complex DDoS attacks.