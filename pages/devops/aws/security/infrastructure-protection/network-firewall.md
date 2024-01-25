# AWS Network Firewall

## Overview

Network Firewall is a managed service that makes it easy to deploy **physical firewall** protection across your **VPCs**.

It gives you control and visibility of **VPC-to-VPC traffic** to logically separate networks hosting sensitive applications or line-of-business resources.

It includes a firewall rules engine that allow you to block outbound Server Message Block (SMB) requests to stop the spread of malicious activity.

Use cases:
- Filtering your network traffic before it reaches your internet gateway
- Require intrusion prevention systems
- Tracking connections and protocol identification
- Enforce policies such as preventing your VPCs from accessing domains using an unauthorized protocol
- Any hardware firewall requirements...


## Benefits

Network Firewall has physical infrastructure in the AWS datacenter that is managed by AWS staff - so you don't need to worry about management overheads.

AWS Network Firewall works with **AWS Firewall Manager,** so you can centrally manage security policies across existing and newly created accounts and VPCs.

It also provides an intrusion prevention system (IPS) that gives you active traffic flow inspection.


## Features

### Filter Internet Traffic
You can use methods like access control list (ACL) rules, stateful inspection, protocol detection, and intrusion prevention to filter your internet traffic.

### Filter Outbound Traffic
You can use a network firewall to provide the URL/ domain name, IP address, and content-based outbound traffic filtering. This will help you to stop possible data loss and block known malware communications.

### Inspect VPC-to-VPC Traffic
You can automatically inspect traffic moving from one
VPC to another as well as across multiple accounts.