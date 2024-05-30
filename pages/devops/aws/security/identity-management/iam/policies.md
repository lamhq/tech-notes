# IAM Policies

## Overview

An IAM Policy is a JSON document that defines permissions and resource access.

A policy has no effect until attached.

You can test IAM policies with the [IAM policy simulator](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html).


```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": "*",
    "Resource": "*"
  }]
}

{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Effect":"Allow",
      "Action":[
        "iam: ChangePassword",
        "iam: GetUser"
      ],
      "Resource":"arn:aws:iam::123456789012:user/${aws:username}"
    }
  ]
}
```

- The **Version** element defines the version of the policy language.
- The **Effect** element specifies whether the statement will allow or deny access.
- The **Action** element describes the type of action that should be allowed or denied.
- The **Resource** element specifies the object or objects that the policy statement covers.


## Policy Evaluation Logic

By default, all requests are implicitly denied.

An explicit allow in an identity-based or resource-based policy overrides this default.

An explicit deny in any policy overrides any allows. You cannot override an explicit deny.

![](https://digitalcloud.training/wp-content/uploads/2022/01/aws-iam-policy-evaluation-logic.jpeg)


## Policy types

### Managed policies

- Created and administered by AWS.
- Used for common use cases based on job function.
- Can be attached to multiple users, groups, or roles within and across AWS accounts.
- You cannot change the permissions defined in AWS managed policies.

The job-specific AWS managed policies include:

- Administrator.
- Billing.
- Database Administrator.
- Data Scientist.
- Developer Power User.
- Network Administrator.
- Security Auditor.
- Support User.
- System Administrator.
- View-Only User.


### Customer managed policies

- Standalone policy that you create and administer in your own AWS account.
- Can be attached to multiple users, groups, and roles – but only within your own account.
- Can be created by copying an existing managed policy and then customizing it.
- Recommended for use cases where the existing AWS Managed Policies don’t meet the needs of your environment.

### Inline policies

- Inline policies are embedded within the user, group, or role to which it is applied.
- Strict 1:1 relationship between the entity and the policy.
- When you delete the user, group, or role in which the inline policy is embedded, the policy will also be deleted.
- In most cases, AWS recommends using Managed Policies instead of inline policies.
- Inline policies are useful when you want to be sure that the permissions in a policy are not inadvertently assigned to any other user, group, or role.


## Identity-based policies

Identity-based policies are attached to an IAM identity (user, group of users, or role) and grant permissions to IAM entities (users and roles).


## Resource-based policies

Resource-based policies grant permissions to the principal (account, user, role, or federated user) specified as the principal.


## IAM permissions boundaries

Permissions boundaries sets the maximum permissions that an identity-based policy can grant to an IAM entity (user or role).
