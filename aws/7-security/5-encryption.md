# Encryption

## AWS Key Management Service (KMS)

AWS Key Management Service (KMS) makes it easy for you to create and manage keys and control the use of encryption across a wide range of AWS services and in your applications. 

AWS KMS is integrated with AWS CloudTrail to provide you with logs of all key usage to help meet your regulatory and compliance needs.

https://aws.amazon.com/kms/


## AWS CloudHSM

AWS CloudHSM is a cloud-based hardware security module (HSM) that enables you to easily generate and use your own encryption keys on the AWS Cloud.

It is a fully-managed service that automates time-consuming administrative tasks for you, such as hardware provisioning, software patching, high-availability, and backups. CloudHSM also enables you to scale quickly by adding and removing HSM capacity on-demand, with no up-front costs.

https://aws.amazon.com/cloudhsm/


## Encryption of Data in Transit

You can mount a file system so all NFS traffic is encrypted in transit using Transport Layer Security 1.2 (TLS) with an industry-standard AES-256 cipher.

TLS is a set of industry-standard cryptographic protocols used for encrypting information that is exchanged over the wire.

AES-256 is a 256-bit encryption cipher used for data transmission in TLS.

https://docs.aws.amazon.com/whitepapers/latest/efs-encrypted-file-systems/encryption-of-data-in-transit.html


## Encryption of Data at Rest

You can create an encrypted file system so all your data and metadata is encrypted at rest using an industry-standard AES-256 encryption algorithm.

Encryption and decryption is handled automatically and transparently, so you don’t have to modify your applications.


## Database Encryption

### Encryption at rest and in transit

Amazon RDS allows you to encrypt your databases using keys you manage through AWS Key Management Service (KMS). On a database instance running with Amazon RDS encryption, data stored at rest in the underlying storage is encrypted, as are its automated backups, read replicas, and snapshots.

Amazon RDS supports Transparent Data Encryption in SQL Server and Oracle. Transparent Data Encryption in Oracle is integrated with AWS CloudHSM, which allows you to securely generate, store, and manage your cryptographic keys in single-tenant Hardware Security Module (HSM) appliances within the AWS cloud.

Amazon RDS supports the use of SSL to secure data in transit.


### Network isolation

AWS recommends that you run your database instances in Amazon VPC, which allows you isolate your database in your own virtual network and connect to your on-premises IT infrastructure using industry-standard encrypted IPsec VPNs.

You can configure firewall settings and control network access to your database instances.


### Resource-level permissions

Amazon RDS is integrated with AWS Identity and Access Management (IAM) and provides you the ability to control the actions that your AWS IAM users and groups can take on specific Amazon RDS resources: database instances, snapshots, parameter groups, and option groups.

You can also tag your Amazon RDS resources and control the actions that your IAM users and groups can take on groups of resources that have the same tag and associated value. 


## Amazon S3 Encryption

Amazon S3 default encryption provides a way to set the default encryption behavior for an S3 bucket.

You can set default encryption on a bucket so that all objects are encrypted when they are stored in the bucket.

The objects are encrypted using server-side encryption with either Amazon S3-managed keys (SSE-S3) or AWS KMS-managed keys (SSE-KMS).

When you use server-side encryption, Amazon S3 encrypts an object before saving it to disk in its data centers and decrypts it when you download the objects.

https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-encryption.html

### Amazon Macie 

Amazon Macie is a security service that uses machine learning to automatically discover, classify, and protect sensitive data in AWS.

Amazon Macie recognizes sensitive data such as personally identifiable information (PII) or intellectual property, and provides you with dashboards and alerts that give visibility into how this data is being accessed or moved.

Currently, Amazon Macie is available to protect data stored in Amazon S3.

https://aws.amazon.com/macie/


## EBS Encryption

Amazon EBS encryption offers seamless encryption of EBS data volumes, boot volumes and snapshots, eliminating the need to build and manage a secure key management infrastructure.

EBS encryption enables data at rest security by encrypting your data volumes, boot volumes and snapshots using Amazon-managed keys or keys you create and manage using the AWS Key Management Service (KMS).

Access to Amazon EBS volumes is integrated with AWS Identity and Access Management (IAM). IAM enables access control to your Amazon EBS volumes.

https://aws.amazon.com/ebs/features/
