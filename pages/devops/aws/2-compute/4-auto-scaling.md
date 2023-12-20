# Amazon EC2 Auto Scaling

## Overview

Amazon EC2 Auto Scaling enables you to automatically add or remove Amazon EC2 instances in response to changing application demand.

Auto-scaling groups will contain the location of where your instances will live (VPC, subnet).

You can leverage **Amazon SNS** for notifications of different event types.


## Scaling types

- **Reactive scaling**: monitors resources and adjusts the instances based on the incoming traffic. There might be a **cooldown period** where resources are maintained at maximum capacity even when traffic decreases. This prepares for any further incremental surges
- **Scheduled scaling**: If you have a predictable workload, create a scaling event to get your resources ready to go before they're actually needed
- **Predictive scaling**: uses machine learning algorithms to determine when you'll need to scale. They are re-evaluated every 24 hours to create a forecast for the next 48 hours
- **Dynamic Scaling**: the number of EC2 instances changes automatically based on received signals. Supported policies: Target tracking scaling, Step scaling, Simple scaling


## Components

### Launch Templates

The infomation required to create EC2 instances is stored in a launch template.

It also supports **versioning**, which allows for quickly rolling back if there was an issue.

You can create a launch template one of three ways:
- use an existing EC2 instance.
- from an already existing template or a previous version of a launch template.
- create a template from scratch. The following options will need to be defined: AMI ID, instance type, key pair, security group, storage, and resource tags.


### Auto Scaling Groups

An ASG enables you to define where EC2 Auto Scaling deploys your resources: **VPC and subnets** the EC2 instance should be launched in.

When creating an **Auto Scaling group**, you can set the following capacity attributes:

- **Desired capacity**: The number of instances that should be running in the group after creation. This value can be adjusted manually or automatically based on scaling policies.
- **Minimum capacity**: The minimum number of instances that should be running in the group at any given time. This value is used to ensure that the group always has a minimum number of instances running, even if demand is low.
- **Maximum capacity**: The maximum number of instances that should be running in the group at any given time. This value is used to ensure that the group does not exceed a certain size, even if demand is high.

![](https://docs.aws.amazon.com/images/autoscaling/ec2/userguide/images/as-basic-diagram.png)


### Scaling Policies

#### Simple Scaling Policy

You use a CloudWatch alarm and specify what to do when it is triggered.

*Example: add 1 instance if CPU utilization metric > 80%.*

Once this scaling policy is triggered, it waits a **cooldown period** before taking any other action. This is important as it takes time for the EC2 instances to start and the CloudWatch alarm may still be triggered while the EC2 instance is booting.

#### Step Scaling Policy

Step scaling policies respond to additional alarms even while a scaling activity or health check replacement is in progress.

*For example, you decide to add two more instances in case the CPU utilization is at 85%, and four more instances when it's at 95%.*


#### Target Tracking Scaling Policy

Target Tracking use a scaling metric and value that your Auto Scaling Group should maintain at all times.

*Example: maintain `ASGAverageCPUUtilization` = 50%*

To create a target tracking scaling policy, you specify an Amazon CloudWatch metric and a target value that represents the ideal average utilization or throughput level for your application. Amazon EC2 Auto Scaling can then scale out your group to handle peak traffic, and scale in your group to reduce costs during periods of low utilization or throughput.


## Lifecycle hooks

It allows you to perform custom actions on instances when corresponding lifecycle events occur.

Capability to wait for up to 2 hours. You could have an instance waiting to complete some type of action for up to two hours before it gets moved into an active state.

![](https://docs.aws.amazon.com/images/autoscaling/ec2/userguide/images/lifecycle_hooks.png)


## Instance Warm-up and Cooldown

Instance Warm-up and Cooldown give instances the amount of time to respond to load and respond to health checks.

**Instance Warm-up** stops instances from being placed behind the load balancer. It helps your instances to avoid fail the health check, and being terminated prematurely.

**Instance cooldown** pauses auto scaling for a set amount of time. Helps ASG to scale successfully without overdoing it.


## Steady state groups

They're auto scaling group that have min, max, desired capacity of 1.

It's a highly available solution for **a legacy codebase/resource that can't be scaled** can automatically recover from failure.


## Elastic Load balancer and EC2 Auto Scaling

**ELBs are essential.**

Make sure you enable health checks from load balancers. Otherwise, instances won't be terminated and replaced when they fail health checks.

For a ELB can send traffic to a new EC2 instance, it needs to validate that the application running on that EC2 instance is available. This validation is done via the health checks feature of ELB.


## Tips

- **Scale Out Aggressively**: Get ahead of the workload if you need to.
- **Spread out**: Make sure you're spreading your Auto Scaling groups over multiple Availability Zones.
- **Scale In Conservatively**: Once the instances are up, slowly roll them back when not needed.
- **Minimize provisioning time**: Keep an eye on provisioning times. You can bake AMls to minimize it.
- **Cost**: Use EC2 Revered Instances for minimum count of EC2 instances to save money.
- **CloudWatch**: Your go-to tool for alerting Auto Scaling that you need more or less instances.