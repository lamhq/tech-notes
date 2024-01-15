# Routing

## VPC Router

The VPC router performs routing between AZs within a region.

The VPC router connects different AZs together and connects the VPC to the Internet Gateway.


## Route table

Each subnet has a route table the router uses to forward traffic within the VPC.

Route tables also have entries to external destinations.

Each subnet can only be associated with one route table.

A route table can be assined to multiple subnets.


### The Main Route Table

When you create a VPC, AWS creates a route table called the main route table.

The default configuration of the main route table is to allow traffic between all subnets in the local network.

New subnets are always associated with the default route table (if not specified).

Cannot delete the main route table.

You can manually set another route table to become the main route table.


### Route table concepts

- **Destination**: specifies the pattern that a network request must match with its destination address (usually an IP address or a CIDR range)
- **Target**: specifies where network traffic matching the specified destination should be routed. It can be:
  - Internet gateway
  - NAT Gateway
  - Network interface
  - Virtual Private Gateway
  - Transit Gateway
- **Local route**: A default route for communication within the VPC


## Routing between subnets in a VPC

There is a default rule that allows all subnets (in a VPC) to communicate with one another.

Routing between subnets is always possible because of this rule (any problems communicating is more likely to be security groups or NACLs).

This cannot be deleted or modified.
