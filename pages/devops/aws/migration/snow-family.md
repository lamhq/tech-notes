# AWS Snow Family

## Overview

The AWS Snow Family is a collection of physical devices that help to physically transport up to exabytes of data into and out of AWS. They offer built-in computing capabilities, enabling customers to run their operations in remote locations that do not have data center access or reliable network connectivity.

AWS Snow Family is composed of **AWS Snowcone**, **AWS Snowball**, and **AWS Snowmobile**.

![](https://www.whizlabs.com/blog/wp-content/uploads/2020/11/aws-snow-family.png)


## AWS Snowcone

AWS Snowcone is a small, rugged, and secure edge computing and data transfer device.

It features 2 vCPUs, 4 GB of memory, **8 TB** of usable storage.

Has direct IoT sensor integration.

Perfect for edge computing where space and power are constrained.


## AWS Snowball

AWS Snowball offers two types of devices:

### Snowball Edge Storage Optimized

Well suited for large-scale data migrations and recurring transfer workflows.

**48 TB to 81 TB of HDD** for block volumes and Amazon S3-compatible object storage.

**1 TB of SATA SSD** for block volumes.

Include local computing with higher capacity needs.


### Snowball Edge Compute Optimized

Provides powerful computing resources for use cases such as machine learning, full motion video analysis, analytics, and local computing stacks.


## AWS Snowmobile

AWS Snowmobile is an exabyte-scale data transfer service used to move large amounts of data to AWS.

You can transfer up to **100 petabytes** of data per Snowmobile, a 45-foot long ruggedized shipping container, pulled by a semi trailer truck.