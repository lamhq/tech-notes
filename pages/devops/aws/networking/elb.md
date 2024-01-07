# Elastic Load Balancing

## Overview

![](https://media.amazonwebservices.com/blog/2014/elb_instances_1.png)

Elastic Load Balancing automatically distributes incoming application traffic across multiple healthy targets

Targets can be Amazon EC2 instances, containers, IP addresses, and Lambda functions.

Network traffic can be distributed across a single (or multiple) AZs within an AWS Region.

Only 1 subnet per AZ for each ELB.

For ALB at least 2 subnets must be specified.

For NLB only one subnet must be specified (recommended to add at least 2).

Deleting an ELB does not affect the instances registered against it.

By default the ELB has an idle connection timeout of 60 seconds.


## Internal vs. public facing ELB

Internet facing ELB:
- ELB nodes have public IPs
- Routes traffic to the private IP addresses of the EC2 instances
- Each defined AZ quire one public subnet
- ELB DNS name format: `<name>-<id-number>.<region>.elb.amazonaws.com`

Internal only ELB:
- ELB nodes have private IPs
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


## Monitoring

Monitoring takes place using:

**CloudWatch**: every 1 minute.
- ELB service only sends information when requests are active.
- Can be used to trigger SNS notifications.

**Access Logs**:
- Disabled by default.
- Includes information about the clients (not included in CloudWatch metrics).
- Can identify requester, IP, request type etc.
- Can be optionally stored and retained in S3.
- ALB also logs requests that never reached targets.

**CloudTrail**:
- Can be used to capture API calls to the ELB.
- Can be stored in an S3 bucket.


## Deregistration Delay

Deregistration Delay allows Load Balancers to keep existing connections open if the EC2 instances are de-registered or become unhealthy.

This enables the load balancer to complete in-flight requests made to instances that are de-registering or unhealthy.

You can disable deregistration delay if you want your load balancer to immediately close
connections to the instances that are de-registering or have become unhealthy.
