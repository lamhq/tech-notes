# Snapshots

## Overview

A snapshots is a point-in-time copy of a volume

Snapshots are stored on Amazon S3. Can only be accessed through the EC2 APIs.

Snapshots are incremental. Only the data that has been changed since your last snapshot are moved to S3. 

Deleting a snapshot removes only the data not needed by any other snapshot.

EBS volumes are AZ specific, but snapshots are region specific.

You can have up to 10,000 snapshots by default.


## Creating snapshot

Snapshots can be taken of non-root EBS volumes while running.

For a consistent snapshot, it's recommended to stop the instance before taking.


## Copying snapshot

You can copy within or between regions.

You can copy unencrypted snapshots (optionally encrypt).

You can copy an encrypted snapshot (optionally re-encrypt with a different key).

If you try to copy an encrypted snapshot without having access to the encryption keys it will fail silently (cross-account permissions are required).

You cannot take a copy of a snapshot when it is in a “pending” state, it must be “complete”.

Data is encrypted in transit while copying.

You can have up to 5 snapshot copy requests running in a single destination per account.

Use cases:

- Creating services in other regions.
- Disaster Recovery – the ability to restore from snapshot in another region.
- Migration to another region.
- Applying encryption.
- Data retention.


## Restoring snapshot

Volumes can be created from EBS snapshots that are the same size or larger.

You can create volumes from snapshots and choose the availability zone within the region.

You can resize volumes through restoring snapshots with different sizes (configured when taking the snapshot).


## Migration

Can be used to migrate a system to a new AZ or region.

You can share snapshots in the region in which they were created. To share to other regions, you will need to copy them to the destination region first.

To migrate volumes between AZs, create a snapshot then create a volume in another AZ from the snapshot (possible to change size and type).


## Encryption

Can be used to convert an unencrypted volume to an encrypted volume.

If you take a snapshot of an encrypted EBS volume, the snapshot will be encrypted automatically.


## Pricing

You are charged for data traffic to S3 and storage costs on S3.

You are billed only for the changed blocks.
