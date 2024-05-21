# Amazon Elastic Container Service (Amazon ECS)

## Overview

Amazon ECS is a managed service that allows you to easily launch and manage Docker containers running on AWS compute.

Amazon ECS eliminates the need for you to install, operate, and scale your own cluster management infrastructure.

Amazon ECS can be used to schedule the placement of containers across clusters based on resource needs and availability requirements.


## Integrations

You can use any **AMI** that meets the Amazon ECS AMI specification.

Containers can have individual roles (**IAM** role) attached to them, making security a breeze

For persistent, shared storage, use Amazon EFS file systems .


## Launch types

ECS has two launch types: EC2 and Fargate.

| Amazon EC2 | Amazon Fargate |
|---|---|
| You can explicitly provision EC2 instances | Register task definition and Fargate launches the container for you. |
| You’re responsible for upgrading, patching, care of EC2 pool | Fargate provisions compute as needed. No OS access |
| Multiple containers can share the same host | Isolated environments per container |
| You must handle cluster optimization | Fargate handles customer optimizations |
| More granular control over infrastructure | Limited control, as infrastructure is automated |
| Follow EC2 pricing model | Pay based on resources allocated and time ran. Can be more expensive, but easier to use |
| Private repositories are only supported by the EC2 Launch Type | Only supports container images hosted on ECR or Docker Hub |

![](https://digitalcloud.training/wp-content/uploads/2022/01/amazon-ecs-ec2-vs-fargate-1.jpeg)


## Pricing

You pay for:
- Resources created with the EC2 Launch Type (e.g. EC2 instances and EBS volumes).
- The number and configuration of tasks you run for the Fargate Launch Type.
