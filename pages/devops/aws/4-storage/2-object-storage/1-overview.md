# Overview

## Object Storage

In object storage, each object consists of data, metadata, and a key.

The **data** might be an image, video, text document, or any other type of file. Unlike file storage, these objects are stored in a flat structure instead of a hierarchy.

**Metadata** contains information about what the data is, how it is used, the object size, and so on.

An object’s **key** is its unique identifier.

![](./images/obj-str.png)

When a file in object storage is modified, the entire object is updated.

![](./images/object-storage.png)

Object storage is generally useful when storing large data sets, unstructured files like media assets, and static assets, such as photos.


## What Is Amazon S3?

Amazon S3 is a service that provides object-level storage.

It offers unlimited storage space.

The maximum file size for an object is **5 TB**.

It can not be used to run an operating system or database.

When you upload a file to S3, you can set permissions to control visibility and access to it.

The **consistency model** for S3 is **Strong Read-After-Write** (as soon as you've written something to S3, it should be immediately available).


## Use cases

**Backup and storage**: S3 is a natural place to back up files because it is highly redundant. AWS stores EBS snapshots in S3 to take advantage of its high availability.

**Media hosting**: Because you can store unlimited objects, and each individual object can be up to 5 TBs, S3 is an ideal location to host video, photo, or music uploads.

**Software delivery**: host your software applications that customers can download.

**Data lakes**: S3 is an optimal foundation for a data lake because of its virtually unlimited scalability. You can increase storage from gigabytes to petabytes of content, paying only for what you use.

**Static websites**: You can configure your bucket to host a static website of HTML, CSS, and client-side scripts.

**Static content**: Because of the limitless scaling, the support for large files, and the fact that you access any object over the web at any time, S3 is the perfect place to store static content.


## Bucket

Amazon S3 store your objects in containers called buckets.

When you create a bucket, you choose at least two things: the bucket **name** and the **region** you want the bucket to reside in.

**Bucket name** is unique.

![](./images/s3.png)


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
