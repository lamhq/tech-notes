# AWS Key Management Service

## Overview

AWS Key Management Service (AWS KMS) is a managed service that makes it easy for you to create and control the encryption keys used to encrypt your data.

AWS KMS is integrated with other AWS services - such as EBS, S3, and RDS - as well as other services to make it simple to encrypt your data with encryption keys you manage. It is integrated with AWS CloudTrail to provide you with logs of all key usage to help meet your regulatory and compliance needs.

AWS KMS provides you with centralized control over the lifecycle and permissions of your keys.
You can create new keys whenever you wish, and you can control who can manage keys separately from who can use them.

With AWS KMS, you can choose the specific levels of access control that you need for your keys. For example, you can specify which IAM users and roles are able to manage keys. Alternatively, you can temporarily disable keys so that they are no longer in use by anyone.


## CMK

A customer master key (CMK) is a logical representation of a master key. The CMK includes metadata, such as the key ID, creation date, description, and key state.

The CMK also contains the key material used to encrypt and decrypt data.

3 ways to generate a CMK:
- AWS creates the CMK for you. The key material for a CMK is generated within HSMs managed by AWS KMS.
- Import key material from your own key management infrastructure and associate it with a CMK.
- Have the key material generated and used in an AWS CloudHSM cluster as part of the custom key store feature in AWS KMS.


## How to use it?

You start using the service by requesting the creation of a CMK.

You control the lifecycle of the CMK as well as who can use or manage it.


## Key rotation

You can choose to have AWS KMS automatically rotate CMKs every year, provided that those keys were generated within AWS KMS HSMs (the first way to generate a CMK above).

Automatic key rotation is not supported for imported keys, asymmetric keys, or keys generated in an AWS CloudHSM cluster using the AWS KMS custom key store feature.


## Policies

The primary way to manage access to your AWS KMS CMKs is with policies. Policies are documents that describe who has access to what.

Policies attached to an IAM identity are called identity-based policies (or IAM policies), and policies attached to other kinds of resources are called resource-based policies.

In AWS KMS, you must attach resource-based policies to your customer master keys (CMKs). These are called key policies.

All KMS CMKs have a key policy.


## 3 ways to control permission

- **Use the key policy**. Controlling access this way means the full scope of access to the CMK is defined in a single document (the key policy).
- **Use IAM policies in combination with the key policy**. Controlling access this way enables you to manage all the permissions for your IAM identities in IAM.
- **Use grants in combination with the key policy**. Controlling access this way enables you to allow access to the CMK in the key policy, as well as allow users to delegate their access to others.
