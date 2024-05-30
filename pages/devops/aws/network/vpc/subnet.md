# Subnet

## Overview

A subnet is a section of a VPC that can contain resources (such as Amazon EC2 instances)

When you create a subnet, you need to choose three settings.
- The  VPC you want your subnet to live in.
- The Availability  Zone you want your subnet to live in.
- A CIDR  block for your subnet, which must be a subset of the VPC CIDR block.

Resources in subnets within a VPC can communicate with each other.


## Address Ranges

Subnet address ranges are created within VPC address range.

The CIDR blocks of the subnets within a VPC cannot overlap.

IPv6 addresses are all public and the range is allocated by AWS.


## Availability Zones

Each subnet must reside entirely within one Availability Zone and cannot span zones.

AZs names are mapped to different zones for different users (i.e. the AZ `ap-southeast-2a` may map to a different physical zone for a different user).

Availability Zones are connected with low latency, high throughput, and highly redundant networking.


## Subnet types

Subnets can be public, private, or VPN-only.

### Public subnets
- `Auto-assign public IPv4 address` is set to `Yes`.
- Subnet with a route to Internet Gateway
- Instances within the subnet can be accessible from the Internet
- Typical use: frontend services (e.g. web server)

### Private subnets
- Subnet with no route to Internet Gateway
- Instances within the subnet can't be accessible from the Internet
- A NAT device can be used to allow outbound connections to the Internet
- Typical use: backend services (e.g. database server)

### VPN-only subnet
- has traffic routed to a virtual private gateway for a VPN connection
- doesn’t have a route to the internet gateway

## Reserved IPs

The first 4 and last 1 IP addresses in a subnet are reserved.

They are used for routing, Domain Name System (DNS), and network management.

*For example, consider a VPC with the IP range `10.0.0.0/22`. The VPC includes 1,024 total IP addresses. This is divided into four equal-sized subnets, each with a `/24` IP range with 256 IP addresses. Out of each of those IP ranges, there are only 251 IP addresses that can be used because AWS reserves five.*

![](https://media.licdn.com/dms/image/D4E12AQEu7jlm0CpbhA/article-cover_image-shrink_600_2000/0/1678029438590?e=2147483647&v=beta&t=790i4NTQzpGOn7sTBbrgFn83rvpwmk78WjzDaLtY-GU)


## Best practices

- **Maintain redundancy and fault tolerance**: When you create your subnets, create at least two subnets configured in two different Availability Zones. In this case, if one of these AZs fail, you still have your resources in another AZ available as backup.
- **Setting IP range**: A common practice is to create a VPC with a IP range of `/16` and create subnets with a IP range of `/24`. This provides a large amount of IP addresses to work with at both the VPC and subnet level.
