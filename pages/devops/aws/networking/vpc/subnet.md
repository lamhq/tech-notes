# Subnet

A subnet is a section of a VPC that can contain resources (such as Amazon EC2 instances)

A subnet is belong to an AZ.

AZs names are mapped to different zones for different users (i.e. the AZ `ap-southeast-2a` may map to a different physical zone for a different user).

When you create a subnet, you need to choose three settings.

- The  VPC you want your subnet to live in.
- The Availability  Zone you want your subnet to live in.
- A CIDR  block for your subnet, which must be a subset of the VPC CIDR block.

In a VPC, subnets can communicate with each other.


## Public and private subnet

Subnets can be public or private.

**Public subnets**:
- `Auto-assign public IPv4 address` is set to `Yes`.
- The subnet route table has an attached Internet Gateway.

**Private subnets**: contain resources that should be accessible only through your private network, such as a database.


## Reserved IPs

**AWS reserves five IP addresses in each subnet**. These IP addresses are used for routing, Domain Name System (DNS), and network management.

*For example, consider a VPC with the IP range `10.0.0.0/22`. The VPC includes 1,024 total IP addresses. This is divided into four equal-sized subnets, each with a `/24` IP range with 256 IP addresses. Out of each of those IP ranges, there are only 251 IP addresses that can be used because AWS reserves five.*

![](https://media.licdn.com/dms/image/D4E12AQEu7jlm0CpbhA/article-cover_image-shrink_600_2000/0/1678029438590?e=2147483647&v=beta&t=790i4NTQzpGOn7sTBbrgFn83rvpwmk78WjzDaLtY-GU)


## Best practices

- **Maintain redundancy and fault tolerance**: When you create your subnets, create at least two subnets configured in two different Availability Zones. In this case, if one of these AZs fail, you still have your resources in another AZ available as backup.
- **Setting IP range**: A common practice is to create a VPC with a IP range of `/16` and create subnets with a IP range of `/24`. This provides a large amount of IP addresses to work with at both the VPC and subnet level.
