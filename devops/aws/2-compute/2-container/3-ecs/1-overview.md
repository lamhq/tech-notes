# Amazon ECS

## Overview

Amazon Elastic Container Service is a managed service that allows you to easily launch and manage Docker containers running on AWS compute.

ECS can manage anywhere from one to thousands of containers

ECS will appropriately place the containers and keep them online

Containers are appropriately registered with chosen load balancers as they come online and go offline

Containers can have individual roles (IAM role) attached to them, making security a breeze

Extremely easy to set up and scale to handle any workload


## Launch types

ECS has two launch types: EC2 and Fargate.

EC2:
- You are responsible for underlying operating system
- Follow EC2 pricing model
- Well-suited for long-running containers
- Multiple containers can share the same host
- Capable of mounting EFS file systems for persistent, shared storage

Fargate:
- No operating system access
- Pay based on resources allocated and time ran
- Isolated environments per container
- Capable of mounting EFS file systems for persistent, shared storage
- Fargate can be more expensive, but easier to use


## AWS Fargate

AWS Fargate is a serverless compute engine for running Docker containers.

AWS owns and manages the infrastructure.

Support Linux and Windows containers.

To utilize Fargate, you must use ECS or EKS. It's not a standalone service.

**AWS VPC** must be the networking mode type for Fargate. It essentially spins up your container on an underlying host that you don't don't get to manage,
and it's going to spin up an ENI in the different VPC subnet configurations that you choose.

Integrate natively with IAM and VPC, allows you to launch Fargate containers inside your network and control connectivity to your applications.


### Fargate Spot

With Amazon ECS on AWS Fargate capacity providers, you can use both Fargate and Fargate Spot capacity with your Amazon ECS tasks.

With Fargate Spot, you can run interruption-tolerant Amazon ECS tasks at a discounted rate, compared to the Fargate price.

Fargate Spot runs tasks on spare compute capacity. When AWS needs the capacity back, your tasks will be interrupted with a 2-minute warning notice.
