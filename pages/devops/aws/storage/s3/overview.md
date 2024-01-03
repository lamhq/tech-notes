# Overview

## What Is Amazon S3?

Amazon S3 is a service that provides object-level storage.

Objects are redundantly stored across AZs in a region.

It offers unlimited storage space.

It can not be used to run an operating system or database.

Files can be from 0 bytes to **5 TB**.


## Use cases

- **Backup and storage**
- **Application Hosting**: Provide services that deploy, install, and manage web applications.
- **Media hosting**: Build a redundant, scalable, and highly available infrastructure that hosts video, photo, or music uploads and downloads.
- **Software delivery**: host your software applications that customers can download.
- **Static websites hosting**


## Object

S3 object is made up of:

- Key (name).
- Value (data).
- Version ID.
- Metadata.
- Access Control Lists.

You can define permissions on objects.


## Bucket

Amazon S3 store your objects in containers called buckets.

A bucket is a flat container of objects. It does not provide a hierarchy of objects but you can use an object key name (prefix) to mimic folders.

**Bucket name** must be unique globally.

An S3 bucket is region specific.

100 buckets per account by default.

Bucket names cannot be changed after they have been created.

If a bucket is deleted its name becomes available again.

![](./images/s3.png)


## Consistency model

Provides **strong read-after-write** consistency for PUTS of new objects: object is immediately available for reading after written.

Provides eventual consistency for overwrite PUTS and DELETES (takes time to propagate).


## Uploading

The largest object that can be uploaded in a single PUT is 5 gigabytes.

For objects larger than 100 megabytes use the Multipart Upload capability.

HTTP 200 code indicates a successful write to S3.


## Secure your data

### Bucket are private by default

You have to allow public access on bucket and its objects to make the bucket public.

### Server-side Encrypt

You can set default encryption on a bucket to encrypt new objects when they are stored in the bucket and then decrypt them when you download the objects.

### S3 Bucket Policies

S3 Bucket Policies specify what actions are allowed or denied
for a particular bucket.

Bucket policies are attached to buckets and they will apply across the bucket as a whole.

Use cases:
- Make entire buckets public using bucket policies.
- Enable cross-account access to S3, without using IAM roles.
- When your IAM policies exceed the size limit, S3 bucket policies have a larger size limit.

Here's an example of a policy that enforces encryption for all objects in your bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "RequireEncryption",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*",
      "Condition": {
        "StringNotEquals": {
          "s3:x-amz-server-side-encryption": "AES256"
        }
      }
    }
  ]
}
```

The `Principal` element specifies the entity (user, group, or service) that is granted or denied permissions to perform actions on the bucket or its objects. Value can be:
- `*`: the policy applies to anyone
- ARN of AWS user, IAM role, IAM group
- AWS services (like Lambda, CloudFront, etc.). For example: `"Principal": "lambda.amazonaws.com"`


### Access Control Lists (ACLs)

Define which AWS accounts or groups are granted access and the type of access.

You can attach S3 ACLs to individual objects within a bucket.

You can make individual objects public using object ACLs.

### IAM Policies

When IAM policies are attached to IAM users, groups, and roles, the policies define which actions they can perform.

You should use IAM policies for private buckets when:

- You have many buckets with different permission requirements. Instead of defining many different S3 bucket policies, you can use IAM policies instead.
- You want all policies to be in a centralized location. Using IAM policies allows you to manage all policy information in one location.


## Versioning

You can use Amazon S3 versioning feature to track changes to your objects over time.

If you enable versioning for a bucket, Amazon S3 automatically generates a unique version ID for the object being stored.

In one bucket, you can have two objects with the same key, but different version IDs, such as `employeephoto.gif` (version `111111`) and `employeephoto.gif` (version `121212`).

Versioning-enabled buckets let you recover objects from accidental deletion or overwrite.

- Deleting an object does not remove the object permanently but instead put a delete marker on the object. If you want to restore the object, you can remove this marker and it reinstates the object.
- If you overwrite an object, it results in a new object version in the bucket. You still have access to previous versions of the object.

### Versioning States

Buckets can be in one of three states:

- **Unversioned** (default): No new or existing objects in the bucket have a version.
- **Versioning-enabled**: This enables versioning for all objects in the bucket.
- **Versioning-suspended**: This suspends versioning for new objects. All new objects in the bucket will not have a version. However, all existing objects keep their object versions.

The versioning state applies to all of the objects in that bucket.

Storage costs are incurred for all objects in your bucket and all versions of those objects. To reduce your S3 bill, you may want to delete previous versions of your objects that are no longer in use.


## S3 Outposts

- Delivers object storage to your on-premises AWS Outposts environment
- Store data durably and redundantly across multiple devices and servers on your Outposts
- For workloads with local data residency requirements that must satisfy demanding performance needs by keeping data close to on-premises applications.
