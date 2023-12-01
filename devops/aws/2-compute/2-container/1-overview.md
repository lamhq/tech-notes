# Container overview

## What Is a Container?

A container is a standardized unit that packages up your code and all of its dependencies. This package is designed to run reliably on any platform, because the container creates its own independent environment.

This makes it easy to carry workloads from one place to another, such as from development to production or from on-premises to the cloud.


## What Is Docker?

Docker is a popular container runtime that simplifies the management of the entire operating system stack needed for container isolation, including networking and storage.

Docker makes it easy to create, package, deploy, and run containers.


## What Is the Difference Between Containers and VMs?

Containers share the same operating system and kernel as the host they exist on, whereas virtual machines contain their operating system.

Since each virtual machine has to maintain a copy of an operating system, there's a degree of wasted space.

A container is more lightweight. They spin up quicker, almost instantly.

While containers can provide speed, virtual machines offer you the full strength of an operating system and offer more resources, like package installation, a dedicated kernel, and more.


## Orchestrate Containers

If you're trying to manage your compute at a large scale, you need to know:

- How to place your containers on your instances.
- What happens if your container fails.
- What happens if your instance fails.
- How to monitor deployments of your containers.

This coordination is handled by a container orchestration service. AWS offers two container orchestration services: **Amazon Elastic Container Service (ECS)** and **Amazon Elastic Kubernetes Service (EKS)**.
