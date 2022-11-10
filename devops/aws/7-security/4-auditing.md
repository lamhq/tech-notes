# Auditing

## AWS CloudTrail

It enables you to see who is doing what in your AWS infrastructure. You can track user usage of the console API calls, AWS SDKs, command line tools, and other AWS services themselves

You can view account activity right in the CloudTrail console.

You can direct CloudTrail events to Amazon S3, Amazon CloudWatch Events logs, and events. This allows you to perform analysis, archive events, and even remediate on an unexpected change.

https://aws.amazon.com/cloudtrail/


## AWS Config

This service records your AWS configuration, changes to that configuration, or a history, and even change notifications, so you're notified proactively.

It will discover these existing AWS resources and generate a full inventory, along with all the actual configuration details, for you. You can then determine how a resource was configured at any point in time.

You can tie this into the aforementioned AWS CloudTrail, so that you gain full visibility into who made the actual change at that point in time and what the change was.

https://aws.amazon.com/config/


## Amazon Inspector

Amazon Inspector automatically assesses applications for exposure, vulnerabilities, and deviations from best practices.

After performing an assessment, Amazon Inspector produces a detailed list of security findings prioritized by level of severity. These findings can be reviewed directly or as part of detailed assessment reports which are available via the Amazon Inspector console or API.

Amazon Inspector assessments are offered to you as pre-defined rules packages mapped to common security best practices and vulnerability definitions. These rules are regularly updated by AWS security researchers.

https://aws.amazon.com/inspector/


## AWS Trusted Advisor

AWS Trusted Advisor is an online tool that provides you real time guidance to help you provision your resources following AWS best practices.

Taking advantage of the recommendations provided by Trusted Advisor on a regular basis to help keep your solutions provisioned optimally.

https://aws.amazon.com/premiumsupport/technology/trusted-advisor/