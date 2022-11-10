# Amazon VPC

## Amazon VPC

A VPC is an isolated network you create in the AWS cloud, similar to a traditional network in a data center. When you create a VPC, you need to choose three main things.

- The name of your VPC.
- A Region for your VPC to live in. Each VPC spans multiple Availability Zones within the Region you choose.
- A IP range for your VPC in CIDR notation.

![](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/kE8VCk32RPiPFQpN9kT4Lw_af022fa3bad0433d9b8b3e6d90064abb_introVPC_1.jpeg?expiry=1662508800000&hmac=EwBO6uTjL-mhu-Vy1SekCWRJt4ehZhauvWmln6JEbks)


## Subnet

Think of subnets as smaller networks inside your base network—or virtual area networks (VLANs) in a traditional, on-premises network.

In AWS, subnets are used for high availability and providing different connectivity options for your resources.

When you create a subnet, you need to choose three settings.

- The  VPC you want your subnet to live in, in this case VPC (`10.0.0.0/16`).
- The Availability  Zone you want your subnet to live in, in this case `AZ1`.
- A CIDR  block for your subnet, which must be a subset of the VPC CIDR block, in  this case `10.0.0.0/24`.

![](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/D5Pd-oYISyCT3fqGCLsgxg_de756a8af57b48c0a4d99508da6f6218_Screen-Shot-2021-01-19-at-1.07.15-PM.png?expiry=1662508800000&hmac=1cvn7Kd9S6V2a0yUD_gtcj8ZJdv8_Vq-rzAaGhusBrI)


## High Availability with A VPC

When you create your subnets, in order to maintain redundancy and fault tolerance, create at least two subnets configured in two different Availability Zones.

In this case, if one of these AZs fail, you still have your resources in another AZ available as backup.

![](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/vh_Q1TwVSr6f0NU8FWq-3A_34a546d50f304dabbd047849aa70d923_Screen-Shot-2021-01-19-at-1.11.17-PM.png?expiry=1662508800000&hmac=yN_ShRWcp_j6_rMUKaV-l3t8qDf5dU8tsLsuK7OlgYo)


## Reserved IPs

For AWS to configure your VPC appropriately, AWS reserves five IP addresses in each subnet. These IP addresses are used for routing, Domain Name System (DNS), and network management.

*For example, consider a VPC with the IP range `10.0.0.0/22`. The VPC includes 1,024 total IP addresses. This is divided into four equal-sized subnets, each with a `/24` IP range with 256 IP addresses. Out of each of those IP ranges, there are only 251 IP addresses that can be used because AWS reserves five.*

![](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/2xyjkGLySbGco5Bi8lmxkw_ad3d1b2c0a774f0e94c9279fbb6a9a73_IntroVPC_3.jpeg?expiry=1662508800000&hmac=ZhpYxgsr6oNwKSFLV1INamWzWXfvz9CM_OMV2NxIz2k)

A common starting place for those who are new to the cloud is to create a VPC with a IP range of `/16` and create subnets with a IP range of `/24`. This provides a large amount of IP addresses to work with at both the VPC and subnet level.


## Internet Gateway

To enable internet connectivity for your VPC, you need to create an internet gateway.

Think of this gateway as similar to a modem. Just as a modem connects your computer to the internet, the internet gateway connects your VPC to the internet.

After you create an internet gateway, you then need to attach it to your VPC.


## Virtual Private Gateway

A virtual private gateway allows you to connect your AWS VPC to another private network.

Once you create and attach a VGW to a VPC, the gateway acts as anchor on the AWS side of the connection. On the other side of the connection, you'll need to connect a customer gateway to the other private network.

A customer gateway device is a physical device or software application on your side of the connection. Once you have both gateways, you can then establish an encrypted VPN connection between the two sides.