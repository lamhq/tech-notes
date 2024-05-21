# VPC to Internet

## Internet Gateway

![](https://www.learnaws.org/assets/img/public-private-subnet/public-subnet.png)

An Internet Gateway is a horizontally scaled, redundant, and highly available VPC component that allows communication between instances in your VPC and the internet.

An Internet Gateway serves two purposes:
- Provide a target in your VPC route tables for internet-routable traffic.
- Perform network address translation (NAT) for instances that have been assigned public IPv4 addresses.

IGW is horizontally scaled, redundant and HA.

IGW supports IPv4 and IPv6.

Internet Gateways (IGW) must be:
- created and then attached to a VPC
- added to a route table
- associated with the relevant subnet(s).

You can only attach one Internet gateway to a VPC.

IGWs must be detached before they can be deleted.

### Enable Internet access for instances in a subnet

1. Attach an Internet Gateway to your VPC.
2. Ensure that your subnet’s route table points to the Internet Gateway. Must update subnet route table to point to IGW, either:
   - To all destinations, e.g. 0.0.0.0/0 for IPv4 or ::/0for IPv6.
   - To specific public IPv4 addresses, e.g. your company’s public endpoints outside of AWS.
3. Ensure that instances in your subnet have a globally unique IP address (public IPv4 address, Elastic IP address, or IPv6 address).
4. Ensure that your network access control and security group rules allow the relevant traffic to flow to and from your instance.


### Egress-only Internet Gateway

IPv6 addresses are globally unique and public by default. **Every device connected to the internet has a unique IPv6 address** can be accessed from anywhere in the world.

If you want to prevent resources on the internet from initiating communication with your device, you can use an egress-only internet gateway.

An Egress-only Internet Gateway allows outbound communication over IPv6 from instances in your VPC to the Internet.

Prevents the Internet from initiating an IPv6 connection with your instances.

It's stateful, can forward traffic from instance to Internet and then sends back the response.

You must create a custom route for `::/0` to the Egress-Only Internet Gateway.

Must use Egress-Only Internet Gateway instead of NAT for IPv6.


## NAT Instance

A NAT instance is an EC2 instance that perform NAT.

Used to enable private subnet instances to access the Internet.

NAT instances are managed by you.

NAT instance must live on a public subnet with a route to an Internet Gateway.

Private instances in private subnets must have a route to the NAT instance, usually the default route destination of `0.0.0.0/0`.

When creating NAT instances always disable the source/destination check on the instance.

NAT instances must be in a single public subnet.

NAT instances need to be assigned to security groups. Security groups for NAT instances must allow HTTP/HTTPS inbound from the private subnet and outbound to `0.0.0.0/0`.

There needs to be a route from a private subnet to the NAT instance for it to work.

The amount of traffic a NAT instance can support is based on the instance type.

Using a NAT instance can lead to bottlenecks (not HA). HA can be achieved by using Auto Scaling groups, multiple subnets in different AZ’s and a script to automate failover.

Performance is dependent on instance size.

Can scale up instance size or use enhanced networking.

Can scale out by using multiple NATs in multiple subnets.

Can use as a bastion (jump) host.

Can monitor traffic metrics.

Not supported for IPv6 (use Egress-Only Internet Gateway).


## NAT Gateways

A NAT gateway is a VPC component that run inside a subnet.

It enable instances in a private subnet to connect to the internet (or AWS services) but external services **cannot initiate a connection** with those instances.

NAT gateways are managed by AWS. It replaces the need for NAT instances on EC2.

NAT gateways are preferred by enterprises.

It is automatically assigned an public IP address when created (use an Elastic IP address for the public IP).

It's scalable. Starts at 5 Gbp, can scale up to 45 Gbps.

Private instances in private subnets must have a route to the NAT instance, usually the default route destination of `0.0.0.0/0`.

NAT gateways are not associated with security groups.

No need to disable source/destination checks.

NAT Gateways cannot be used to access VPC peering, VPN or Direct Connect, so be sure to include specific routes to those in your route table.

Not supported for IPv6 (use Egress-Only Internet Gateway).

Port forwarding is not supported.

Traffic metrics are not supported.


### Availability

A NAT gateway is created in a specified AZ with redundancy in that zone.

For multi-AZ redundancy, create NAT Gateways in each AZ with routes for private subnets to use the local gateway.

### Enable internet access for instances in private subnets

- Create a NAT Gateway in the public subnet.
- In the route table of the private subnet, add a route to direct network traffic to the NAT gateway.


### NAT Gateway vs. NAT Instance

|  | NAT Gateway | NAT Instance |
|---|---|---|
| Managed | Managed by AWS | Managed by you|
| Availability | Highly available within an AZ | Not highly available (would require scripting) |
| Bandwidth | Up to 45 GPS | Depends on the bandwidth of the EC2 instance you selected |
| Performance  | Optimized for NAT | Amazon Linux 2 AMI configured to perform NAT |
| Public IP | Elastic IP cannot be detached | Elastic IP that can be detached |
| Security Groups | Cannot associate with a security group | Can associate with a security group |
| Bastion Host | Not supported | Can be used as a bastion host |
