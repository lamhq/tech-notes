# Containers in the Cloud

## Kubernetes

- A product that helps manage and scale containerized applications
- An open source platform

A node represents a computing instance like a machine.

A Pod represents a running process on your cluster as either a component of replication or an entire app.

Generally you only have one container per Pod, or multiple containers with a hard dependency.

Kubernetes creates an **external load balancer** with a public IP address to that service so others outside the cluster can access it. Any client that reaches that IP address will be routed to a pod behind the service.

A service is an abstraction which defines a logical set of pods and a policy by which to access them. Pods will be assigned their own temporarily IP addresses.

You could use auto scaling. For example, you can specify that the number of pods should increase when CPU utilization reaches a certain limit. 

You can provide a configuration file that tells Kubernetes what you want, your desired state to look like and Kubernetes determines how to do it.

## Google Kubernetes Engine

GKE is a Google-hosted managed Kubernetes service in the Cloud.

You can create a Kubernetes cluster by using the Google Cloud Console or the gcloud command 

Kubernetes commands are used for:

- Deploy and manage applications
- Perform administation tasks
- Set policies
- Monitor workload health

Running a GKE cluster comes with the benefit of advanced cluster management features:

- Google Cloud's load balancing for Compute Engine instances
- node pools to designate subsets of nodes within the cluster 
- automatic scaling of your clusters node instance count
- automatic upgrades for your clusters node software
- node auto repair to maintain note health and availability
- logging and monitoring with Google Cloud's operation suite


## Anthos

- A hybrid and multi-cloud solution
- The framework rests on Kubernetes and GKE On-Prem
- Provides a rich set of tools for monitoring and mainternance


## Quiz

1. Select two reasons for using containers to deploy applications.
    > Migrating workloads is simpler. \
    > It creates consistency across development, testing, and production environments.
  
2. How do containers access an operating system?
    > Containers use a shared base operating system stored in a shared kernel layer.

3. What is a Kubernetes pod?
    > A group of containers

4. What is a Kubernetes cluster?
    > A group of machines where Kubernetes can schedule workloads.

5. Where do the resources used to build Google Kubernetes Engine clusters come from?
    > Compute Engine

6. How do you keep your Kubernetes version updated in Google Kubernetes Engine? 
    > The Google Kubernetes Engine team periodically performs automatic upgrades of your cluster to newer stable versions.

7. Anthos provides a rich set of tools for monitoring and maintaining the consistency of your applications across which of the following locations?
    > Applications hosted on-premises, in the cloud, or in multiple clouds.