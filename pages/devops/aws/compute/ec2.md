# Amazon Elastic Compute Cloud

## Overview

Amazon EC2 is a service that lets you run virtual servers in the cloud. It allows you to provision **virtual servers** called EC2 instances.

You can modify the following attributes of an instance only when it is stopped:
- Instance type.
- User data.
- Kernel.
- RAM disk.


## Supported OS

- Amazon Linux.
- Ubuntu.
- Windows Server.
- MacOS.
- Red Hat Enterprise Linux.
- SUSE Linux Enterprise Server.
- Fedora.
- Debian.
- CentOS.
- Gentoo Linux.
- Oracle Linux.
- FreeBSD.


## Key pairs

Key pairs are used to securely connect to EC2 instances:

- A key pair consists of a public key that AWS stores, and a private key file that you store.
- For Windows AMIs, the private key file is required to obtain the password used to log into your instance.
- For Linux AMIs, the private key file allows you to securely SSH (secure shell) into your instance.


## User Data

User data is data that is supplied by the user at instance launch in the form of a script.

User data is limited to 16KB.

User data and metadata are not encrypted.

Instance user data is available at: http://169.254.169.254/latest/user-data.

> The IP address `169.254.169.254` is a link-local address and is valid only from the instance.


## Instance Profiles

IAM roles can be used for granting permissions to applications running on EC2 instances.

An instance profile is a container for an IAM role that you can attach to an EC2 instance when the instance starts.

An instance profile can contain only one IAM role, although a role can be included in multiple instance profiles.

![](https://digitalcloud.training/wp-content/uploads/2022/01/iam-instance-profiles.jpeg)


## Metadata

Instance metadata is data about your instance that you can use to configure or manage the running instance.

Instance metadata is available at http://169.254.169.254/latest/meta-data/ (the trailing `/` is required).

The **Instance Metadata Query** tool allows you to query the instance metadata without having to type out the full URI or category names.


## EC2 Instance Lifecycle

When the instance is **pending**, billing has not started.

When your instance is **running**, it's ready to use. This is also the stage where billing begins.

When you **stop and start** an instance:
- You lose any data on the instance store from the previous run. 
- The instance gets a new public IP address but maintains the same private IP address.

When you stop your instance, it enters the **stopping** state, and then the **stopped** state. AWS does not charge usage or data transfer fees for your instance after you stop it, but storage for any Amazon EBS volumes is still charged.

While your instance is in the **stopped** state, you can modify some attributes, like the instance type.

When you **terminate** an instance:
- Instance store are erased
- Public and private IP address are released
- You can no longer access the machine.


## E2C Hibernation

When you hibernate an EC2 instance, the operating system is told to perform **hibernation** (suspend-to-disk).

- EC2 hibernation preserves the in-memory RAM on persistent storage (EBS).
- Much faster to boot up because you do not need to reload the operating system.
- Instance RAM must be less than **150 GB**.
- Instance families include instances in General Purpose, Compute, Memory and Storage Optimized groups.
- Available for Windows, Amazon Linux 2 AMI, and Ubuntu.
- Instances can't be hibernated for more than **60 days**.
- Available for On-Demand instances and Reserved Instances.

When you start your instance out of hibernation:
- The Amazon EBS root volume is restored to its previous state.
- The RAM contents are reloaded.
- The processes that were previously running on the instance are resumed.
- Previously attached data volumes are reattached and the instance retains its instance ID.

You can hibernate an instance only if it's enabled for hibernation and it meets the hibernation prerequisites (regions, AMIs, instance families, etc.,).


## High Availability Solutions

Horizontally scalable architectures are preferred because risk can be spread across multiple smaller machines versus one large machine.

Reserved instances are the only way to guarantee that resources will be available when needed.

Auto Scaling and Elastic Load Balancing work together to provide automated recovery by maintaining minimum instances.

Amazon Route 53 health checks also provide "self-healing" redirection of traffic.
