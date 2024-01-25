# Amazon ECR

## Overview

AWS-managed container image registry that offers secure, scalable, and reliable infrastructure.

It supports private container image repositories with resource-based permissions via IAM.

Allow to push images that are either Open Container
Initiative (OCI) images, Docker images, and OCI artifacts.

ECR Public is a similar service for public image repositories.


## Features

### Lifecycle policies

- Helps management of images in your repositories
- Defines rules for cleaning up unused images
- Ability to test your rules before applying them

### Image Scanning

- Help identify software vulnerabilities in your container images.
- Repositories can be set to scan on push.
- You can retrieve results of scans for each image.

### Sharing

- Cross-Region support
- Cross-account support
- Configured per repository and per region

### Caching

- Pull through cache rules allow for caching public repos privately.
- Amazon ECR periodically reaches out to check current caching status.

### Tag Mutability

- Prevents image tags from being overwritten
- Configured per repository

### Integration

- Bring Your Own: You are able to leverage ECR images within your own container infrastructure.
- Amazon ECS: Use container images in ECS container definitions.
- Amazon EKS: Pull images for your EKS clusters.
- Amazon Linux: Amazon Linux containers can be used locally for your software development.


## Components

**Registry**: A private registry provided to each AWS account; create one or more for image storage. Each registry is regional for each account.

**Authorization Token**: Authentication token required for pushing and pulling images to and from registries

**Repository**: Contains all of your Docker images, OCI images, and OCI artifacts

**Repository Policy**: Control all access to repos and images

**Image**: Container images that get pushed to and pulled from your repository
