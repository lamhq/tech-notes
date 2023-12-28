# Amazon VPC Routing

## The Main Route Table

When you create a VPC, AWS creates a route table called the main route table.

A route table contains a set of rules, called routes, that are used to determine where network traffic is directed. 

AWS assumes that when you create a new VPC with subnets, you want traffic to flow between them. Therefore, the default configuration of the main route table is to allow traffic between all subnets in the local network.


## Custom Route Tables

Each subnet in your VPC must be associated with a route table. You can associate a subnet with a particular route table. Otherwise, the subnet is implicitly associated with the main route table.

By default, each custom route table you create will have the local route already inside it, allowing communication to flow between all resources and subnets inside the VPC.


## Route table concepts

- **Destination**: specifies the pattern that a network request must match with its destination address (usually an IP address or a CIDR range)
- **Target**: specifies where network traffic matching the specified destination should be routed. It can be:
  - Internet gateway
  - NAT Gateway
  - Network interface
  - Virtual Private Gateway
  - Transit Gateway
- **Local route**: A default route for communication within the VPC
