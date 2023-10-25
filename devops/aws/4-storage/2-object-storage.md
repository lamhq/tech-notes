# Object Storage

## Overview

In object storage, each object consists of data, metadata, and a key.

The data might be an image, video, text document, or any other type of file. Unlike file storage, these objects are stored in a flat structure instead of a hierarchy.

Metadata contains information about what the data is, how it is used, the object size, and so on.

An object’s key is its unique identifier.

![](images/obj-str.png)

When a file in object storage is modified, the entire object is updated.

![](images/object-storage.png)

Object storage is generally useful when storing large data sets, unstructured files like media assets, and static assets, such as photos.


## What Is Amazon S3?

Amazon S3 is a service that provides object-level storage.

Amazon S3 stores data as objects in **buckets**.

Amazon S3 offers unlimited storage space. The maximum file size for an object in Amazon S3 is 5 TB.

When you upload a file to Amazon S3, you can set permissions to control visibility and access to it. You can also use the Amazon S3 versioning feature to track changes to your objects over time.


## S3 Bucket

Amazon S3 store your objects in containers called buckets.

When you create a bucket, you choose at least two things: the bucket name and the AWS Region you want the bucket to reside in.

**Bucket name** is unique.

![](images/s3.png)


## Storage Classes

S3 storage classes let you change your storage tier as your data characteristics change. 

When selecting an Amazon S3 storage class, consider these two factors:

- How often you plan to retrieve your data
- How available you need your data to be

> For example, if you are now accessing your old photos infrequently, you may want to change the storage class those photos are stored in to save on costs.

There are six S3 storage classes:


### Amazon S3 Standard

- Designed for frequently accessed data
- Stores data in a minimum of three Availability Zones
- Has a higher cost than other storage classes
- For websites, content distribution, and data analytics...


### Amazon S3 Intelligent-Tiering

- Ideal for data with unknown or changing access patterns
- Requires a small monthly monitoring and automation fee per object
- Automatically moves your data to the most cost-effective storage tier based on frequency of access.

> If you haven’t accessed an object for 30 consecutive days, Amazon S3 automatically moves it to the infrequent access tier, Amazon S3 Standard-IA.
>
> If you access an object in the infrequent access tier, Amazon S3 automatically moves it to the frequent access tier, Amazon S3 Standard.


### Amazon S3 Standard-Infrequent Access (S3 Standard-IA)
- Ideal for infrequently accessed data
- Similar to Amazon S3 Standard but has a lower storage price and higher retrieval price
- For long-term backups, disaster recovery files, and so on.


### Amazon S3 One Zone-Infrequent Access (S3 One Zone-IA)
- Stores data in a single Availability Zone
- Has a lower storage price than Amazon S3 Standard-IA

Good storage class to consider if the following conditions apply:

- You want to save costs on storage.
- Storing secondary backup copies of on-premises data or easily re-creatable data.

### Amazon S3 Glacier Instant Retrieval

- Works well for archived data that requires immediate access
- Can retrieve objects within a few milliseconds (same as Amazon S3 Standard)


### Amazon S3 Glacier Flexible Retrieval

- Low-cost storage designed for data archiving
- Able to retrieve objects within a few minutes to hours
- Example: store archived customer records or older photos and video files.


### Amazon S3 Glacier Deep Archive

- Lowest-cost object storage class ideal for archiving
- Able to retrieve objects within 12 hours
- Data is replicated and stored across at least three geographically dispersed Availability Zones.
- For data that might be accessed once or twice in a year.


### Amazon S3 Outposts

- Delivers object storage to your on-premises AWS Outposts environment
- Store data durably and redundantly across multiple devices and servers on your Outposts
- For workloads with local data residency requirements that must satisfy demanding performance needs by keeping data close to on-premises applications.


## S3 Use Cases

**Backup and storage**: S3 is a natural place to back up files because it is highly redundant. As mentioned in the last unit, AWS stores your EBS snapshots in S3 to take advantage of its high availability.

**Media hosting**: Because you can store unlimited objects, and each individual object can be up to 5 TBs, S3 is an ideal location to host video, photo, or music uploads.

**Software delivery**: host your software applications that customers can download.

**Data lakes**: S3 is an optimal foundation for a data lake because of its virtually unlimited scalability. You can increase storage from gigabytes to petabytes of content, paying only for what you use.

**Static websites**: You can configure your bucket to host a static website of HTML, CSS, and client-side scripts.

**Static content**: Because of the limitless scaling, the support for large files, and the fact that you access any object over the web at any time, S3 is the perfect place to store static content.


## Security

