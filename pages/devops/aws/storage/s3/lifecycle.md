# S3 Lifecycle

## Overview

Amazon S3 Lifecycle is a feature that enables you to define rules to automatically transition objects to a cheaper storage tier or delete objects that are no longer required after a set period of time.

Lifecycle configuration is an XML file applied at the bucket level as a subresource.

Can be applied to specific objects within a bucket: objects with a specific tag or objects with a specific prefix.


## Types of actions

**Transition actions** are used to define when you should transition your objects to another storage class.

**Expiration actions** define when objects expire and should be permanently deleted.

*For example, you might choose to transition objects to S3 Standard-IA storage class 30 days after you created them, or archive objects to the S3 Glacier storage class one year after creating them.*


## Transitions

Supported transitions:
- STANDARD → any.
- any → GLACIER, DEEP_ARCHIVE.
- STANDARD_IA → INTELLIGENT_TIERING, ONEZONE_IA.
- INTELLIGENT_TIERING → ONEZONE_IA.
- GLACIER → DEEP_ARCHIVE.

Not supported:
- any → STANDARD.
- any → REDUCED_REDUNDANCY.
- DEEP_ARCHIVE → any.
- INTELLIGENT_TIERING → STANDARD_IA.
- ONEZONE_IA → STANDARD_IA, INTELLIGENT_TIERING.
- GLACIER → DEEP_ARCHIVE.

## Manage lifecycle rule in AWS Management Console

To enable S3 lifecycle rules in the AWS Management Console, follow these steps:

1. Open the Amazon S3 console.
2. Choose the bucket that you want to apply lifecycle rules to.
3. Choose the **Management** tab and then choose **Lifecycle**.
4. Choose **Add lifecycle rule**.
5. In the **Add lifecycle rule** dialog box, specify the following:
    - **Name**: A name for the lifecycle rule.
    - **Filter scope**: The scope of the objects that you want to apply the rule to.
    - **Transitions**: The transitions that you want to apply to the objects.
    - **Expiration**: The expiration action that you want to apply to the objects.
    - **Noncurrent version expiration**: The expiration action that you want to apply to the noncurrent versions of the objects.
    - **Noncurrent version transitions**: The transitions that you want to apply to the noncurrent versions of the objects.
