# Database Instance

## Overview

A DB instance is a database environment in the cloud with the compute and storage resources you specify.

AWS fully manages database instances. You can't connect to them using SSH, and they don’t show up under your EC2 instances.

Database instances are accessed via endpoints (retrieved via the DB instance description).

By default, customers are allowed to have up to a total of **40** instances (only 10 of these can be Oracle or MS SQL unless you have your own licenses).


## Database Instance Classes

When you create your DB instance, you choose the instance class (processing power, memory, network bandwidth, disk throughput).

Amazon RDS supports three **instance classes**:
- **Standard**: meet the needs of most databases
- **Memory Optimized**: optimized for memory-intensive applications (3,904 GB of memory)
- **Burstable Performance**: for development, test, nonproduction databases

You can switch your instance to a different class


## Instance Storage

The DB instance uses EBS volumes as its storage layer. You can choose between three types of EBS **volume storage**:
- **General purpose SSD** (gp2): the larger your volume, the better performance you’ll get, minimum 20 GB
- **Provisioned IOPS SSD** (io1): lets you allocate the number of IOPS you need.
- **Magnetic storage** (not recommended): for older instances
