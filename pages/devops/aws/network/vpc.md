# Amazon Virtual Private Cloud (VPC)

## Overview

A VPC is an isolated network you create in the AWS cloud, similar to a traditional network in a data center.

You have complete control of virtual network, including your own IP address range, subnets, route tables, and network gateways.

Required information when creating a VPC:
- VPC's name.
- a Region for your VPC to live in. 
- a IP range for your VPC in CIDR notation.

![](https://d2908q01vomqb2.cloudfront.net/77de68daecd823babbb58edb1c8e14d7106e83bb/2021/06/15/VPC-Network-Engineers-Part-1-1.png)

When we creat a VPC, it's going to create a route table, a network ACL, a router, a security group.

A VPC can and should be spread over multiple AZ within a Region. This is achieved by creating subnets that exist in an AZ.

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


## VPC Flow Logs

Flow Logs capture information about the IP traffic going to and from network interfaces in a VPC.

Flow log data is stored using Amazon CloudWatch Logs.

Flow logs can be created at the following levels:
- VPC.
- Subnet.
- Network interface.

You can’t enable flow logs for VPC’s that are peered with your VPC unless the peer VPC is in your account.

You can’t tag a flow log.

You can’t change the configuration of a flow log after it’s been created (you need to delete and re-create).

Not all traffic is monitored, e.g. the following traffic is excluded:
- Traffic that goes to Route53.
- Traffic generated for Windows license activation.
- Traffic to and from 169.254.169.254 (instance metadata).
- Traffic to and from 169.254.169.123 for the Amazon Time Sync Service.
- DHCP traffic.
- Traffic to the reserved IP address for the default VPC router.


## High Availability Approaches for Networking

Best practice is to create at least two VPN tunnels into your Virtual Private Gateway.

Direct Connect is not HA by default, so you need to establish a secondary connection via another Direct Connect (ideally with another provider) or use a VPN.

Route 53’s health checks provide a basic level of redirecting DNS resolutions.

Elastic IPs allow you flexibility to change out backing assets without impacting name resolution.

For Multi-AZ redundancy of NAT Gateways, create gateways in each AZ with routes for private subnets to use the local gateway.

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
| VPC security groups per ENI | 5 |
| Active VPC peering connections | 50 |
| Outstanding VPC peering connection requests | 25 |
| Expiry time for an unaccepted VPC peering connection | 168 |
