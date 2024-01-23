# ECS Concepts

## Terminology

The following table provides an overview of some of the terminology used with Amazon ECS:

| Amazon ECS Term | Definition |
|---|---|
| Cluster | Logical Grouping of EC2 Instances |
| Container Instance | EC2 instance running the ECS agent |
| Task Definition | Blueprint that describes how a docker container should launch |
| Task | A running container using settings in a Task Definition |
| Service | Defines long running tasks – can control task count with Auto Scaling and attach an ELB |


## Images

Image refer to "docker image". Built from a Dockerfile.

An image contains the instructions for creating a Docker container.

Images are stored in a registry such as DockerHub or AWS Elastic Container Registry (ECR).

Developers can use the Docker CLI to push, pull and manage images.


## Tasks and Task Definitions

A task definition is required to run Docker containers in Amazon ECS.

A task definition is a text file in JSON format that describes one or more containers, up to a maximum of 10.

Task definitions use Docker images to launch containers.

You specify the number of tasks to run (i.e. the number of containers).

Some of the parameters you can specify in a task definition include:

- Docker images to use with the containers in your task.
- How much CPU and memory to use with each container.
- The Docker networking mode to use for the containers in your task.
- Whether the task should continue if the container finished or fails.
- The commands the container should run when it is started.
- Environment variables that should be passed to the container when it starts.
- Data volumes that should be used with the containers in the task.
- IAM role the task should use for permissions.
- What (if any) ports from the container are mapped to the host container instances.
- Whether containers are linked together in a task.


## ECS Clusters

An ECS Cluster is a logical grouping of container instances that you can place tasks on.

ECS allows a specified number (desired count) of tasks to run in the cluster.

Clusters can contain tasks using the Fargate and EC2 launch type.

For clusters with the EC2 launch type clusters can contain different container instance types.

Each container instance may only be part of one cluster at a time.

Clusters are region specific.

You can create IAM policies for your clusters to allow or restrict users' access to specific clusters.

"Services" provide auto-scaling functions for ECS.


## Service Scheduler

You can schedule ECS using Service Scheduler and Custom Scheduler.

Service Scheduler ensures that the specified number of tasks are constantly running and reschedules tasks when a task fails.

Can ensure tasks are registered against an ELB.


## Custom Scheduler

You can create your own schedulers to meet business needs.

Leverage third party schedulers such as Blox.

The Amazon ECS schedulers leverage the same cluster state information provided by the Amazon ECS API to make appropriate placement decisions.


## ECS Container Agent

The ECS container agent allows container instances to connect to the cluster.

The container agent runs on each infrastructure resource on an ECS cluster.

The ECS container agent is included in the Amazon ECS optimized AMI and can also be installed on any EC2 instance that supports the ECS specification (only supported on EC2 instances).

For non-AWS Linux instances to be used on AWS you must manually install the ECS container agent.

Linux and Windows based.
