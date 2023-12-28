# AWS Fargate

## Overview

AWS Fargate is a serverless compute engine for running Docker containers.

AWS owns and manages the infrastructure.

Support Linux and Windows containers.

To utilize Fargate, you must use ECS or EKS. It's not a standalone service.

**AWS VPC** must be the networking mode type for Fargate. It essentially spins up your container on an underlying host that you don't don't get to manage,
and it's going to spin up an ENI in the different VPC subnet configurations that you choose.

Integrate natively with IAM and VPC, allows you to launch Fargate containers inside your network and control connectivity to your applications.


## Fargate Spot

With Amazon ECS on AWS Fargate capacity providers, you can use both Fargate and Fargate Spot capacity with your Amazon ECS tasks.

With Fargate Spot, you can run interruption-tolerant Amazon ECS tasks at a discounted rate, compared to the Fargate price.

Fargate Spot runs tasks on spare compute capacity. When AWS needs the capacity back, your tasks will be interrupted with a 2-minute warning notice.
