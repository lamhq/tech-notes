# AWS Shield

## Overview

AWS Shield is a service that safeguards applications running on AWS against:
- DDoS, SYN/UDP floods
- Reflection attacks
- Layer 3 and Layer 4 attacks. 

AWS Shield provides always-on detection and automatic inline mitigations that minimize application downtime and latency, so there is no need to engage AWS Support to benefit from DDoS protection.

There are two tiers of AWS Shield: **Standard** and **Advanced**.


## AWS Shield Standard

AWS Shield Standard automatically protects your AWS resources from the **most common types of DDoS attack**. 

AWS Shield Standard uses a variety of analysis techniques to detect malicious traffic in real time and automatically mitigates it.

When using AWS Shield Standard with **Amazon CloudFront** and **Amazon Route 53**, you receive comprehensive availability protection against all known infrastructure (Layer 3 and 4) attacks.

No additional charge.


## AWS Shield Advanced

Provides **enhanced protections** against attacks targeting resources from:
- Amazon EC2
- Elastic Load Balancing (ELB),
- Amazon CloudFront
- AWS Global Accelerator
- Amazon Route 53.

Provides additional detection and mitigation against large and sophisticated DDoS attacks, near real-time visibility into attacks, and integration with AWS WAF.

Gives you **24/7 access to the DDoS Response Team** (DRT).

Cost **$3000** per month.

### DDoS cost protection

A safeguard from scaling charges because of a DDoS attack that causes usage spikes on protected resources.

If any of the AWS Shield Advanced protected resources scale up in response to a DDoS attack, you can request credits via the regular AWS Support channel.
