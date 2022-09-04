# Getting Started with AWS Cloud

## What is AWS?

AWS is cloud computing provider.

## The Six Benefits of Cloud Computing

- **Pay as you go**. Instead of investing in data centers and hardware before you know how you are going to use them, you pay only when you use computing resources, and pay only for how much you use.
- **Benefit from massive economies of scale**.
- **Stop guessing capacity**. Eliminate guessing on your infrastructure capacity needs.
- **Increase speed and agility**. IT resources are only a click away, which means that you reduce the time to make those resources available to your developers from weeks to just minutes.
- **Stop spending money running and maintaining data centers**
- **Go global in minutes**. Easily deploy your application in multiple Regions around the world with just a few clicks.


## AWS Global Infrastructure

### Regions

Regions are geographic locations worldwide where AWS hosts its data centers.

Each AWS Region is associated with a geographical name and a Region code: *us-east-1*, *ap-northeast-1*, ...

![](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/Qum59ddKRmOpufXXSoZjhQ_95fce241b88c4c7bac1aa88954d013cb_globalinfra_2.jpeg?expiry=1662163200000&hmac=4gXK19tzYnVBD_WUTccxS3VWU68nOgA0CEaklNlMu6k)

**Choose the Right AWS Region**

- **Latency**: choose a Region that is close to your user base.
- **Price**: prices may vary from one Region to another.
- **Service availability**: Some services may not be available in some Regions.
- **Data compliance**:  Enterprise companies often need to comply with regulations that require customer data to be stored in a specific geographic territory

### Availability Zones

Inside every Region is a cluster of Availability Zones (AZ). An AZ consists of one or more data centers with redundant power, networking, and connectivity.

These data centers are connected using redundant high-speed and low-latency links.

AZs also have a code name:

- *us-east-1a*: an AZ in *us-east-1* (Northern Virginia Region)
- *sa-east-1b*: an AZ in *sa-east-1* (São Paulo Region in South America)

### Maintain Resiliency

To keep your application available, you need to maintain high availability and resiliency.

A well-known best practice for cloud architecture is to use Region-scoped, managed services. These services come with availability and resiliency built in.

Or make sure the workload is replicated across multiple AZs. At a minimum, you should use two AZs.

![](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/kTtu46zqSou7buOs6oqLew_b4777c328bdc4d1d8013e0560db9492a_GlobalINfra_4.jpeg?expiry=1662163200000&hmac=OEYsFlAH6xZ934G-UBrfHhAs01tygdGO_O4lVPcOCM4)


## Interacting with AWS

In AWS, you can make API calls to services and resources through:

- The AWS Management Console (web-based console)
- The AWS Command Line Interface (CLI)
- The AWS Software Development Kits (SDKs): executing code with programming languages.


## Security: What Is the Customer Responsible For?

When using any AWS service, you’re responsible for properly configuring the service and your applications, as well as ensuring your data is secure.

**Infrastructure services**: You control the operating system and application platform, as well as encrypting, protecting, and managing customer data.

**Container services**: You are responsible for customer data, encrypting that data, and protecting it through network firewalls and backups.

**Abstracted services**: You are responsible for managing customer data and protecting it through client-side encryption.

Here are some examples of your responsibilities in context:

- Choosing a Region for AWS resources in accordance with data sovereignty regulations
- Implementing data protection mechanisms, such as encryption and managing backups
- Using access control to limit who has access to your data and AWS resources


### Protect the AWS Root User

The AWS root user has two sets of credentials associated with it:
- One set of credentials is the **email address and password** used to create the account. This allows you to access the AWS Management Console.
- The second set of credentials is called **access keys**, which allow you to make programmatic requests from the AWS Command Line Interface (AWS CLI) or AWS API.

Access keys consist of two parts:

- An access key ID, for example, A2lAl5EXAMPLE
- A secret access key, for example, wJalrFE/KbEKxE

The root user has complete access to all AWS services and resources in your account, as well as your billing and personal information.

**Best Practices When Working with the AWS Root User**:

- Choose a strong password for the root user.
- Disable or delete the access keys associated with the root user.
- Do not use the root user for administrative tasks or everyday tasks.
- Delete your root user's access keys in [My Security Credentials page](https://console.aws.amazon.com/iam/home?#security_credential)
- [Enable MFA](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html) on your root user

## AWS Identity and Access Management

IAM is a web service that enables you to manage access to your AWS account and resources.

It also provides a centralized view of who and what are allowed inside your AWS account (authentication), and who and what have permissions to use and work with your AWS resources (authorization).

IAM is global and not specific to any one Region.

IAM is integrated with many AWS services  by default.

IAM supports MFA.

Any AWS customer can use IAM; the service is offered at no additional charge.

### IAM User?

An IAM user represents a person or service that interacts with AWS. You define the user within your AWS account.

Once you create a user, that user can sign in to gain access to the AWS resources inside your account.

An IAM user consists of a name and a set of credentials. When creating a user, you can choose to provide the user:

- Access to the AWS Management Console
- Programmatic access to the AWS Command Line Interface (AWS CLI) and AWS Application Programming Interface (AWS API)

To access the AWS Management Console, provide the users with a user name and password. For programmatic access, AWS generates a set of access keys that can be used with the AWS CLI and AWS API.

When you create an IAM user, you have the option to grant permissions directly at the user level.

### IAM Group

An IAM group is a collection of users. All users in the group inherit the permissions assigned to the group.

- Groups can have many users.
- Users can belong to many groups.
- Groups cannot belong to groups.

### IAM Policy

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


### IAM Role

An IAM role is an identity that can be assumed by someone or something who needs temporary access to AWS credentials.

Most AWS API calls that are made must be signed and authenticated. When you send an HTTP request to AWS, you must sign the request.

IAM users have associated credentials like an access key ID and secret access key that are used to sign requests. IAM roles are identities in AWS also have associated AWS credentials used to sign requests.

The credentials of IAM roles used to sign requests are programmatically acquired, temporary in nature, and they are automatically rotated. The credentials that roles provide expire and roles are assumed programmatically.

*For example, the EC2 instance will be assigned an IAM role whenever you launch it. This role can then be assumed by the application running on the virtual machine to gain access to the temporary credentials needed to sign the AWS API calls being made.*

To create a role, you have to select what trusted entity is allowed to assume the role.

If one AWS service needs to send an API call to another AWS service, it will most likely use role-based access where the AWS service assumes a role, gains access to the temporary credentials, and then sends the API call to the other AWS service who then verifies the request.

Another identity that can assume an IAM role to gain access to AWS is external identity providers. You can leverage IAM roles to grant access to existing identities from your enterprise user directory. These are known as federated users. AWS assigns a role to a federated user when access is requested through an identity provider. We also have AWS services that can make this process a little bit easier, such as AWS Single Sign-On.