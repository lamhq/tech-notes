# Amazon Machine Image (AMI)

## Overview

An AMI provides the information required to launch an instance.

You must specify an AMI when you launch an instance.

5 things you can base your AMI on:
- Region
- Operating system
- Architecture (32-bit or 64-bit)
- Launch permissions
- Storage for the root device (root device volume)


## How it work?

AMI let you configure which operating system you want, you can also select storage mappings, the architecture type (such as 32-bit, 64-bit, or 64-bit ARM), and additional software installed.

The AMI is how you model and define your instance, while the EC2 instance is the entity you interact with, where you can install your web server, and serve your content to users.

When you launch a new instance, AWS allocates a virtual machine that runs on a hypervisor. Then the AMI you selected is copied to the root device volume, which contains the image used to boot the volume. In the end, you get a server you can connect to and install packages and any additional software. In this case, you install a web server along with the properly configured source code of your employee directory app.

One advantage of using AMIs is that they are reusable. You can create an AMI from your running instance and use this AMI to start a new instance. This way, your new instance will have all the same configurations as your current instance, because the configurations set in the AMIs are the same.


## Category

AMIs are categorized as either being backed by Amazon EBS or by instance store:
- With **EBS**, the root device for an instance launched from the AMI is an EBS volume
created from an Amazon EBS snapshot.
- For **Instance Store**, the root device for an instance launch from the AMI is an instance store volume created from a template stored in Amazon S3.


## Instance Store Volumes

Instance store volumes are sometimes called ephemeral storage.

Instance store volumes cannot be stopped. If the underlying host fails, you will lose your data.

You can, however, reboot the instance without losing your data.

If you delete the instance, you will lose the instance store volume.
