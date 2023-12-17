# Shared Responsibility Model

AWS is responsible for some parts of your environment and you (the customer) are responsible for other parts. This concept is known as the shared responsibility model.

![](https://docs.aws.amazon.com/images/whitepapers/latest/security-overview-aws-lambda/images/shared-responsibility.png)


## Customers: Security in the Cloud

Customers are responsible for the security of everything that they create and put in the AWS Cloud.

You also control how access rights are granted, managed, and revoked.

Steps include:
- Selecting, configuring, and patching the operating systems that will run on Amazon EC2 instances
- Configuring security groups
- Managing user accounts
- Choosing a Region for AWS resources in accordance with data sovereignty regulations
- Implementing data protection mechanisms, such as encryption and managing backups
- Using access control to limit who has access to your data and AWS resources


## AWS: Security of the Cloud

AWS operates, manages, and controls the components at all layers of infrastructure. This includes:
- the host operating system
- the virtualization layer
- the physical security of the data centers from which services operate.

AWS is responsible for **protecting** the global infrastructure that runs all of the services offered in the AWS Cloud. This infrastructure includes AWS Regions, Availability Zones, and edge locations.

AWS **manages the security** of the cloud, specifically the physical infrastructure that hosts your resources, which include:

- Physical security of data centers
- Hardware and software infrastructure
- Network infrastructure
- Virtualization infrastructure