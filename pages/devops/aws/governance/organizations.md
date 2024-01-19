# AWS Organizations

## Overview

AWS Organizations is a free governance tool that hepls you **centrally manage multiple AWS accounts and govern your environment**.

Using a multi-account environment is a recommended best-practice when scaling your cloud environment.

Available to all AWS customers at no additional charge.

## Account types

### Management Account
- Also called the Payer account
- Primary for centralizing governance.
- SCPs do not affect the management account.

### Member Account

- All other AWS accounts that belong to the organization. 
- Can include development accounts, testing accounts, production accounts.


## Consolidated billing

You can use AWS Organizations to set up a single payment method for all the AWS accounts in your organization through consolidated billing.

With consolidated billing, you can see a combined view of charges incurred by all your accounts.

Can also take advantage of pricing benefits from aggregated usage, such as volume discounts for Amazon EC2 and Amazon S3.

Consolidated billing separates paying accounts and linked accounts.

Limit of 20 linked accounts for consolidated billing (default).

Billing alerts can be setup at the paying account which shows billing for all linked accounts.


## Organizational Unit (OU)

A group of AWS accounts within an organization. An OU can also contain other OUs enabling you to create a hierarchy.


## Tag Enforcement

Provides capability to require specific tags is leveraged for all AWS resources.

This ensures consistent tagging practices and it enables better resource categorization and tracking


## Migrating accounts between organizations

Accounts can be migrated between organizations.

You must have root or IAM access to both the member and management accounts.

For migrating a few accounts, use AWS Organizations console. Otherwise, use API or AWS CLI.

Billing history and billing reports for all accounts stay with the management account in an organization.

Before migration download any billing or report history for any member accounts that you want to keep.

When a member account leaves an organization, all charges incurred by the account are charged directly to the standalone account.

Even if the account move only takes a minute to process, it is likely that some charges will be incurred by the member account.


## Best practices

- Create a centralized logging account for organizational CloudTrail logs.
- Leverage cross-account roles for accessing member accounts
- Plan ahead for the structure of your organization
- Keep the Master Account free of any operational AWS resources
- Apply least privilege practice
- Assign policies to organizational units rather than to accounts
- Test new and modified policies on a single account before scaling up to organizational units.
- Use the APIs and AWS CloudFormation templates to ensure that every newly graded account is configured to your liking


## Examples

We have an AWS organization with a management account and three team accounts in separate OUs. 

We apply an organization-wide service control policy to prevent root user access.

Then, we define specific service control policies for each OU, with different levels of control. These policies only apply to their respective group of accounts.

The development accounts have the development service control policy and the organizational policy, while the security operations account has the security policy and the organizational policy.

This allows for more granular control and simplifies the process.

![](./images/aws-org.png)
