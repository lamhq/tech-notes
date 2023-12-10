# Amazon EKS

## Kubernetes

Kubernetes is an opensource container orchestration software.

It is perfect for extremely large-scale complex operation with hundreds of thousands of containers

A lot of the time, Kubernetes will likely be overkill
for a majority of users' needs.

It's essentially an open source alternative to things like ECS. That way you're not locked into the vendor. It can be used on-premises and in the cloud.

AWS-managed version is called Elastic Kubernetes Service (EKS).


## Overview

Amazon Elastic Kubernetes Service (Amazon EKS) is a managed service that you can use to run Kubernetes on AWS without needing to install, operate, and maintain your own Kubernetes control plane or nodes.

Applications that run on Amazon EKS are fully compatible with applications that run on any standard Kubernetes environment—it doesn’t matter whether they run in on-premises data centers or public clouds. This means that you can migrate any standard Kubernetes application to Amazon EKS with virtually no code modification.

Amazon EKS is conceptually similar to Amazon ECS, but there are some differences.

- An EC2 instance with the ECS Agent installed and configured is called a container instance. In Amazon EKS, it is called a worker node.
- An ECS Container is called a task. In the Amazon EKS ecosystem, it is called a pod.
- While Amazon ECS runs on AWS native technology, Amazon EKS runs on top of Kubernetes.

Amazon EKS offers the following features:

- It runs and scales the Kubernetes control plane across multiple AWS Availability Zones to ensure high availability.
- It also automatically scales control plane instances based on load, detects and replaces unhealthy control plane instances, and provides automated version updates and patching for them.
- It runs up-to-date versions of Kubernetes, so you can use all of the existing plugins and tooling from the Kubernetes community.
- It is integrated with many AWS services to provide scalability and security for your applications, including the following capabilities:
  - Amazon Elastic Container Registry (Amazon ECR for container images).
  - Elastic Load Balancing for load distribution.
  - AWS Identity and Access Management (IAM) for authentication.
  - Amazon Virtual Private Cloud (VPC) for isolation.


## ECS or EKS?

ECS:
- A proprietary AWS container management solution (not opensource)
- Best used when you're all in on AWS
- Use if you are looking for something simple to orchestrate containers

EKS:
- AWS-managed version of open-source Kubernetes container management solution
- Best used when you're not all in on AWS. Perfect for significantly larger workloads.
- Significantly more work to configure and integrate with AWS