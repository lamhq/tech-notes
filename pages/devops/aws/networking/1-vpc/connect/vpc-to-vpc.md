# VPC to VPC

## VPC Peering

Allows you to connect 2 VPCs via a direct network route using private IP addresses.

Instances behave as if they were on the same private network.

You can peer between regions and accounts.

Peering is one to one. No transitive peering.

Peered VPCs must not have overlapping CIDR blocks.


## AWS PrivateLink

PrivateLink is the best way to **peer (expose services in) your VPC to tens, hundreds, or thousands of customer VPCs**.

Doesn't require VPC peering; no route tables, NAT gateways, internet gateways, etc.

Requires a Network Load Balancer on the service VPC and an ENI on the customer VPC.

![](./images/privatelink.png)
