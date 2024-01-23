# AWS IAM Identity Center (AWS Single Sign-On)

## Overview

**AWS IAM Identity Center** is the **recommended AWS service** for managing human user access to AWS resources. 

It provides a **centralized place** where you can **create or connect workforce users** and **centrally manage their access** across all their AWS accounts and applications. 

You can use **multi-account permissions** to assign workforce users access to AWS accounts, as well as **application assignments** to grant access to both AWS managed and customer managed applications.

The term **single sign-on** describe the authentication scheme that allows users to sign in one time to access multiple applications and websites.


## Features

### Manage workforce identities

**Workforce users/identities**: Human users who build or operate workloads in AWS, they are employees or contractors who you allow to access AWS accounts in your organization and internal business applications.

You can create workforce users and groups in IAM Identity Center, or connect and synchronize to an existing set of users and groups in your own identity source for use across all your AWS accounts and applications


### Manage instances of IAM Identity Center

**IAM Identity Center** offers two types of instances: **organization instances** and **account instances**. Here's a concise breakdown:

**Organization Instances**:
- These instances are recommended for all production use of applications.
- Deployed in the **AWS Organizations management account**.
- Provide a **single point** for managing user access across the entire AWS environment.

**Account Instances**:
- Bound to the **specific AWS account** where they are enabled.
- Use account instances **only for isolated deployments** of select AWS managed applications.


### Manage access to multiple AWS accounts

**Multi-account permissions** allow you to centrally manage permissions across multiple AWS accounts without manual configuration. You can create permissions based on job functions or custom security needs and assign them to workforce users for specific account access.

This feature is available **only for organization instances**. If you're already using per-account IAM role management, both systems can coexist. To explore multi-account permissions, start with a limited implementation and gradually transition more of your environment to this system over time.
