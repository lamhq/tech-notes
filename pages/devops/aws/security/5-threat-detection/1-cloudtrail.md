# AWS CloudTrail

## Overview

AWS CloudTrail records every read or write action (in the console or API calls) against your AWS resources.

You can identify what happened, who did it, when, and even their IP address.


## What is logged?

- Metadata around API calls
- The identity of the API caller
- The time of the API call
- The source IP address of the API caller
- The request parameters
- The response elements returned by the service


## Use cases

- Incident investigation. CloudTrail logs can be used to investigate unexpected events in your AWS environment
- Intrusion detection (near real-time). By integrating CloudTrail with Lambda functions, you can create a customizable intrusion detection system
- Industry and regulatory compliance


## Example

Suppose that the coffee shop owner is browsing through the AWS Identity and Access Management (IAM) section of the AWS Management Console. They discover that a new IAM user named Mary was created, but they do not who, when, or which method created the user.

To answer these questions, the owner navigates to AWS CloudTrail.

![](./images/cloudtrail.png)

On January 1, 2020 at 9:00 AM, IAM user John created a new IAM user (Mary) through the AWS Management Console.


## CloudTrail Insights

Within CloudTrail, you can also enable 
**CloudTrail Insights**. This optional feature allows CloudTrail to automatically **detect unusual API activities** in your AWS account. 

> For example, CloudTrail Insights might detect that a higher number of Amazon EC2 instances than usual have recently launched in your account. You can then review the full event details to determine which actions you need to take next.