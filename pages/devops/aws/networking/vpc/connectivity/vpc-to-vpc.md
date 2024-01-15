# VPC to VPC

## VPC Peering

Allows you to connect 2 VPCs via a direct network route using private IP addresses.

Instances behave as if they were on the same private network.

You can peer between regions and accounts.

Peering is one to one. No transitive peering.

Peered VPCs must not have overlapping CIDR blocks.


## VPC Endpoints

Allow connect your VPC to AWS services without leaving the Amazon internal network.

They are horizontally scaled, redundant, and highly available VPC components that **allow communication between instances in your VPC and services** without imposing availability risks or bandwidth constraints on your network traffic.

Do not require public IP addresses for instances in VPC.

![](./images/vpc-endpoint.png)

There're two types of VPC Endpoints:
- **Interface endpoint**: is an elastic network interface with a private IP address, serves as an entry point for traffic headed to another AWS services. Support a large number of AWS services.
- **Gateway endpoints**: similar to NAT gateways, is a virtual device you provision. Support S3 and DynamoDB.


## AWS PrivateLink

PrivateLink is the best way to **peer (expose services in) your VPC to tens, hundreds, or thousands of customer VPCs**.

Doesn't require VPC peering; no route tables, NAT gateways, internet gateways, etc.

Requires a Network Load Balancer on the service VPC and an ENI on the customer VPC.

![](./images/privatelink.png)
