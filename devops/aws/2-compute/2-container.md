# Container Services on AWS

## What Is a Container?

A container is a standardized unit that packages up your code and all of its dependencies. This package is designed to run reliably on any platform, because the container creates its own independent environment.

This makes it easy to carry workloads from one place to another, such as from development to production or from on-premises to the cloud.


## What Is Docker?

Docker is a popular container runtime that simplifies the management of the entire operating system stack needed for container isolation, including networking and storage.

Docker makes it easy to create, package, deploy, and run containers.

## What Is the Difference Between Containers and VMs?

![](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/YmDaQPNCTNug2kDzQvzb8g_a0cec7d6f09746809164174945769eed_image-17-.png?expiry=1662422400000&hmac=BUEwqE33sze-8ifg742S_fsTsygYhKAXm-A5DulFmvQ)

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


## Manage Containers with Amazon Elastic Container Service (Amazon ECS)

Amazon ECS is an end-to-end container orchestration service that allows you to quickly spin up new containers and manage them across a cluster of EC2 instances.

![](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/paBhwshhRnqgYcLIYfZ6Mw_41443da23de04aafa72b5080aac4d652_image-16-.png?expiry=1662422400000&hmac=2TGeqvMysw4KF24FPkTHYChqkULhWMR3rVRbXpQVL84)

To run and manage your containers, you need to install the **Amazon ECS Container Agent** on your EC2 instances. This agent is responsible for communicating back to the Amazon ECS service about cluster management details. An instance with the container agent installed is often called a container instance.

![](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/iFV63qjSRAWVet6o0vQFXw_279572f8b1ef4ebdb5b6daab85088433_image-15-.png?expiry=1662422400000&hmac=LiJdBnF2EGwAK5f1VCmgCjNqqpYW3zMUvMbd7lH11yE)

Once the Amazon ECS container instances are up and running, you can perform actions as: launching and stopping containers, getting cluster state, scaling in and out, scheduling the placement of containers across your cluster, assigning permissions, and meeting availability requirements.

To prepare your application to run on Amazon ECS, you create a **task definition**. The task definition is a text file, in JSON format, that describes one or more containers. A task definition is similar to a blueprint that describes the resources you need to run that container, such as CPU, memory, ports, images, storage, and networking information.

```json
{
  "family": "webserver",
  "containerDefinitions": [ {
    "name": "web",
    "image": "nginx",
    "memory": "100",
    "cpu": "99"
  } ],
  "requiresCompatibilities": [ "FARGATE" ],
  "networkMode": "awsvpc",
  "memory": "512",
  "cpu": "256"
}
```

## Use Kubernetes with Amazon Elastic Kubernetes Service (Amazon EKS)

Kubernetes is a portable, extensible, open source platform for managing containerized workloads and services.

If you already use Kubernetes, you can use Amazon EKS to orchestrate these workloads in the AWS Cloud.

Amazon EKS is conceptually similar to Amazon ECS, but there are some differences.

- An EC2 instance with the ECS Agent installed and configured is called a container instance. In Amazon EKS, it is called a worker node.
- An ECS Container is called a task. In the Amazon EKS ecosystem, it is called a pod.
- While Amazon ECS runs on AWS native technology, Amazon EKS runs on top of Kubernetes.