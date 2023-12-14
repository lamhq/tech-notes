# AWS Storage Gateway

## Overview

Storage Gateway is a hybrid cloud storage service that helps you merge on-premises resources with the cloud.

It can help with a one-time migration or a long-term pairing of your architecture with AWS.

AWS Storage Gateway is a valuable tool for organizations seeking to leverage cloud storage capabilities while maintaining on-premises infrastructure.

AWS Storage Gateway offers **three distinct storage gateways**, each catering to different use cases.


## File Gateway

![](https://d1.awsstatic.com/cloud-storage/Amazon%20S3%20File%20Gateway%20How%20It%20Works%20Diagram.96e9f7180c6ec8b6212b4d6fadc4a9ac4507b421.png)

File Gateway is a network file share (NFS/SMB) that can be mounted locally and backs up your data into S3.

You can either back up all of your data into the cloud or keep a cached copy of the most recently used files. This means you don't have to download the recently used content out of S3 if you don't want to.

The scenario that you're going to run into on the test is going to be one where the user, or users, don't have enough on-prem storage space and your solution is going to be set up a cached file gateway.

This allows those users to **extend on-prem into the cloud**. You get all the benefits of having the data physically on-prem and all of the benefits of having it backed up in S3.

These Storage Gateway solutions are simply VMs that you're going to run inside of your on-prem environment and are provided by AWS.


## Tape Gateway

![](https://d1.awsstatic.com/product-marketing/Product-Page-Diagram_Tape-Gateway_HIW%402x%20(2).5ba3326ea93003722acc487804a34971613ec3c1.png)

**Tape Gateway** is a service that allows you to store your data in AWS without having to physically deal with tapes.

It tricks your backup devices into thinking that they're backing up to physical tapes, but they're actually backing up to Tape Gateway.

This service stores your data inside of AWS, inside of S3 Glacier, Glacier Deep Archive, depending on where you'd like to put it.

You don't have to change any of your current settings or backup workflows.

It's encrypted and safe, so you don't have to worry about transmitting sensitive data in plain text over the internet.


## Volume Gateway

![](https://d1.awsstatic.com/cloud-storage/volume-gateway-diagram.eedd58ab3fb8a5dcae088622b5c1595dac21a04b.png)

Volume Gateway is an iSCSI mount that backs up the disks that VMs are currently reading and writing to.

You can choose between cached or stored mode. In cached mode, frequently accessed data is stored locally for low-latency access, while in stored mode, all data is stored locally and asynchronously backed up to S3.

The important part is that it's all backed up inside of S3. From here, you can easily create EBS snapshots and restore volumes inside of AWS.

This is an easy way to migrate those volumes **from on-prem to become EBS volumes** inside of AWS.

Volume Gateway is another solution that's great for **backing up** content or if you're looking for **migration**.
