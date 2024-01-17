# IP Addresses

There are three types of IP address that can be assigned to an Amazon EC2 instance:

- **Public**: public address that is assigned automatically to instances in public subnets and reassigned if instance is stopped/started.
- **Elastic IP**: public address that is static.
- **Private**: private address assigned automatically to all instances.


## Public IP

Public IPv4 addresses are retained if you restart the instance.

Public IP addresses are assigned for instances in public subnets (VPC).


## Elastic IP

All accounts are limited to 5 elastic IPs per region by default; can be raised by a service limit increase to AWS Support.

An Elastic IP address is for use in a specific region only.

AWS charges for elastic IP’s when they’re not being used.

Can be moved between Elastic Network Adapters

You can assign custom tags to your Elastic IP addresses to categorize them.

You can assign or remove IP addresses from EC2 instances while they are running or stopped.

*Exam tip: You can stop and start an EC2 instance to move it to a different physical host if EC2 status checks are failing or there is planned maintenance on the current physical host.*