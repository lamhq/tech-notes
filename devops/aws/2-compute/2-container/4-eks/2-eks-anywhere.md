# Amazon EKS Anywhere

## Overview

This is a service that provides you a way
of running on-premises EKS cluster with the same practices used for Amazon EKS.

Based on EKS Distro. Allows for deployments,
usage, and management methods for clusters
within your data centers.

The whole goal of this particular service
is based around lifecycle management.
So, it offers full lifecycle management of multiple K8s cluster.

Operate independently of AWS.


## Concepts

K8s control plane management is operated completely by the customer. With EKS, you can leverage AWS for some of those management tasks.

K8s control plane location is entirely within a customer data center or operations center.

Cluster updates are done entirely via manual CLI or Flux.

Curated packages offer extended core functionalities of K8s clusters. But requires an enterprise subscription.