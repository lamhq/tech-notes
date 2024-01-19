# AWS Storage Gateway

## Overview

Storage Gateway is a enables **hybrid storage** between on-premises environments and the AWS Cloud.

It can help with a one-time **migration** or a long-term pairing of your architecture with AWS.

It provides low-latency performance by caching frequently accessed data on premises, while storing data securely and durably in Amazon cloud storage services (Amazon S3 and Glacier).

They are VMs provided by AWS that you run inside of your on-prem environment (VMware or Hyper-V virtual appliance).

Support three storage interfaces: file, volume, and tape.


## File Gateway

![](https://d1.awsstatic.com/cloud-storage/Amazon%20S3%20File%20Gateway%20How%20It%20Works%20Diagram.96e9f7180c6ec8b6212b4d6fadc4a9ac4507b421.png)

File Gateway is a network file share (NFS/SMB) that can be mounted locally and **backs up your data into S3**.

Supports Amazon S3 Standard, S3 Standard – Infrequent Access (S3 Standard – IA) and S3 One Zone – IA.

You can either back up all of your data into the cloud or keep a cached copy of the most recently used files.

The maximum size of an individual file is 5 TB.

Can be used where users don't have enough on-prem storage space and your solution is going to be set up a cached file gateway.


## Volume Gateway

![](https://d1.awsstatic.com/cloud-storage/volume-gateway-diagram.eedd58ab3fb8a5dcae088622b5c1595dac21a04b.png)

Volume Gateway are block-based volumes that **backs up** the disks that VMs are currently reading and writing to.

Support iSCSI (block storage protocol) mount.

You can choose between cached or stored mode:
- **cached mode**: frequently accessed data is stored locally for low-latency access
- **stored mode**: all data is stored locally and asynchronously backed up to S3

Data is all backed up inside of S3. You can easily create EBS snapshots and restore volumes inside of AWS.

Each volume gateway can support up to 32 volumes.

In cached mode, each volume can be up to 32 TB for a maximum of 1 PB of data per gateway (32 volumes, each 32 TB in size).

In stored mode, each volume can be up to 16 TB for a maximum of 512 TB of data per gateway (32 volumes, each 16 TB in size).


## Tape Gateway

![](https://d1.awsstatic.com/product-marketing/Product-Page-Diagram_Tape-Gateway_HIW%402x%20(2).5ba3326ea93003722acc487804a34971613ec3c1.png)

**Tape Gateway** is a service that allows you to store your data in AWS without having to physically deal with tapes.

It tricks your backup devices into thinking that they're backing up to physical tapes, but they're actually backing up to Tape Gateway.

This service stores your data inside of AWS, inside of S3 Glacier, Glacier Deep Archive, depending on where you'd like to put it.

When creating virtual tapes, you select one of the following sizes: 100 GB, 200 GB, 400 GB, 800 GB, 1.5 TB, and 2.5 TB.


## Encryption

Data transferred between gateway appliance and AWS is encrypted using SSL.

Data stored by AWS Storage Gateway in S3 is encrypted at-rest with Amazon S3-Managed Encryption Keys (SSE-S3).

When using the file gateway, you can optionally configure each file share to have your objects encrypted with AWS KMS-Managed Keys using SSE-KMS.