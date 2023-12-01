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
