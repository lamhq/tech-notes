# Authorization and Access Control

EC2 Auto Scaling support identity-based IAM policies.

Amazon EC2 Auto Scaling uses service-linked roles for the permissions that it requires to call other AWS services on your behalf.

A service-linked role is a unique type of IAM role that is linked directly to an AWS service.

There is a default service-linked role for your account, named `AWSServiceRoleForAutoScaling`. This role is automatically assigned to your Auto Scaling groups unless you specify a different service-linked role.

You can apply tag-based, resource-level permissions in the identity-based policies that you create for Amazon EC2 Auto Scaling. This offers better control over which resources a user can create, modify, use, or delete.
