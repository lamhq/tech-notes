# Amazon GuardDuty

[Amazon GuardDuty](https://aws.amazon.com/guardduty) is a service that provides intelligent threat detection for your AWS infrastructure and resources.

It identifies threats by continuously monitoring the network activity and account behavior within your AWS environment.

After you have enabled GuardDuty for your AWS account, GuardDuty begins monitoring your network and account activity.

You do not have to deploy or manage any additional security software. GuardDuty then continuously analyzes data from multiple AWS sources, including VPC Flow Logs and DNS logs. 

If GuardDuty detects any threats, you can review detailed findings about them from the AWS Management Console. Findings include recommended steps for remediation.

> You can also configure AWS Lambda functions to take remediation steps automatically in response to GuardDuty’s security findings.

![](images/guardduty.png)
