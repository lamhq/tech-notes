# Amazon Elastic Compute Cloud

The three main categories of compute are **virtual machines**, **containers**, and **serverless**. 

## What Is Amazon EC2?

Amazon EC2 is a web service that provides secure, resizable compute capacity in the cloud. It allows you to provision virtual servers called EC2 instances.

In order to create an EC2 instance, you need to define:

- Hardware specifications, like CPU, memory, network, and storage.
- Logical configurations, like networking location, firewall rules, authentication, and the operating system of your choice.

When launching an EC2 instance, the first setting you configure is which operating system you want by selecting an Amazon Machine Image (AMI).

## What Is an AMI?

AMI let you configure which operating system you want, you can also select storage mappings, the architecture type (such as 32-bit, 64-bit, or 64-bit ARM), and additional software installed.

The AMI is how you model and define your instance, while the EC2 instance is the entity you interact with, where you can install your web server, and serve your content to users.

When you launch a new instance, AWS allocates a virtual machine that runs on a hypervisor. Then the AMI you selected is copied to the root device volume, which contains the image used to boot the volume. In the end, you get a server you can connect to and install packages and any additional software. In this case, you install a web server along with the properly configured source code of your employee directory app.

![](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/uKHYVtl7R0Sh2FbZe6dESw_e92f04dcceed4d23862545b3ccc4f759_f5b8552a9bc44aebb2f2c3c3a54948cd_b-61-b-3-ee-6-29-e-3-4-edd-8-f-81-3-a-1-aa-8919-c-21.png?expiry=1662336000000&hmac=xMNq6o4ha7ekQjtRjQRIsdQy_feK1T2e3IVHxOO4sMg)

One advantage of using AMIs is that they are reusable. You can create an AMI from your running instance and use this AMI to start a new instance. This way, your new instance will have all the same configurations as your current instance, because the configurations set in the AMIs are the same.

## What Makes Up an EC2 Instance?

EC2 instances are a combination of virtual processors (vCPUs), memory, network, and in some cases, instance storage and graphics processing units (GPUs)

![](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/XcYIwNOlTlqGCMDTpR5aZg_98c7357638de4ad0bac00230536a94ba_image-14-.png?expiry=1662336000000&hmac=eVsc6Gvh_rWnBf6h_CWhllvxHDyXGeohmELcxerB_3s)

Instance types consist of a prefix identifying the type of workloads they’re optimized for, followed by a size.

For example, the instance type `c5.large` can be broken down into the following elements.

- `c5` determines the instance family and generation number. Here, the instance belongs to the fifth generation of instances in an instance family that’s optimized for generic computation.
- `large`, which determines the amount of instance capacity.


## What Are Instance Families?

| Instance Family | Description | Use Cases |
|---|---|---|
| General purpose | Provides a balance of compute, memory, and networking resources, and can be used for a variety of workloads. | Scale-out workloads such as web servers, containerized microservices, caching fleets, distributed data stores, and development environments. |
| Compute optimized | Ideal for compute-bound applications that benefit from high-performance processors. | High-performance web servers, scientific modeling, batch processing, distributed analytics, high-performance computing (HPC), machine/deep learning, ad serving, highly scalable multiplayer gaming. |
| Memory optimized | Designed to deliver fast performance for workloads that process large data sets in memory. | Memory-intensive applications such as high-performance databases, distributed web-scale in-memory caches, mid-size in-memory databases, real-time big-data analytics, and other enterprise applications. |
| Accelerated computing | Use hardware accelerators or co-processors to perform functions such as floating-point number calculations, graphics processing, or data pattern matching more efficiently than is possible with conventional CPUs. | 3D visualizations, graphics-intensive remote workstations, 3D rendering, application streaming, video encoding, and other server-side graphics workloads. |
| Storage optimized | Designed for workloads that require high, sequential read and write access to large data sets on local storage. They are optimized to deliver tens of thousands of low-latency random I/O operations per second (IOPS) to applications that replicate their data across different instances. | NoSQL databases, such as Cassandra, MongoDB, and Redis, in-memory databases, scale-out transactional databases, data warehousing, Elasticsearch, and analytics. |

## EC2 Instance Lifecycle

![](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/vgBOJqw6TMyATiasOizM8g_8d882217f0044106a24b7d6c69549207_image-11-.png?expiry=1662336000000&hmac=vmqT_M1sZK0NsXY0MoiWx0aJhefFX_1mmmQV6KN6oAs)

When the instance is **pending** (1), billing has not started.

When your instance is **running** (2), it's ready to use. This is also the stage where billing begins.

When you **stop and start** an instance (4), your instance may be placed on a new underlying physical server. Therefore, you lose any data on the instance store that were on the previous host computer. When you stop an instance, the instance gets a new public IP address but maintains the same private IP address.

When you stop your instance, it enters the **stopping** state, and then the **stopped** state. AWS does not charge usage or data transfer fees for your instance after you stop it, but storage for any Amazon EBS volumes is still charged. While your instance is in the stopped state, you can modify some attributes, like the instance type. When you stop your instance, the data stored in memory (RAM) is lost.

When you **terminate** an instance (5), the instance store are erased, and you lose both the public IP address and private IP address of the machine. Termination of an instance means you can no longer access the machine.

## EC2 Pricing Options

![](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/ssN6XuNeT-2Del7jXl_trA_794ed3cf57164cc4898fa09c7bb9d603_image-10-.png?expiry=1662336000000&hmac=GqEI4srHHWV9L-1GNpHcOX-PaNsb3poOvTmULzMXiOc)

### Pay As You Go with On-Demand Instances

With On-Demand instances, you pay for compute capacity with no long-term commitments.

Billing begins whenever the instance is running, and billing stops when the instance is in a stopped or terminated state. 

The price per second for a running On-Demand instance is fixed.

### Reserve Capacity with Reserved Instances (RIs)

You can choose between three payment options: **All Upfront**, **Partial Upfront**, or **No Upfront**.

You can select either a 1-year or 3-year term for each of these options. 

Depending on which option you choose, you are discounted differently:

- All Upfront offers a higher discount than Partial Upfront instances.
- Partial Upfront instances offer a higher discount than No Upfront.
- No Upfront offers a higher discount than On-Demand.

**On-Demand** and **No Upfront** are similar since both do not require any upfront payment. However, there is a major difference. When you choose an On-Demand instance, you stop paying for the instance when you stop or terminate the instance. When you stop an RI, you still pay for it because you committed to a 1-year or 3-year term.


### Save on Costs with Spot Instances

With Spot Instances, you set a limit on how much you would like to pay for the instance hour.

This is compared against the current Spot price that AWS determines. 

If the amount you pay is more than the current Spot price and there is capacity, then you will receive an instance.

If AWS determines that capacity is no longer available for a particular spot instance or if the Spot price exceeds how much you are willing to pay, AWS will give you a 2-minute warning before it interrupts your instance. That means any application or workload that runs on a Spot instance must be able to be interrupted.