# Service Control Policies (SCPs)

SCPS are JSON policies that get applied to OUs or accounts to control over the maximum available permissions for accounts in your organization.

SCPs help you to ensure your accounts stay within your organization’s access control guidelines.

They are the only way to restrict what the root account can do.

SCPs are available only in an organization that has all features enabled. Not available if only consolidated billing features are enabled.


## How it works?

No permissions are granted by an SCP. An SCP defines a guardrail, or sets limits, on the actions that the account’s administrator can delegate to the IAM users and roles in the affected accounts.

Permissions must still be granted with appropriate IAM permission policies.

The administrator must still attach identity-based or resource-based policies to IAM users or roles, or to the resources in your accounts to grant permissions.

If a user or role has an IAM permission policy that grants access to an action that is also allowed by the applicable SCPs, the user or role can perform that action.


## SCPs boundary

SCPs affect only member accounts in the organization. They have no effect on users or roles in the management account.

SCPs don’t affect resource-based policies directly.

An SCP restricts permissions for IAM users and roles in member accounts, including the member account’s root user.

Any account inherit permissions permitted from its ancestors.


## Limitations

You can’t use SCPs to restrict the following tasks:

- Any action performed by the management account.
- Any action performed using permissions that are attached to a service-linked role.
- Register for the Enterprise support plan as the root user.
- Change the AWS support level as the root user.
- Provide trusted signer functionality for CloudFront private content.
- Configure reverse DNS for an Amazon Lightsail email server as the root user.
- Tasks on some AWS-related services:
- Alexa Top Sites.
- Alexa Web Information Service.
- Amazon Mechanical Turk.
- Amazon Product Marketing API.


## Example

An example policy that denies any attempt to stop or terminate all EC2 instances within the account:

```json
{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Sid":"DenyStopAndTerminate",
      "Effect":"Deny",
      "Action":[
        "ec2:StopInstances",
        "ec2:TerminateInstances"
      ],
      "Resource":"*"
    }
  ]
}
```
