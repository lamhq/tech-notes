# Snapshots

## Overview

A snapshots is a point-in-time copy of a volume

Snapshots are stored on Amazon S3. Can only be accessed through the EC2 APIs.

Snapshots are incremental. Only the data that has been changed since your last snapshot are moved to S3. 

Deleting a snapshot removes only the data not needed by any other snapshot.

EBS volumes are AZ specific, but snapshots are region specific.

You can have up to 10,000 snapshots by default.


## Creating Snapshot

Snapshots can be taken of non-root EBS volumes while running.

For a consistent snapshot, it's recommended to stop the instance before taking.

Snapshots can be copied between regions (and be encrypted). Images are then created from the snapshot in the other region which creates an AMI that can be used to boot an instance.


## Migration

Can be used to migrate a system to a new AZ or region.

You can share snapshots, but only in the region in which they were created. To share to other regions, you will need to copy them to the destination region first.

To migrate volumes between AZs, create a snapshot then create a volume in another AZ from the snapshot (possible to change size and type).


## Restoring Snapshot

Volumes can be created from EBS snapshots that are the same size or larger.

You can create volumes from snapshots and choose the availability zone within the region.

You can resize volumes through restoring snapshots with different sizes (configured when taking the snapshot).


## Encryption

Can be used to convert an unencrypted volume to an encrypted volume.

If you take a snapshot of an encrypted EBS volume, the snapshot will be encrypted automatically.


## Pricing

You are charged for data traffic to S3 and storage costs on S3.

You are billed only for the changed blocks.
