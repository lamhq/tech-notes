# Amazon EC2 Auto Scaling

## Overview

Amazon EC2 Auto Scaling enables you to automatically add or remove Amazon EC2 instances in response to changing application demand.

You create collections of EC2 instances, called Auto Scaling groups.

Auto-scaling groups will contain the location of where your instances will live (VPC, subnet).

Instances are launched into at least two AZs.

Auto Scaling is a regional service.

You can use an Amazon Elastic Load Balancer or Amazon Route 53 to direct incoming connections to your EC2 instances.

Auto Scaling works with CloudWatch and CloudTrail.


## Launch Templates

The infomation required to create EC2 instances is stored in a launch template.

It supports **versioning**, which allows for quickly rolling back if there was an issue.

You can create a launch template one of three ways:
- use an existing EC2 instance.
- from an already existing template or a previous version of a launch template.
- create a template from scratch. The following options will need to be defined: AMI ID, instance type, key pair, security group, storage, and resource tags.

Launch templates are similar to launch configurations and offer more features such as supporting multiple versions of a template.


## Auto Scaling Groups

An Auto Scaling Group (ASG) is a logical grouping of EC2 instances managed by an Auto Scaling Policy.

ASGs specify where to deploy your resources: **VPC and subnets** .

When creating an **Auto Scaling group**, you can set the following capacity attributes:

- **Desired capacity**: The number of instances that should be running in the group after creation. This value can be adjusted manually or automatically based on scaling policies.
- **Minimum capacity**: The minimum number of instances that should be running in the group at any given time. This value is used to ensure that the group always has a minimum number of instances running, even if demand is low.
- **Maximum capacity**: The maximum number of instances that should be running in the group at any given time. This value is used to ensure that the group does not exceed a certain size, even if demand is high.

You can add a running instance to an ASG if the following conditions are met:
- The instance is in a running state.
- The AMI used to launch the instance still exists.
- The instance is not part of another ASG.
- The instance is in the same AZs for the ASG.

![](https://docs.aws.amazon.com/images/autoscaling/ec2/userguide/images/as-basic-diagram.png)


## Lifecycle hooks

Lifecycle can pause EC2 instances when ASG launchs or terminates them so you can perform custom actions.

Paused instances remain in a wait state until you complete the lifecycle action or until timeout (up to 2 hours, default is 1 hour).

You can send notifications when an instance enters a wait state using Amazon EventBridge, Amazon SNS, or Amazon SQS to receive the notifications.

![](https://docs.aws.amazon.com/images/autoscaling/ec2/userguide/images/lifecycle_hooks.png)


## Instance Warm-up and Cooldown

Instance Warm-up and Cooldown give instances the amount of time to respond to load and respond to health checks.

**Instance Warm-up** ensures that newly launched instances have sufficient time to start handling application traffic before being considered part of the Auto Scaling group. It helps your instances to avoid fail the health check, and being terminated prematurely (until the warm-up time expires, a newly launched instance is not counted toward the aggregated metrics of the Auto Scaling group).

**Instance cooldown** helps ASG to scale successfully without overdoing it. After an instance is launched or terminated, the Auto Scaling group suspends scaling activities for the specified cooldown period (default is 300 seconds).


## Steady state groups

They're auto scaling group that have min, max, desired capacity of 1.

It's a highly available solution for **a legacy codebase/resource that can't be scaled** can automatically recover from failure.


## Termination Policy

Termination policies control the instances which are terminated first when a scale-in event occurs.

There is a default termination policy configured and you can create your own customized termination policies.

The default termination policy helps to ensure that EC2 instances span AZs evenly for high availability. The default policy is fairly generic and flexible to cover a range of scenarios.


## Standby state

You can manually move an instance from an ASG and put it in the standby state.

Instances in the standby state are still managed by Auto Scaling, are charged as normal, and do not count towards available EC2 instance for workload/application use.

Auto scaling does not perform any health checks on EC2 instances in the standby state.

Standby state can be used for performing updates/changes/troubleshooting etc. without health checks being performed or replacement instances being launched.


## SNS and Auto Scaling

You can leverage Amazon SNS for notifications of different event types.

The ASG can be configured to send an Amazon SNS notification when:
- An instance is launched.
- An instance is terminated.
- An instance fails to launch.
- An instance fails to terminate.


## ELB and Auto Scaling

**ELBs are essential.**

For a ELB can send traffic to a new EC2 instance, it needs to validate that the application running on that EC2 instance is available. This validation is done via the health checks feature of ELB.

Make sure you enable health checks from load balancers. Otherwise, instances won't be terminated and replaced when they fail health checks.


## Tips

**Scale Out Aggressively**: Get ahead of the workload if you need to.

**Scale In Conservatively**: Once the instances are up, slowly roll them back when not needed.

**Spread out**: Make sure you're spreading your Auto Scaling groups over multiple AZs.

**Minimize provisioning time**: Keep an eye on provisioning times. You can bake AMls to minimize it.

**Cost**: Use EC2 Revered Instances for minimum count of EC2 instances to save money.

**CloudWatch**: Your go-to tool for alerting Auto Scaling that you need more or less instances.


## Behavior

You can enable Instance Protection which prevents Auto Scaling from scaling in and terminating the EC2 instances.

You can manually remove (detach) instances from an ASG. You can optionally decrement the ASG’s desired capacity (to prevent it from launching another instance).

An instance can only be attached to one Auto Scaling group at a time.

You can suspend and then resume one or more of the scaling processes for your ASG at any time. This can be useful when if want to investigate an issue with an application and make changes without invoking the scaling processes.

When you delete an Auto Scaling group all EC2 instances will be terminated.

Spot instances:
- You can select to use Spot instances in launch configurations.
- The ASG treats spot instances the same as on-demand instances.
- You can mix Spot instances with on-demand (when using launch templates).

An imbalance may occur due to:
- Manually removing AZs/subnets from the configuration.
- Manually terminating EC2 instances.
- EC2 capacity issues.
- Spot price is reached.