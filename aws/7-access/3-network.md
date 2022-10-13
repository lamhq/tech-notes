# Network Isolation

## Amazon VPC

Amazon Virtual Private Cloud (Amazon VPC) lets you provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define. 


## Route Tables

A route table contains a set of rules, called routes, that are used to determine where network traffic is directed.

Each subnet in your VPC must be associated with a route table; the table controls the routing for the subnet.

A subnet can only be associated with one route table at a time, but you can associate multiple subnets with the same route table.


## AWS Direct Connect

AWS Direct Connect is a cloud service solution that makes it easy to establish a dedicated network connection from your premises to AWS.

AWS Direct Connect lets you establish a dedicated network connection between your network and one of the AWS Direct Connect locations.

This allows you to use the same connection to access public resources such as objects stored in Amazon S3 using public IP address space, and private resources such as Amazon EC2 instances running within an Amazon Virtual Private Cloud (VPC) using private IP space, while maintaining network separation between the public and private environments.


## VPC Endpoints (Private Links)

VPC Endpoints allows you to route your network traffic through a secure endpoint in one VPC and to another. This means they do not leave your AWS infrastructure, and do not go through the Internet resulting in a safer path of travel.

Without private link VPCs, we would need to send traffic through the Internet in order for VPCs to talk to each other.

When you configure a private link, you are indeed allowing traffic to flow directly between your VPCs.