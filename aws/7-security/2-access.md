# Access

There are three use cases when you need to provided access:

## Users access an AWS account and resources

An example of this use case is when you enable single sign-on on your AWS accounts to let a developer log in to an AWS account using credentials from your corporate identity to create and run an AWS Lambda function.

Another example is you are building an internal reporting portal hosted on AWS that only allows internal employees of your company to log in and see the reports.

Since your companies already have existing corporate identities on an Active Directory, you can federate this Active Directory with **Amazon Cognito**.


## Resources access to other resources

To allow your applications to access AWS services, you need to be able to validate the identity and permissions of your application's resources. 

For example, your containerized application runs on Elastic Kubernetes Service needs to do an API call to query a table in AWS NoSQL database DynamoDB. You will need to securely validate API calls and manage permissions for actions that your app is allowed to perform on DynamoDB tables using short-term credentials called **IAM roles**.

IAM roles enable you to grant resources access to data without distributing passwords, or API keys, or hard-coding credentials in your source code.


## End users access the application

Your application would need to manage user sign up and sign in, and you also need to enable multi-factor authentication when users sign in.


## AWS Single Sign-On

AWS Single Sign-On is a Cloud service that make it easy to centrally manage SSO access to multiple AWS accounts and business application.

It help you manage SSO access and user permission across all your AWS account in AWS organization.

AWS-SSO include a user portal where you can let your end user find and access assigned AWS accounts.

AWS-SSO include a user portal where you can let your end user find and access assigned AWS accounts, the Cloud application, and custom application in one place.


## Amazon Cloud Directory

Amazon Cloud Directory enable you to be flexible Cloud native directory. For organizing hierarchies of data along multiple dimensions.

With Cloud directory, you can create a directory for a variety of used cases such as organizational charge, course catalogs, and divine registry.


## AWS Cognito

Amazon Cognito itself provides an identity store called Cognito User Pools. This would store all your users so that registration, authentication, and even password resets are handled by the user pool.

if you have an existing identity store, you can federate or link in electronic identity across multiple systems.