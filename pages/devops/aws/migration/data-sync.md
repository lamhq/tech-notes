# AWS DataSync

## Overview

AWS DataSync is an **agent-based solution** for migrating **on-premises storage to AWS**.

It allows you to easily move large amounts of data online  between on-premises storage (NFS/SMB/NAS shares, HDFS) and AWS storage solutions (S3, Amazon EFS, Amazon FSx for Windows/Lustre/OpenZFS/NetApp ONTAP).

Ideal for a **one-time migration**.


## Using DataSync

![How does AWS DataSync work - simplifies, automates, and accelerates data transfer to or from AWS](https://docs.aws.amazon.com/images/datasync/latest/userguide/images/DataSync-chart-on-prem.png)

To configure and set up **DataSync**, you need to install and set up the DataSync agent as it is an agent-based solution. 

You then configure the DataSync service to show where the data is going to go.

This is all encrypted on-transit.

You get to decide whether you want your data to end up in an S3 Bucket, an EFS File System, or in FSx.
