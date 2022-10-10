# Amazon Cognito

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