To be more specific about who can do what with your S3 resources, Amazon S3 provides two main access management features: **IAM policies** and **S3 bucket policies**.

### IAM Policies

When IAM policies are attached to IAM users, groups, and roles, the policies define which actions they can perform.

You should use IAM policies for private buckets when:

- You have many buckets with different permission requirements. Instead of defining many different S3 bucket policies, you can use IAM policies instead.
- You want all policies to be in a centralized location. Using IAM policies allows you to manage all policy information in one location.


### S3 Bucket Policies

S3 bucket policies are similar to IAM policies, in that they are both defined using the same policy language in a JSON format.

The difference is IAM policies are attached to users, groups, and roles, whereas S3 bucket policies are only attached to buckets.

S3 bucket policies specify what actions are allowed or denied on the bucket.

```json
{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Sid":"PublicRead",
      "Effect":"Allow",
      "Principal":"*",
      "Action":[
        "s3:GetObject"
      ],
      "Resource":[
        "arn:aws:s3:::employeebucket/*"
      ]
    }
  ]
}
```

S3 Bucket policies can only be placed on buckets, and cannot be used for folders or objects. However, the policy that is placed on the bucket applies to every object in that bucket.

You should use S3 bucket policies when:

- You need a simple way to do cross-account access to S3, without using IAM roles.
- Your IAM policies bump up against the defined size limit. S3 bucket policies have a larger size limit.


## Encrypt

Amazon S3 reinforces encryption in transit (as it travels to and from Amazon S3) and at rest.

To protect data at rest, you can use:

- Server-side encryption: This allows Amazon S3 to encrypt your object before saving it on disks in its data centers and then decrypt it when you download the objects.
- Client-side encryption: Encrypt your data client-side and upload the encrypted data to Amazon S3. In this case, you manage the encryption process, the encryption keys, and all related tools.

To encrypt in transit, you can use client-side encryption or Secure Sockets Layer (SSL).


## Versioning

If you don't use Amazon S3 versioning, anytime you upload an object called `employee.jpg` to the `employees` folder, it overwrites the original file.

This can be an issue for several reasons:

- `employee.jpg` is a common name for an employee photo object. You or someone else who has access to that bucket might not have intended to overwrite it, and now that you have, you no longer have access to the original file.
- You may want to preserve different versions of `employee.jpg`. Without versioning, if you wanted to create a new version of `employee.jpg`, you would need to upload the object and choose a different name for it. Having several objects all with slight differences in naming variations may cause confusion and clutter in your bucket.

If you enable versioning for a bucket, Amazon S3 automatically generates a unique version ID for the object being stored. In one bucket, for example, you can have two objects with the same key, but different version IDs, such as `employeephoto.gif` (version `111111`) and `employeephoto.gif` (version `121212`).

Versioning-enabled buckets let you recover objects from accidental deletion or overwrite.

- Deleting an object does not remove the object permanently. Instead, Amazon S3 puts a marker on the object that shows you tried to delete it. If you want to restore the object, you can remove this marker and it reinstates the object.
- If you overwrite an object, it results in a new object version in the bucket. You still have access to previous versions of the object.

**Versioning States**:

Buckets can be in one of three states:

- Unversioned (the default): No new or existing objects in the bucket have a version.
- Versioning-enabled: This enables versioning for all objects in the bucket.
- Versioning-suspended: This suspends versioning for new objects. All new objects in the bucket will not have a version. However, all existing objects keep their object versions.

The versioning state applies to all of the objects in that bucket. Keep in mind that storage costs are incurred for all objects in your bucket and all versions of those objects. To reduce your S3 bill, you may want to delete previous versions of your objects that are no longer in use.


## Automate Tier Transitions

If you keep manually changing your objects, you may want to look into automating this process using a lifecycle policy.

When you define a lifecycle policy configuration for an object or group of objects, you can choose to automate two actions: transition and expiration actions.

- **Transition actions** are used to define when you should transition your objects to another storage class.
- **Expiration actions** define when objects expire and should be permanently deleted.

*For example, you might choose to transition objects to S3 Standard-IA storage class 30 days after you created them, or archive objects to the S3 Glacier storage class one year after creating them.*

The following use cases are good candidates for lifecycle management:

- **Periodic logs**: If you upload periodic logs to a bucket, your application might need them for a week or a month. After that, you might want to delete them.
- **Data that changes in access frequency**: Some documents are frequently accessed for a limited period of time. After that, they are infrequently accessed. At some point, you might not need real-time access to them, but your organization or regulations might require you to archive them for a specific period. After that, you can delete them.