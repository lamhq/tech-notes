# VPC to on-premises networks

## AWS Site-to-Site VPN

AWS Virtual Private Network allows to connect a VPC to an on-premises network via a secure connection that goes over the public Internet.

You create a VPN connection by configuring a **Virtual Private Gateway** or **Transit Gateway** on the AWS side. Then configuring your on-premises router called **Customer gateway** to build an encrypted VPN tunnel.

![](https://docs.aws.amazon.com/images/whitepapers/latest/aws-vpc-connectivity-options/images/aws-managed-vpn.png)

It lets you reuse existing VPN equipment and processes and also use existing internet connections.

It is an AWS-managed high availability VPN service.

Supports Internet Protocol security (IPsec) VPN connections.

Supports static routes or dynamic Border Gateway Protocol (BGP) peering and routing policies.


## AWS Direct Connect

AWS Direct Connect makes it easy to establish a **dedicated connection from an on-premises network to Amazon VPC**.

Useful for high-thoughput workloads. Helpful when you need a stable and reliable secure connection.

This private connection can reduce your network costs, increase bandwidth throughput, and provide a more consistent network experience than internet-based connections.

AWS Direct Connect does not encrypt traffic in transit.

AWS Direct Connect lets you establish 1 Gbps or 10 Gbps dedicated network connections (or multiple connections) between AWS networks and one of the AWS Direct Connect locations.

<!-- ![](https://docs.aws.amazon.com/images/whitepapers/latest/aws-vpc-connectivity-options/images/image6.png) -->

![](https://digitalcloud.training/wp-content/uploads/2022/01/VPC-2.jpg)


### Types of Direct Connect Connection

- **Dedicated Connection**: A physical Ethernet connection associated with a single customer. Customers can request a dedicated connection through the AWS Direct Connect console, the CLI, or the API.
- **Hosted Connection**: A physical Ethernet connection that an AWS Direct Connect Partner provisions on behalf of a customer. Customers request a hosted connection by contacting a partner in the AWS Direct Connect Partner Program, who provisions the connection.


## AWS Direct Connect plus VPN

VPNs allow private communication, but it still traverses the public internet to get the data delivered. While secure, it can be painfully slow.

Direct Connect is fast, secure, reliable, able to take massive throughout. For the last level of security, you can run a VPN over a Direct Connect connection.

This solution combines the AWS managed benefits of the VPN solution with low latency, increased bandwidth, more consistent benefits of the AWS Direct Connect solution, and an end-to-end, secure IPsec connection.


## AWS VPN CloudHub

The AWS VPN CloudHub operates on a simple hub-and-spoke model that you can use with or without a VPC.

In this model, the hub is the central point of communication, while the spokes are the remote sites that connect to the hub.

Use this design if you have multiple branch offices and existing internet connections and would like to implement a convenient, potentially low-cost hub-and-spoke model for primary or backup connectivity between these remote offices.

VPN CloudHub is used for hardware-based VPNs and allows you to configure your branch offices to go into a VPC and then connect that to the corporate DC (hub and spoke topology with AWS as the hub).

Can have up to 10 IPSec tunnels on a VGW by default.

Can have Direct Connect connections.

Hourly rates plus data egress charges.

AWS VPN CloudHub operates over the public internet.

All traffic between the customer gateway and the AWS VPN CloudHub is encrypted.

Uses eBGP.

Branches can talk to each other (and provides redundancy).

![](https://docs.aws.amazon.com/images/vpn/latest/s2svpn/images/AWS_VPN_CloudHub-diagram.png)
