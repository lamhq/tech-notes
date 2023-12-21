# VPC to on-premises networks

## AWS Site-to-Site VPN

### Overview

AWS Virtual Private Network allows to connect a VPC to an on-premises network via a secure connection that goes over the public Internet.

You create a VPN connection by configuring a **Virtual Private Gateway** or **Transit Gateway** on the AWS side. Then configuring your on-premises router called **Customer gateway** to build an encrypted VPN tunnel.

![](https://docs.aws.amazon.com/images/whitepapers/latest/aws-vpc-connectivity-options/images/aws-managed-vpn.png)

It lets you reuse existing VPN equipment and processes and also use existing internet connections.

It is an AWS-managed high availability VPN service.

Supports Internet Protocol security (IPsec) VPN connections.

Supports static routes or dynamic Border Gateway Protocol (BGP) peering and routing policies.


### Virtual Private Gateway

A virtual private gateway is the VPN endpoint on the Amazon side of your Site-to-Site VPN connection that can be attached to a single VPC.

If you want to connect to instances in private subnets, we could attach a virtual private gateway to our VPC, establish an VPN connection, and then you can communicate to instances in private subnets.

![](https://docs.aws.amazon.com/images/vpn/latest/s2svpn/images/vpn-how-it-works-vgw.png)

IPv6 traffic is not supported for VPN connections on a virtual private gateway.


### Transit Gateway

A transit hub that can be used to interconnect multiple VPCs and on-premises networks. It's a VPN endpoint for the Amazon side of the Site-to-Site VPN connection.

- Simplifies your network, avoid creating separate VPN connection for each VPCs or on-premises networks you want to connect.
- Allows you to have transitive peering between thousands of VPCs and on-premises data centers.
- Works on a hub-and-spoke model.
- Can work across regions.
- Can work across multiple AWS accounts using RAM (Resource Access Manager)
- You can use route tables to limit how VPCs talk to one another.
- Works with Direct Connect as well as VPN connections.
- Supports IP multicast: send a packet to thousand of hosts across a routed network.

![](https://docs.aws.amazon.com/images/vpn/latest/s2svpn/images/vpn-how-it-works-tgw.png)


### Customer gateway device

A physical device or software application on your side of the Site-to-Site VPN connection.

You configure the device to work with the Site-to-Site VPN connection.


### Customer gateway

An AWS resource which provides information to AWS about your customer gateway device.


## Direct Connect

AWS Direct Connect is a service that enables you to establish a **dedicated connection from your premises to AWS**.

Useful for high-thoughput workloads. Helpful when you need a stable and reliable secure connection.

You can reduce your network costs, increase bandwidth throughput, and provide a more consistent network experience than internet-based connections.

Direct Connect is **not encrypted by default**.

![](https://docs.aws.amazon.com/images/whitepapers/latest/aws-vpc-connectivity-options/images/image6.png)

### Types of Direct Connect Connection

- **Dedicated Connection**: A physical Ethernet connection associated with a single customer. Customers can request a dedicated connection through the AWS Direct Connect console, the CLI, or the API.
- **Hosted Connection**: A physical Ethernet connection that an AWS Direct Connect Partner provisions on behalf of a customer. Customers request a hosted connection by contacting a partner in the AWS Direct Connect Partner Program, who provisions the connection.

### VPNs vs. Direct Connect

VPNs allow private communication, but it still traverses the public internet to get the data delivered. While secure, it can be painfully slow.

Direct Connect is Fast, Secure, Reliable, Able to take massive throughout. For the last level of security, you can run a VPN over a Direct Connect connection.


## VPN CloudHub

If you have multiple sites, each with its own VPN connection, you can use AWS VPN CloudHub to connect those sites together, it helps you to secure your VPN Hub.

AWS VPN CloudHub is low cost and easy to manage. Though it operates over the public internet, all traffic between the customer gateway and the AWS VPN CloudHub is encrypted.

![](https://docs.aws.amazon.com/images/vpn/latest/s2svpn/images/AWS_VPN_CloudHub-diagram.png)
