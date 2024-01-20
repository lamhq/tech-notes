# Replication

## Cross Region Replication (CRR)

You can replicate objects to other buckets in different regions (and different AWS accounts).

Versioning must be enabled on both source and destination buckets.

You can configure separate S3 Lifecycle rules on the source and destination buckets.

You can specify a different storage class (by default the source storage class will be used).

You can set up replication at a bucket level, a shared prefix level, or an object level (by using Amazon S3 object tags).

To activate CRR you need to configure the replication on the source bucket:
- Define the bucket in the other region to replicate to.
- Specify to replicate all objects or a subset of objects with specific key name prefixes.

Replication behavior:
- Existing objects are not replicated, all subsequent updated objects will be replicated automatically.
- Delete markers are not replicated by default.

What isn’t replicated:
- Objects that existed before enabling replication (can use the copy API).
- Objects created with SSE-C and SSE-KMS.
- Objects to which the bucket owner does not have permissions.
- Updates to bucket-level subresources.
- Actions from lifecycle rules are not replicated.
- Objects in the source bucket that are replicated from another region are not replicated.

Deletion behavior:
- If a DELETE request is made without specifying an object version ID a delete marker will be added and replicated.
- If a DELETE request is made specifying an object version ID the object is deleted but the delete marker is not replicated.


### Permissions
- AWS S3 must have permission to replicate objects.
- Bucket owners must have permission to read the object and object ACL.
- source bucket owner must have permission to replicate objects into the destination bucket.


### Use Cases
- Compliance.
- Minimize Latency.
- Regional efficiency.


### Charges
- Requests for upload.
- Inter-region transfer.
- S3 storage in both regions.


## Same Region replication (SRR)

You can use SRR to replication objects to a destination bucket within the same region as the source bucket.

This feature was released in September 2018.

Replication is automatic and asynchronous.

New objects uploaded to an bucket are configured for replication at the bucket, prefix, or object tag levels.

Replicated objects can be owned by the same AWS account as the original copy or by different accounts, to protect from accidental deletion.
