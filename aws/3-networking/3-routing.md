# Amazon VPC Routing

## The Main Route Table

When you create a VPC, AWS creates a route table called the main route table.

A route table contains a set of rules, called routes, that are used to determine where network traffic is directed. 

AWS assumes that when you create a new VPC with subnets, you want traffic to flow between them. 

Therefore, the default configuration of the main route table is to allow traffic between all subnets in the local network.


## Custom Route Tables

If you associate a custom route table with a subnet, the subnet will use it instead of the main route table. 

By default, each custom route table you create will have the local route already inside it, allowing communication to flow between all resources and subnets inside the VPC.

![](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/69m1UQ52QS6ZtVEOdsEuvg_6d98f06359fd4ce9bd3233180011cf7d_Screen-Shot-2021-01-19-at-1.24.00-PM.png?expiry=1662595200000&hmac=Eqa_nS16LUS5lBykUe3FuEe_KHDVeCE7RhZM_XC2P6I)

Each subnet in your VPC must be associated with a route table, which controls the routing for the subnet. You can explicitly associate a subnet with a particular route table. Otherwise, the subnet is implicitly associated with the main route table.

## Route table concepts

- **Destination**: The range of IP addresses where you want traffic to go (destination CIDR). For example, an external corporate network with the CIDR `172.16.0.0/12`.
- **Target**: The gateway, network interface, or connection through which to send the destination traffic; for example, an internet gateway.
- **Local route**: A default route for communication within the VPC.
