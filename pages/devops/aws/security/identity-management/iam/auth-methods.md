# Authentication Methods

## Console password

A password that the user can enter to sign into interactive sessions such as the AWS Management Console.

A **password policy** can be defined for enforcing password length, complexity, etc. (applies to all users).

You can allow or disallow the ability to change passwords using an IAM policy.


## Access keys

Access keys consist of two parts: An access key ID and A secret access key. These can be used to make programmatic calls to AWS when using the API in program code or at a command prompt when using the AWS CLI or the AWS PowerShell tools.

You can assign two active access keys to a user at a time.

You can disable a user’s access key which prevents it from being used for API calls.

The Access Key ID and Secret Access Key can only be generated once and must be regenerated if lost.


## Server certificates

SSL/TLS certificates that you can use to authenticate with some AWS services.
AWS recommends that you use the AWS Certificate Manager (ACM) to provision, manage and deploy your server certificates.
Use IAM only when you must support HTTPS connections in a region that is not supported by ACM.

![](https://digitalcloud.training/wp-content/uploads/2022/01/IAM-2.jpg)
