# Versioning

## Overview

Versioning stores all versions of an object (including all writes and even if an object is deleted).

Versioning protects against accidental object/data deletion or overwrites.

When you try to delete an object with versioning enabled a DELETE marker is placed on the object. You can remove DELETE marker to restore the object.

Only the S3 bucket owner can permanently delete objects once versioning is enabled.

You can have two objects with the same key, but different version IDs in a bucket.

Enabling versioning does not replicate existing objects.

Can be used for backup.

Once enabled versioning cannot be disabled only suspended.

Can be integrated with lifecycle rules.

Objects that existed before enabling versioning will have a version ID of `NULL`.


## Versioning and Replication

Reverting to previous versions isn't replicated.

Deletion with versioning replicates the delete marker. But deleting the delete marker is not replicated.


## Versioning States

Buckets can be in one of three states:

- **Unversioned** (default): no new or existing objects have a version.
- **Versioning-enabled**: enables versioning for all objects in the bucket.
- **Versioning-suspended**: suspends versioning for new objects.

Suspension:
- If you suspend versioning the existing objects remain as they are however new versions will not be created.
- While versioning is suspended new objects will have a version ID of NULL and uploaded objects of the same name will overwrite the existing object.



## Billing

Storage costs are incurred for all objects in your bucket and all versions of those objects.

To reduce your S3 bill, you may want to delete previous versions of your objects that are no longer in use.
