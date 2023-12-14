# AWS Network Firewall

## Overview

Network Firewall is a managed service that makes it easy to deploy physical firewall protection across your VPCs.

It has a managed infrastructure (i.e., a physical firewall that is managed by AWS).

Network Firewall includes a firewall rules engine that gives you complete control over your network traffic, allowing you to do things such as block outbound Server Message Block (SMB) requests to stop the spread of malicious activity.

Keywords:
- filtering your network traffic before it reaches your internet gateway
- require intrusion prevention systems 
- any hardware firewall requirements...


## Benefits

Network Firewall has physical infrastructure in the AWS datacenter that is managed by AWS staff - so you don't need to worry about management overheads.

AWS Network Firewall works with **AWS Firewall Manager,** so you can centrally manage security policies across existing and newly created accounts and VPCs.

It also provides an intrusion prevention system (IPS) that gives you active traffic flow inspection.


## Use cases

### Filter Internet Traffic
You can use methods like access control list (ACL) rules, stateful inspection, protocol detection, and intrusion prevention to filter your internet traffic.

### Filter Outbound Traffic
You can use a network firewall to provide the URL/ domain name, IP address, and content-based outbound traffic filtering. This will help you to stop possible data loss and block known malware communications.

### Inspect VPC-to-VPC Traffic
You can automatically inspect traffic moving from one
VPC to another as well as across multiple accounts.