# AWS container services

Container management tools can be categorized into three groups: registry, orchestration, and compute. AWS provides services in each of these categories, offering a comprehensive container management solution.

## Amazon ECS

Amazon ECS is a fully managed container orchestration service offered by AWS. It enables the deployment, management, and scaling of containerized applications.

One key feature of Amazon ECS is its serverless capability with **AWS Fargate**, which simplifies server management, capacity planning, and container workload isolation.

Using Fargate, you specify your application's requirements, select Fargate as the launch type, and Fargate handles scaling and infrastructure management for running containers.

To run and manage your containers, you need to install the **Amazon ECS Container Agent** on your EC2 instances. This agent is responsible for communicating back to the Amazon ECS service about cluster management details. An instance with the container agent installed is often called a container instance.

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

## Amazon EKS

Kubernetes is an open-source system for automating the deployment, scaling, and management of containerized applications.

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


## AWS Fargate

Amazon ECS and Amazon EKS enable you to run your containers in two modes:

- Amazon EC2 mode
- AWS Fargate mode

AWS Fargate is a technology that you can use with Amazon ECS to run containers without managing servers or clusters of EC2 instance. AWS Fargate abstracts the EC2 instance so you're not required to manage it.

When you run your tasks and services with the Fargate launch type, you package your application in containers, specify the CPU and memory requirements, define networking and IAM policies, and launch the application. Each Fargate task has its own isolation boundary and doesn’t share the underlying kernel, CPU resources, memory resources, or elastic network interface with another task.

AWS Fargate natively integrates with AWS Identity and Access Management (IAM) and Amazon Virtual Private Cloud (VPC). Having native integration with Amazon VPC allows you to launch Fargate containers inside your network and control connectivity to your applications.


### Fargate Spot

With Amazon ECS on AWS Fargate capacity providers, you can use both Fargate and Fargate Spot capacity with your Amazon ECS tasks. With Fargate Spot, you can run interruption-tolerant Amazon ECS tasks at a discounted rate, compared to the Fargate price. Fargate Spot runs tasks on spare compute capacity. When AWS needs the capacity back, your tasks will be interrupted with a 2-minute warning notice.