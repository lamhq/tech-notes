# Elastic Load Balancing

## Overview

Elastic Load Balancing automatically distributes incoming application traffic across multiple healthy targets

Targets can be Amazon EC2 instances, containers, IP addresses, and Lambda functions.

Network traffic can be distributed across AZs within a Region.

Only 1 subnet per AZ for each ELB.

For ALB at least 2 subnets must be specified.

For NLB only one subnet must be specified (recommended to add at least 2).

Deleting an ELB does not affect the instances registered against it.

By default the ELB has an idle connection timeout of 60 seconds.

![](https://media.amazonwebservices.com/blog/2014/elb_instances_1.png)


## Internal vs. public facing ELB

Internet facing ELB:
- ELB nodes have public IPs
- Each defined AZ quire one public subnet
- Routes traffic to the private IP addresses of the EC2 instances
- ELB DNS name format: `<name>-<id-number>.<region>.elb.amazonaws.com`

Internal only ELB:
- ELB nodes have private IPs
- Do not need an Internet gateway.
- Routes traffic to the private IP addresses of the EC2 instances
- ELB DNS name format: `internal-<name>-<id-number>.<region>.elb.amazonaws.com`


## Health Checks

All AWS load balancers can be configured with health checks.

The load balancer performs health checks on all registered instances, whether the instance is in a healthy state (status = `InService`) or an unhealthy state (status = `OutOfService`).

When an instance is unhealthy, load balancer stops routing requests to that instance and resumes routing until it has been restored to a healthy state.


## DDoS protection

ELB only supports valid TCP requests so DDoS attacks such as UDP and SYN floods are not able to reach EC2 instances.

ELB also offers a single point of management and can serve as a line of defense between the internet and your backend.

You can also attach AWS Web Application Firewall (WAF) Web ACLs to Application Load Balancers to protect against web exploits.


## Deregistration Delay

Deregistration Delay allows Load Balancers to keep existing connections open if the EC2 instances are de-registered or become unhealthy.

This enables the load balancer to complete in-flight requests made to instances that are de-registering or unhealthy.

You can disable deregistration delay if you want your load balancer to immediately close
connections to the instances that are de-registering or have become unhealthy.
