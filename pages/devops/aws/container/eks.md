# Amazon EKS

## Kubernetes

Kubernetes is an opensource container orchestration software.

It is perfect for extremely large-scale complex operation with hundreds of thousands of containers

Using Kubernetes, you're not locked into the vendor like ECS.

A lot of the time, Kubernetes will likely be overkill
for a majority of users' needs.


## Overview

The Amazon Elastic Kubernetes Service (Amazon EKS) is a managed service for running Kubernetes on AWS and on-premises.

It runs and scales the Kubernetes control plane across AZs to ensure high availability.

Detects and replaces unhealthy control plane nodes.

Provides automated version updates and patching for nodes.

Runs up-to-date versions of Kubernetes, compatible with all of the existing plugins and tooling from the Kubernetes community.

Amazon EKS can run on Amazon EC2 or AWS Fargate.

Integrate with:
- Amazon Elastic Container Registry (Amazon ECR for container images).
- Elastic Load Balancing for load distribution.
- AWS Identity and Access Management (IAM) for authentication.
- Amazon Virtual Private Cloud (VPC) for isolation.

Useful when you need a consistent control plane for managing containers across hybrid clouds and multicloud environments.


## ECS vs. EKS

| Amazon ECS | Amazon EKS |
|---|---|
| AWS-specific platform that supports Docker Containers | Compatible with upstream Kubernetes so it’s easy to lift and shift from other Kubernetes deployments |
| Simpler and easier to use | Feature-rich, complex with a steep learning curve |
| Best used when you're all in on AWS | Perfect for significantly larger workloads. |
| Leverages AWS services like Route 53, ALB, and CloudWatch | A hosted Kubernetes platform that handles many things internally |
| "Tasks" are instances of containers that are run on underlying compute but more of less isolated | "Pods" are containers collocated with one another and can have shared access to each other |
| Limited extensibility | Extensible via a wide variety of third-party and community add-ons. |
