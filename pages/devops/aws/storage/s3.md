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

**100** buckets per account by default.

Bucket names cannot be changed after they have been created.

If a bucket is deleted its name becomes available again.

![](./images/s3.png)


## Sub-resources

Sub-resources are subordinate to objects, they do not exist independently but are always associated with another entity such as an object or bucket.

Sub-resources associated with buckets include:
- Lifecycle – define an object’s lifecycle.
- Website – configuration for hosting static websites.
- Versioning – retain multiple versions of objects as they are changed.
- Access Control Lists (ACLs) – control permissions access to the bucket.
- Bucket Policies – control access to the bucket.
- Cross Origin Resource Sharing (CORS).
- Logging.

Sub-resources associated with objects include:
- ACLs – define permissions to access the object.
- Restore – restoring an archive.


## Consistency model

Provides **strong read-after-write** consistency for PUTS of new objects: object is immediately available for reading after written.

Provides eventual consistency for overwrite PUTS and DELETES (takes time to propagate).


## S3 Outposts

- Delivers object storage to your on-premises AWS Outposts environment
- Store data durably and redundantly across multiple devices and servers on your Outposts
- For workloads with local data residency requirements that must satisfy demanding performance needs by keeping data close to on-premises applications.


## S3 Copy

You can create a copy of objects up to 5GB in size in a single atomic operation.

Can be performed using the AWS SDKs or REST API.

The copy operation can be used to:

- Generate additional copies of objects.
- Renaming objects.
- Changing the copy's storage class or encryption at rest status.
- Move objects across AWS locations/regions.
- Change object metadata. Once uploaded to S3 some object metadata cannot be changed, copying the object can allow you to modify this information.


## Static Websites

S3 can be used to host static websites.

URL is: `<bucketname>.s3-website-.amazonaws.com`.

Supports publicly readable content only.

Only supports GET and HEAD requests on objects.

You can use a custom domain name with S3 using a Route 53 Alias record. When using a custom domain name the bucket name must be the same as the domain name.

Can enable redirection for the whole domain, pages, or specific objects.

Does not support HTTPS/SSL.

To enable website hosting on a bucket, specify:
- An Index document (default web page).
- Error document (optional).


## Object Tags

S3 object tags are key-value pairs applied to S3 objects which can be created, updated, or deleted at any time during the lifetime of the object.

Allow you to create IAM policies, setup S3 Lifecycle policies, and customize storage metrics.

Up to **10** tags can be added to each S3 object and you can use either the AWS Management Console, the REST API, the AWS CLI, or the AWS SDKs to add object tags.


## Monitoring and Reporting

Amazon CloudWatch metrics for Amazon S3 can help you understand and improve the performance of applications that use Amazon S3.

There are several ways that you can use CloudWatch with Amazon S3:
- **Daily storage metrics for buckets** ‐ Monitor bucket storage using CloudWatch, which collects and processes storage data from Amazon S3 into readable, daily metrics. These storage metrics are reported once per day and are provided to all customers at no additional cost.
- **Request metrics** ‐ Monitor Amazon S3 requests to quickly identify and act on operational issues. The metrics are available at 1-minute intervals after some latency to process. These metrics are billed at the same rate as the Amazon CloudWatch custom metrics.
- **Replication metrics** ‐ Monitor the total number of S3 API operations that are pending replication, the total size of objects pending replication, and the maximum replication time to the destination Region. Only replication rules that have S3 Replication Time Control (S3 RTC) enabled will publish replication metrics.

The S3 metrics that can be monitored include:
- S3 requests.
- Bucket storage.
- Bucket size.
- All requests.
- HTTP 4XX/5XX errors.


## Logging and Auditing

You can record the actions that are taken by users, roles, or AWS services on Amazon S3 resources and maintain log records for auditing and compliance purposes.

AWS recommend that you use **AWS CloudTrail** for logging bucket and object-level actions for your Amazon S3 resources.

**Server access logging** provides detailed records for the requests that are made to a bucket.

You must not set the bucket being logged to be the destination for the logs as this creates a logging loop and the bucket will grow exponentially.