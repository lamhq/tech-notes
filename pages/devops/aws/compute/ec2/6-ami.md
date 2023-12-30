# Amazon Machine Image (AMI)

## Overview

An AMI provides the information required to launch an instance.

You must specify an AMI when you launch an instance.

An AMI is available in only a single region. You can copy an AMI across AWS Region and launch an instance in another region.

AMIs are stored on Amazon S3, however you cannot view or access them (in S3 console or S3 API).

5 things you can base your AMI on:
- Region
- Operating system
- Architecture (32-bit or 64-bit)
- Launch permissions
- Storage for the root device (root device volume)

You can store images created from your own instance deployments as private AMIs.


## How it work?

Amazon Machine Images allow you to configure your instance's operating system, storage mappings, architecture type, and additional software.

When you launch a new instance, AWS allocates a virtual machine that runs on a hypervisor. The AMI you selected is copied to the root device volume, which contains the image used to boot the volume.

In the end, you get a server you can connect to and install packages and any additional software.

You can create an AMI from your running instance and use this AMI to start a new instance with the same configurations as your current instance.


## Category

AMIs are categorized as either being backed by Amazon EBS or by instance store:
- With **EBS**, the root device for an instance launched from the AMI is an EBS volume
created from an Amazon EBS snapshot.
- For **Instance Store**, the root device for an instance launch from the AMI is an instance store volume created from a template stored in Amazon S3.
