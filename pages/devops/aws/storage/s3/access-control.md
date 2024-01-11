# Access control

## Overview

All objects in S3 are private by default. Only the object owner can access.

Mechanisms for controlling access to Amazon S3 resources:
- IAM policies
- Bucket policies
- Access Control Lists (ACLs)
- Presigned URLs (temporarily)
- Presigned Cookies (temporarily)


## IAM Policies

You should use IAM policies for private buckets when:

- You have many buckets with different permission requirements. Instead of defining many different S3 bucket policies, you can use IAM policies instead.
- You want all policies to be in a centralized location. Using IAM policies allows you to manage all policy information in one location.

The format for S3 resources is:

- `arn:aws:s3:::bucket_name`.
- `arn:aws:s3:::bucket_name/key_name`.

A bucket owner can grant permissions to another AWS account (or users in an account) to upload objects.
- The AWS account that uploads the objects owns them.
- The bucket owner does not have permissions on objects that other accounts own, however:
  - The bucket owner pays the charges.
  - The bucket owner can deny access to any objects regardless of ownership.
  - The bucket owner can archive any objects or restore archived objects regardless of ownership.


## Bucket Policies

S3 Bucket Policies specify what actions are allowed or denied
for a particular bucket.

Bucket policies are attached to buckets and they will apply across the bucket as a whole.

Use cases:
- Make entire buckets public using bucket policies.
- Enable cross-account access to S3, without using IAM roles.
- When your IAM policies exceed the size limit, S3 bucket policies have a larger size limit.

You can use the [AWS Policy Generator](https://awspolicygen.s3.amazonaws.com/policygen.html) to create a bucket policy for your Amazon S3 bucket.

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


## Presigned URLs

To share an object you can either make it public or generate a pre-signed URL.

Pre-signed URLs provide temporary access to a specific object to those who do not have AWS credentials.

Can be used for downloading and uploading S3 objects.

When creating a presigned URL, must provide:
- security credentials
- bucket name
- object key
- HTTP method
- expiration date and time.

You can create resigned urls using aws cli with the command: `aws s3 presign`.


## Presigned Cookies

This can be useful when you want to provide access to multiple restricted files.

The cookie will be saved on the user's computer, and they will be able to browse the the entire contents of the restricted content.
