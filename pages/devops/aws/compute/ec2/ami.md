# Amazon Machine Image (AMI)

## Overview

An Amazon Machine Image (AMI) provides the information required to launch an instance.

AMIs are regional. You can copy an AMI across AWS Region and launch an instance in another region.

You can base your AMI on:
- Region
- Operating system
- Architecture (32-bit or 64-bit)
- Launch permissions that control which AWS accounts can use the AMI to launch instances
- Storage for the root device (root device volume)

You can store images created from your own instance deployments as private AMIs.

You must specify an AMI when you launch an instance.

You can create an AMI from your running instance and use this AMI to start a new instance with the same configurations as your current instance.

AMIs are either instance store-backed or EBS-backed.


## Copying AMIs

You can copy AMIs within or across AWS regions.

You can copy encrypted AMIs and AMIs with encrypted snapshots.
