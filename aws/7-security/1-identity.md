# AWS Organizations

## Features

- Automate AWS account creation and management
- Create groups of accounts to reflect business needs
- Govern access to AWS services resources in Region by policy
- Set up a single payment method for all AWS accounts with consolidated billing
- Share resources across accounts. For example, you can share your central AWS Directory Service running on Managed Active Directory with all accounts in your organization, for application to access your central identity store.

## How it work?

First, you will choose an AWS account as a master account. Now, you create an organization in this master account.

when you use Organizations to create a new account, an IAM role will be created so that the master account can switch roles to access your member account.

Then, you can either create an organization unit called OU, or accounts, called member accounts, under organization. You can create service control policies to OU or to the member accounts.


## Best practices

- Plan ahead for the structure of your organization
- Keep the Master Account free of any operational AWS resources
- Use AWS CloudTrail in the master account to centrally track all AWS usage in the member accounts.
- Apply least privilege practice
- Assign policies to organizational units rather than to accounts
- Test new and modified policies on a single account before scaling up to organizational units.
- Use the APIs and AWS CloudFormation templates to ensure that every newly graded account is configured to your liking