# AWS Identity and Access Management (IAM)

IAM enables you to manage access to AWS services and resources securely.

IAM features:
- IAM users, groups, and roles
- IAM policies
- Multi-factor authentication

IAM is global and not specific to any one Region.

IAM is integrated with many AWS services  by default.

No additional charge.


## Root User

The root user is accessed by signing in with the email address and password that you used to create your AWS account.

The AWS root user has two sets of credentials associated with it:
- One set of credentials is the **email address and password** used to create the account. This allows you to access the AWS Management Console.
- The second set of credentials is called **access keys**, which allow you to make programmatic requests from the AWS Command Line Interface (AWS CLI) or AWS API.

**Access keys** consist of two parts:
- An access key ID, for example, A2lAl5EXAMPLE
- A secret access key, for example, wJalrFE/KbEKxE

The root user has complete access to all AWS services and resources in your account, as well as your billing and personal information.

**Best Practices**:
- Choose a strong password for the root user.
- [Enable MFA](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html) on your root user
- Delete your root user's access keys in [My Security Credentials page](https://console.aws.amazon.com/iam/home?#security_credential)
- Do not use the root user for everyday tasks.
- Use the root user to create **IAM user** and assign it permissions to create other users.


## IAM User

An IAM user is an identity that you create in AWS. It represents the person or application that interacts with AWS services and resources.

It consists of a name and credentials. When creating a user, you can choose to provide the user:

- Access to the AWS Management Console
- Programmatic access to the AWS Command Line Interface (AWS CLI) and AWS Application Programming Interface (AWS API)

To allow the IAM user to perform specific actions in AWS, you must grant the IAM user the necessary permissions.

**Best practice**: Create individual IAM users for each person who needs to access AWS. This provides additional security by allowing each IAM user to have a unique set of security credentials.


## IAM Group

An IAM group is a collection of users. All users in the group inherit the permissions assigned to the group.

- Groups can have many users.
- Users can belong to many groups.
- Groups cannot belong to groups.


## IAM Policy

An IAM policy is a document that allows or denies permissions to AWS services and resources.

To manage access and provide permissions to AWS services and resources, you create IAM policies and attach them to IAM users, groups, and roles.

Whenever a user or role makes a request, AWS evaluates the policies associated with them to determine if the request should be allowed or denied.

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

You can test IAM policies with the [IAM policy simulator](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html).


## IAM Role

An IAM role is an identity that you allow you to delegate access to a user or a service temporarily.

Before an IAM user, application, or service can use/assume an IAM role, they must be granted permissions to switch to the role.

When someone assumes an IAM role, they abandon all previous permissions that they had under a previous role and assume the permissions of the new role.

**Best practice:**
IAM roles are ideal for situations in which access to services or resources needs to be granted temporarily, instead of long-term.


### API authentication with IAM Role

Most AWS API calls that are made must be signed and authenticated. When you send an HTTP request to AWS, you must sign the request.

IAM users have associated credentials like an access key ID and secret access key that are used to sign requests. IAM roles are identities in AWS also have associated AWS credentials used to sign requests.

The credentials of IAM roles used to sign requests are programmatically acquired, temporary in nature, and they are automatically rotated. The credentials that roles provide expire and roles are assumed programmatically.

> For example, the EC2 instance will be assigned an IAM role whenever you launch it. This role can then be assumed by the application running on the virtual machine to gain access to the temporary credentials needed to sign the AWS API calls being made.

To create a role, you have to select what trusted entity is allowed to assume the role.

If one AWS service needs to send an API call to another AWS service, it will most likely use role-based access where the AWS service assumes a role, gains access to the temporary credentials, and then sends the API call to the other AWS service who then verifies the request.

**Another identity that can assume an IAM role to gain access to AWS is external identity providers**. You can leverage IAM roles to grant access to existing identities from your enterprise user directory. These are known as federated users. AWS assigns a role to a federated user when access is requested through an identity provider. We also have AWS services that can make this process a little bit easier, such as AWS Single Sign-On.
