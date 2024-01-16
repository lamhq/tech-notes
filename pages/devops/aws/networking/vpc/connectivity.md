# VPC Connectivity

## VPC connect options

Options for connecting to a VPC are:
- Hardware based VPN.
- Direct Connect.
- VPN CloudHub.
- Software VPN.


## Gateway terminology

### Virtual Private Gateway

VPC endpoint on the AWS side of your Site-to-Site VPN connection.

Must be attached to a VPC.

Allow communications to instances in private subnets from a VPN connection.

Not support IPv6.

![](https://docs.aws.amazon.com/images/vpn/latest/s2svpn/images/vpn-how-it-works-vgw.png)


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


## Methods

There are several methods of connecting to a VPC. These include:

- AWS Managed VPN.
- AWS Direct Connect.
- AWS Direct Connect plus a VPN.
- AWS VPN CloudHub.
- Software VPN.
- Transit VPC.
- VPC Peering.
- AWS PrivateLink.
- VPC Endpoints.
