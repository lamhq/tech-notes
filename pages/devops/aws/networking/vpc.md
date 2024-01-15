# Amazon Virtual Private Cloud (VPC)

## Overview

Amazon VPC lets you provision a logically isolated section of the AWS cloud where you can launch AWS resources in a virtual network that you define.

A VPC is an isolated network you create in the AWS cloud, similar to a traditional network in a data center.

You have complete control of virtual network, including your own IP address range, subnets, route tables, and network gateways.

When you create a VPC, you need to choose three main things.

- The name of your VPC.
- A Region for your VPC to live in. A VPC can span multiple AZ within that Region.
- A IP range for your VPC in CIDR notation.

![](https://d2908q01vomqb2.cloudfront.net/77de68daecd823babbb58edb1c8e14d7106e83bb/2021/06/15/VPC-Network-Engineers-Part-1-1.png)

When we creat a VPC, it's going to create a route table, a network ACL, a router, a security group.

A VPC can only have one internet gateway attached.


## The Default VPC

A default VPC is created in each region with a subnet in each AZ.

The default VPC has all-public subnets. All subnets have a route out to the internet.

Instances in the default VPC has both a public and private IP address.


## VPC components

- **VPC**: A logically isolated virtual network in the AWS cloud. You define a VPC’s IP address space from ranges you select.
- **Subnet**: A segment of a VPC’s IP address range where you can place groups of isolated resources (maps to an AZ, 1:1).
- **Internet Gateway**: The Amazon VPC side of a connection to the public Internet.
- **NAT Gateway**: A highly available, managed Network Address Translation (NAT) service for your resources in a private subnet to access the Internet.
- **Hardware VPN Connection**: A hardware-based VPN connection between your Amazon VPC and your datacenter, home network, or co-location facility.
- **Virtual Private Gateway**: The Amazon VPC side of a VPN connection.
- **Customer Gateway**: Your side of a VPN connection.
- **Router**: Routers interconnect subnets and direct traffic between Internet gateways, virtual private gateways, NAT gateways, and subnets.
- **Peering Connection**: A peering connection enables you to route traffic via private IP addresses between two peered VPCs.
- **VPC Endpoints**: Enables private connectivity to services hosted in AWS, from within your VPC without using an Internet Gateway, VPN, Network Address Translation (NAT) devices, or firewall proxies.
- **Egress-only Internet Gateway**: A stateful gateway to provide egress only access for IPv6 traffic from the VPC to the Internet.


## VPC connect options

Options for connecting to a VPC are:
- Hardware based VPN.
- Direct Connect.
- VPN CloudHub.
- Software VPN.


## Networking Limits

| Name | Default Limit |
|---|---|
| VPCs | 5 |
| Subnets per VPC | 200 |
| Security groups per VPC | 500 |
| Rules per VPC security group | 50 |
| Network interfaces | 350 |
| Network ACLs per VPC | 200 |
| Rules per network ACL | 20 |
| Route tables per VPC | 200 |
| Entries per route table | 50 |
| EC2-Classic Elastic IPs | 5 |
| EC2-VPC Elastic IPs | 5 |
| VPC security groups per elastic network interface | 5 |
| Active VPC peering connections | 50 |
| Outstanding VPC peering connection requests | 25 |
| Expiry time for an unaccepted VPC peering connection | 168 |
