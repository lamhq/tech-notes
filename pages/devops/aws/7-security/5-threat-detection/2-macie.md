# Amazon Macie 

## Overview

Amazon Macie is a security service that uses machine learning to automatically **discover, classify, and protect sensitive data in S3**.

Use AI to recognizes sensitive data such as PII, PHI, financial data, intellectual property

Provides dashboards and alerts that give visibility into how this data is being accessed or moved.

It alerts you about:
- public or unencrypted buckets
- buckets shared with AWS accounts outside of those defined in your AWS organizations

Great for frameworks like HIPAA (store health information in US) and GDPR (store PII in UK)


## Personally Identifiable Information (PII)

PII is personal data used to establish an individual's identity. This data could be exploited by criminals, used in identity theft and financial fraud

Examples:
- Home address, email address, Social Security number
- Passport number, driver's license number
- Date of birth, phone number, bank account, credit card number


## Macie Alerts

- You can filter and search Macie alerts in the AWS console
- Alerts sent to Amazon EventBridge can be integrated with your security incident and event management
(SIEM) system
- Can be integrated with AWS Security Hub for a broader analysis of your organization's security posture
- Can also be integrated with other AWS services, such as Step Functions, to automatically take remediation actions