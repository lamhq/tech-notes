# Internet Access Guide

Enable internet access for a subnet with Internet Gateway:

1. Enable the **Auto-assign public IPv4 address** feature for the subnet.
1. Create a new internet gateway and attach it to the VPC.
1. Create a new route table in the VPC
1. Add a route for the route table with `Destination: 0.0.0.0/0` and target is the created internet gateway.
1. Associate route table with the subnet.
1. Now all instances in the subnet should have internet access.
1. For any issue, check the instance's security group and subnet's NACL.
