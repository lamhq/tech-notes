# S3 Lifecycle

## Overview

Amazon S3 Lifecycle is a feature that enables you to define rules to automatically transition objects to a cheaper storage tier or delete objects that are no longer required after a set period of time.


## Types of actions

- **Transition actions** are used to define when you should transition your objects to another storage class.
- **Expiration actions** define when objects expire and should be permanently deleted.


*For example, you might choose to transition objects to S3 Standard-IA storage class 30 days after you created them, or archive objects to the S3 Glacier storage class one year after creating them.*

## Use cases

**Periodic logs**: If you upload periodic logs to a bucket, your application might need them for a week or a month. After that, you might want to delete them.

**Data that changes in access frequency**: Some documents are frequently accessed for a limited period of time. After that, they are infrequently accessed. At some point, you might not need real-time access to them, but your organization or regulations might require you to archive them for a specific period. After that, you can delete them.


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
