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

- The  VPC you want your subnet to live in.
- The Availability  Zone you want your subnet to live in.
- A CIDR  block for your subnet, which must be a subset of the VPC CIDR block.


### Public and private subnet

Subnets can be public or private.

**Public subnets** directly connected to an internet gateway, allowing resources within it to access the public internet. You need to enable "auto-assign public IPv4 address" in subnet setting.

**Private subnets** contain resources that should be accessible only through your private network, such as a database.

In a VPC, subnets can communicate with each other.


### Reserved IPs

**AWS reserves five IP addresses in each subnet**. These IP addresses are used for routing, Domain Name System (DNS), and network management.

*For example, consider a VPC with the IP range `10.0.0.0/22`. The VPC includes 1,024 total IP addresses. This is divided into four equal-sized subnets, each with a `/24` IP range with 256 IP addresses. Out of each of those IP ranges, there are only 251 IP addresses that can be used because AWS reserves five.*

![](https://media.licdn.com/dms/image/D4E12AQEu7jlm0CpbhA/article-cover_image-shrink_600_2000/0/1678029438590?e=2147483647&v=beta&t=790i4NTQzpGOn7sTBbrgFn83rvpwmk78WjzDaLtY-GU)


### Best practices

- **Maintain redundancy and fault tolerance**: When you create your subnets, create at least two subnets configured in two different Availability Zones. In this case, if one of these AZs fail, you still have your resources in another AZ available as backup.
- **Setting IP range**: A common practice is to create a VPC with a IP range of `/16` and create subnets with a IP range of `/24`. This provides a large amount of IP addresses to work with at both the VPC and subnet level.


## Default VPC

Every AWS account comes with a default VPC in every region.

Default VPC is user friendly. All their subnets have a route out to the internet. You don't have to worry about networking components.

Each EC2 instance in the default VPC has both a public and private IP address.
