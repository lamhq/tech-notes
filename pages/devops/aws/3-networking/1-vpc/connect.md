# Connect your VPC

## Internet Gateway

To allow public traffic from the internet to access your VPC, you attach an internet gateway to the VPC.

![](https://www.learnaws.org/assets/img/public-private-subnet/public-subnet.png)


## NAT Gateways

You can use a network address translation (NAT) gateway to enable instances in a private subnet to connect to the internet (or AWS services) but external services **cannot initiate a connection** with those instances..

A NAT gateway is a VPC component that run inside a subnet.

It's scalable, starts at 5 Gbps to 45 Gbps.

It automatically is assigned an public IP address when created.

NAT gateways are not associated with security groups.

To enable internet access for instances in private subnets:
- Create a NAT Gateway in the public subnet.
- In the route table of the private subnet, add a route to direct network traffic to the NAT gateway.


### High Availability with NAT Gateways

If you have resources in multiple AZs and they share a NAT gateway, when the NAT gateway's AZ is down, resources in the other AZs lose internet access.

To create an Availability Zone-independent architecture, create a NAT gateway in each AZ and configure your routing to ensure resources use the NAT gateway in the same AZ.


## VPC Endpoints

You use VPC Endpoints when you want to **connect your VPC to AWS services without leaving the Amazon internal network**.

They are horizontally scaled, redundant, and highly available VPC components that **allow communication between instances in your VPC and services** without imposing availability risks or bandwidth constraints on your network traffic.

Instances in your VPC do not require public IP addresses to communicate with resources in the service.

![](./images/vpc-endpoint.png)

There're two types of VPC Endpoints:
- **Interface endpoint**: is an elastic network interface with a private IP address, serves as an entry point for traffic headed to another AWS services. Support a large number of AWS services.
- **Gateway endpoints**: similar to NAT gateways, is a virtual device you provision. Support S3 and DynamoDB


## Virtual Private Gateway

If you want to connect to instances in private subnets, we could attach a virtual private gateway to our VPC, establish an VPN connection, and then you can communicate to instances in private subnets.

![](https://docs.aws.amazon.com/images/vpn/latest/s2svpn/images/vpn-how-it-works-vgw.png)

> Once you create and attach a VGW to a VPC, the gateway acts as anchor on the AWS side of the connection. On the other side of the connection, you'll need to connect a customer gateway to the other private network.
>
> A customer gateway device is a physical device or software application on your side of the connection. Once you have both gateways, you can then establish an encrypted VPN connection between the two sides.


## Transit Gateway

AWS Transit Gateway connects VPCs and on-premises networks through **a central hub**.

This simplifies your network and puts an end to complex peering relationships. It acts as a cloud router - each new connection is only made once.

- Allows you to have transitive peering between thousands of VPCs and on-premises data centers.
- Works on a hub-and-spoke model.
- Works on a regional basis, but you can have it across multiple regions.
- You can use it across multiple AWS accounts using RAM (Resource Access Manager).
- You can use route tables to limit how VPCs talk to one another.
- Works with Direct Connect as well as VPN connections.
- Supports IP multicast: send a packet to thousand of hosts across a routed network.

![](https://docs.aws.amazon.com/images/whitepapers/latest/building-scalable-secure-multi-vpc-network-infrastructure/images/hub-and-spoke-design.png)


## VPC and VPC

### VPC Peering

Allows you to connect 1 VPC with another via a direct network route using private IP addresses.

Instances behave as if they were on the same private network.

You can peer VPCs with other AWS accounts as well as with other VPCs in the same account.

You can peer between regions.

Peering is one to one. No transitive peering.

If VPCs have the same CIDR address range, it wouldn't work.


### AWS PrivateLink

PrivateLink is the best way to **expose a service in your VPC to tens, hundreds, or thousands of customer VPCs**.

Doesn't require VPC peering; no route tables, NAT gateways, internet gateways, etc.

Requires a Network Load Balancer on the service VPC and an ENI on the customer VPC.

If you see a question asking about peering VPCs to tens, hundreds, or thousands of customer VPCs, think of AWS PrivateLink.

![](./images/privatelink.png)


## VPC and on-premises networks

### AWS Site-to-Site VPN (AWS Managed VPN)

AWS Managed VPN provides the option of creating an IPsec VPN connection between your remote networks and Amazon VPC over the internet.

It lets you reuse existing VPN equipment and processes and also use existing internet connections.

It is an AWS-managed high availability VPN service.

It supports static routes or dynamic Border Gateway Protocol (BGP) peering and routing policies.

![](https://docs.aws.amazon.com/images/whitepapers/latest/aws-vpc-connectivity-options/images/aws-managed-vpn.png)

On the AWS side of the Site-to-Site VPN connection, a **Virtual Private Gateway** or **Transit Gateway** provides two VPN endpoints (tunnels) for automatic failover. 

You configure your customer gateway device on the remote side of the Site-to-Site VPN connection.


### VPN CloudHub

If you have multiple sites, each with its own VPN connection, you can use AWS VPN CloudHub to connect those sites together, it helps you to secure your VPN Hub.

AWS VPN CloudHub is low cost and easy to manage. Though it operates over the public internet, all traffic between the customer gateway and the AWS VPN CloudHub is encrypted.

![](https://docs.aws.amazon.com/images/vpn/latest/s2svpn/images/AWS_VPN_CloudHub-diagram.png)


### Direct Connect

AWS Direct Connect is a service that enables you to establish a dedicated **connection from your premises to AWS**.

Useful for high-thoughput workloads. Helpful when you need a stable and reliable secure connection.

You can reduce your network costs, increase bandwidth throughput, and provide a more consistent network experience than internet-based connections.

Direct Connect is **not encrypted by default**.

![](https://docs.aws.amazon.com/images/whitepapers/latest/aws-vpc-connectivity-options/images/image6.png)

#### Types of Direct Connect Connection

- **Dedicated Connection**: A physical Ethernet connection associated with a single customer. Customers can request a dedicated connection through the AWS Direct Connect console, the CLI, or the API.
- **Hosted Connection**: A physical Ethernet connection that an AWS Direct Connect
Partner provisions on behalf of a customer. Customers request a hosted connection by contacting a partner in the AWS Direct Connect Partner Program, who provisions the connection.

#### VPNs vs. Direct Connect

VPNs allow private communication, but it still traverses the public internet to get the data delivered. While secure, it can be painfully slow.

Direct Connect is Fast, Secure, Reliable, Able to take massive throughout. For the last level of security, you can run a VPN over a Direct Connect connection.
