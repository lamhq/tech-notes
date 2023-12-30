# Amazon Elastic Compute Cloud

## What Is Amazon EC2?

Amazon EC2 is a service that lets you run virtual servers in the cloud. It allows you to provision **virtual servers** called EC2 instances.

In order to create an EC2 instance, you need to define:

- Hardware specifications, like CPU, memory, network, and storage.
- Logical configurations, like networking location, firewall rules, authentication, and the operating system of your choice.

EC2 instances are a combination of virtual processors (vCPUs), memory, network, and in some cases, instance storage and graphics processing units (GPUs)


## How Amazon EC2 works?

### Launch

First, you launch an instance. Begin by **selecting a template** with basic configurations for your instance.

These configurations include the **operating system**, application server, or applications.

You also select the **instance type**, which is the specific hardware configuration of your instance.

As you are preparing to launch an instance, you specify **security settings** to control the network traffic that can flow into and out of your instance.

### Connect

Your programs and applications have multiple different methods to connect directly to the instance and exchange data.

Users can also connect to the instance by logging in and accessing the computer desktop.

### Use

After you have connected to the instance, you can run commands to install software, add storage, copy and organize files, and more.


## Instance Types

AWS has different types of EC2 Instances that you can spun up and deploy into AWS environment. Each instance type is grouped under an **instance family** and are optimized for certain types of tasks.

Instance types offer varying combinations of CPU, memory, storage, and networking capacity. They give you the flexibility to choose the appropriate mix of resources for your applications.

Instance types consist of a prefix identifying the type of workloads they're optimized for, followed by a size.

For example, the instance type `c5.large` can be broken down into the following elements.

- `c5` determines the instance family and generation number. Here, the instance belongs to the fifth generation of instances in an instance family that's optimized for generic computation.
- `large`, which determines the amount of instance capacity.


## Instance Families

The different instance families in EC2 are:

### General purpose

Provides a balance of compute, memory, and networking resources.

Use cases:
- application servers
- gaming servers
- backend servers for enterprise applications
- small and medium databases


### Compute optimized

Ideal for compute-bound applications that benefit from high-performance processors

Use cases:

- high-performance web servers
- compute-intensive applications servers
- scientific modeling
- batch processing
- distributed analytics
- high-performance computing (HPC)
- machine/deep learning, ad serving
- highly scalable multiplayer gaming

### Memory optimized

Designed to deliver fast performance for workloads that process large data sets in memory.

Use cases:
- high-performance databases
- distributed web-scale in-memory caches
- mid-size in-memory databases
- real-time big-data analytics
- other enterprise applications.

### Accelerated computing

Use hardware accelerators or co-processors to perform some functions more efficiently than is possible in software running on CPUs.

Use cases:
- floating-point number calculations
- data pattern matching
- game streaming
- application streaming
- graphics processing, video encoding
- 3D visualizations, 3D rendering
- graphics-intensive remote workstations

### Storage optimized

Designed for workloads that require high, sequential read and write access to large data sets on local storage.

Examples of workloads suitable for storage optimized instances include distributed file systems, data warehousing applications, and high-frequency online transaction processing (OLTP) systems.

Storage optimized instances are designed to deliver tens of thousands of low-latency, random IOPS to applications.

Use cases:
- NoSQL databases, such as Cassandra, MongoDB, and Redis
- in-memory databases
- scale-out transactional databases
- data warehousing, Elasticsearch, and analytics.


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