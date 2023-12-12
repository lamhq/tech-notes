# Encryption

## Types of encryption

**Encryption in Transit**: This is when you're sending objects to and from your bucket. We do this using SSL certificates/TLS, HTTPS.

**Encryption at Rest (Server-Side)**: This is when the object is actually inside S3
or sitting on your computer. There's three different types:
- **SSE-S3**: S3 manages the keys. AWS manage all the encryption and decryption for you. It uses AES 256-bit encryption.
- **SSE-KMS**: use key provided by AWS Key Management Service (KMS).
- **SSE-C**: Customer-provided keys.

**Encryption at Rest (Client-Side)**: You encrypt the files yourself before you upload them to S3.


## Server-Side Encryption

Service-side encryption is now enabled by default.

All objects are automatically encrypted
by using server-side encryption with Amazon S3 managed keys.


## Enforcing Server-Side Encryption for S3 Uploads (legacy use cases)

If we were to upload a file to S3, we're essentially sending a PUT request.

To enforce service side encryption we've got two different options:
1. Add header `x-amz-server-side-encryption: AES256` (use S3-managed keys) to the PUT request
2. Add header `x-amz-server-side-encryption: aws:kms` (use KMS-managed keys ) to the PUT request

![](./images/enc-param.png)

Now what you can do is you can create a bucket policy
that denies any S3 PUT request
that doesn't include the `x-amz-server-side-encryption`
parameter in the request header.


## S3 Limitations when using KMS

If you are using SSE-KMS to encrypt/decrypt your objects in S3, you must keep in mind the KMS limits.

Uploading/downloading will count toward the **KMS quota**.

You can't request a quota increase for KMS. You might want to consider using the native bult-in S3 encryption than KMS.

> When you upload a file, you will call `GenerateDataKey` in the KMS API. When you download a file, you will call `Decrypt` in the KMS API.

The KMS's limits is Region-specific. (5,500 or 10,000 or 30,000 requests per second). This makes your upload/download much slower when reaching the limits.


## Instructions

To enable S3 encryption in the AWS Management Console, follow these steps:

1. Open the Amazon S3 console.
2. Choose the bucket that you want to encrypt.
3. Choose the **Properties** tab.
4. Choose **Default encryption**.
5. Choose **Edit**.
6. In the **Default encryption** dialog box, specify the following:
    - **Encryption**: The type of encryption you want to use.
    - **Master key**: The master key that you want to use for encryption.
7. Choose **Save changes**.
