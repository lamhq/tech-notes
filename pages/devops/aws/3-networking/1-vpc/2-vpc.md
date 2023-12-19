# Amazon Virtual Private Cloud (VPC)

## Overview

A VPC is an isolated network you create in the AWS cloud, similar to a traditional network in a data center.

You have complete control of virtual network, including your own IP address range, subnets, route tables, and network gateways.

When you create a VPC, you need to choose three main things.

- The name of your VPC.
- A Region for your VPC to live in. A VPC can span multiple AZ within that Region.
- A IP range for your VPC in CIDR notation.

![](https://d2908q01vomqb2.cloudfront.net/77de68daecd823babbb58edb1c8e14d7106e83bb/2021/06/15/VPC-Network-Engineers-Part-1-1.png)

When we creat a VPC, it's going to create a route table, a network ACL, a router, a security group.

A VPC can only have one internet gateway attached.


## Subnet

A subnet is a section of a VPC that can contain resources (such as Amazon EC2 instances)

A subnet is belong to an AZ.

When you create a subnet, you need to choose three settings.

- The  VPC you want your subnet to live in, in this case VPC (`10.0.0.0/16`).
- The Availability  Zone you want your subnet to live in, in this case `AZ1`.
- A CIDR  block for your subnet, which must be a subset of the VPC CIDR block, in  this case `10.0.0.0/24`.


### Public and private subnet

Subnets can be public or private.

**Public subnets** contain resources that need to be accessible by the public. Subnet's traffic is routed to an internet gateway. You need to enable "auto-assign public IPv4 address" in subnet setting.

**Private subnets** contain resources that should be accessible only through your private network, such as a database.

In a VPC, subnets can communicate with each other.


### Reserved IPs

For AWS to configure your VPC appropriately, AWS reserves five IP addresses in each subnet. These IP addresses are used for routing, Domain Name System (DNS), and network management.

*For example, consider a VPC with the IP range `10.0.0.0/22`. The VPC includes 1,024 total IP addresses. This is divided into four equal-sized subnets, each with a `/24` IP range with 256 IP addresses. Out of each of those IP ranges, there are only 251 IP addresses that can be used because AWS reserves five.*

![](https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/aws-networking/discover-amazon-vpc/images/c6d157a9777667feb02751f85c900413_b-7-eac-832-5-d-64-4-f-24-bfe-3-41-c-320-b-7-e-6-fc.png)


### Best practices

- **Maintain redundancy and fault tolerance**: When you create your subnets, create at least two subnets configured in two different Availability Zones. In this case, if one of these AZs fail, you still have your resources in another AZ available as backup.
  ![](https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/aws-networking/discover-amazon-vpc/images/b609055191d4d3b1230a3b3d9f9ee96b_608-f-724-d-c-63-d-4-d-6-a-880-d-407-fc-5-f-4-ae-20.png)
- **Setting IP range**: A common practice is to create a VPC with a IP range of `/16` and create subnets with a IP range of `/24`. This provides a large amount of IP addresses to work with at both the VPC and subnet level.


## Default VPC

Every AWS account comes with a default VPC in every region.

Default VPC is user friendly. All their subnets have a route out to the internet. You don't have to worry about networking components.

Each EC2 instance in the default VPC has both a public and private IP address.
