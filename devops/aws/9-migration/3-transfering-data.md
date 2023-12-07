# AWS Snow Family

The AWS Snow Family is a collection of physical devices that help to physically transport up to exabytes of data into and out of AWS. They offer built-in computing capabilities, enabling customers to run their operations in remote locations that do not have data center access or reliable network connectivity.

AWS Snow Family is composed of **AWS Snowcone**, **AWS Snowball**, and **AWS Snowmobile**.

![](images/snow-family.png)


## AWS Snowcone

AWS Snowcone is a small, rugged, and secure edge computing and data transfer device.

It features 2 vCPUs, 4 GB of memory, and 8 TB of usable storage.

Has direct IoT sensor integration.

Perfect for edge computing where space and power are constrained.


## AWS Snowball

AWS Snowball offers two types of devices:

- **Snowball Edge Storage Optimized** devices are well suited for large-scale data migrations and recurring transfer workflows, in addition to local computing with higher capacity needs. Snowball Edge Storage Optimized provides **48 TB to 81 TB of HDD** capacity for block volumes and Amazon S3-compatible object storage, and **1 TB of SATA SSD** for block volumes.
- **Snowball Edge Compute Optimized** provides powerful computing resources for use cases such as machine learning, full motion video analysis, analytics, and local computing stacks.


## AWS Snowmobile

AWS Snowmobile is an exabyte-scale data transfer service used to move large amounts of data to AWS.

You can transfer up to **100 petabytes** of data per Snowmobile, a 45-foot long ruggedized shipping container, pulled by a semi trailer truck.