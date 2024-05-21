# VPC Connectivity

## Connect options

Options for connecting to a VPC are:
- Hardware based VPN.
- Direct Connect.
- VPN CloudHub.
- Software VPN.


## Connect methods

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


## Gateway terminology

### Hub-and-spoke model

In this model, the hub is the central point of communication, while the spokes are the remote sites that connect to the hub.


### Virtual Private Gateway

VPC endpoint on the AWS side of your Site-to-Site VPN connection.

Must be attached to a VPC.

Allow communications to instances in private subnets from a VPN connection.

Not support IPv6.

![](https://docs.aws.amazon.com/images/vpn/latest/s2svpn/images/vpn-how-it-works-vgw.png)


### Transit Gateway

AWS Transit Gateway connects your Amazon Virtual Private Clouds (VPCs) and on-premises networks through a central hub.

It simplifies your network. Allows you to have transitive peering between thousands of VPCs and on-premises data centers.

It acts as a cloud router; each new connection is only made once.

It's a VPN endpoint for the Amazon side of the Site-to-Site VPN connection.

Works on a hub-and-spoke model.

Can work across regions.

Can work across multiple AWS accounts using RAM (Resource Access Manager)

You can use route tables to limit how VPCs talk to one another.

Works with Direct Connect, as well as VPN connections.

Supports IP multicast: send a packet to thousand of hosts across a routed network.

![](https://docs.aws.amazon.com/images/vpn/latest/s2svpn/images/vpn-how-it-works-tgw.png)


### Customer gateway device

A physical device or software application on your side of the Site-to-Site VPN connection.

You configure the device to work with the Site-to-Site VPN connection.


### Customer gateway

An AWS resource which provides information to AWS about your customer gateway device.
