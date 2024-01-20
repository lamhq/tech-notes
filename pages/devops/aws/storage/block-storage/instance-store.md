# EC2 Instance Store

## Overview

An instance store provides temporary block-level storage for an Amazon EC2 instance.

Instance store storage is located on disks that are physically attached to the host computer.

When the instance is shutdown (terminated), you lose any data in the instance store.

Instance stores offer very high performance (IOPS) and low latency. Higher performance and more cost-effective than EBS Provisioned IOPS.

Ideal when you need storage with very low latency, but temporary. 


## EC2 instance

You can specify instance store volumes for an instance only when you launch it.

You can’t detach an instance store volume from one instance and attach it to a different instance.

The instance type determines the size of the instance store available, and the type of hardware used for the instance store volumes.


## Pricing

Instance store volumes are included as part of the instance’s usage cost.
