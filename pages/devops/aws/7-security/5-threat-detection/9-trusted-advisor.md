# AWS Trusted Advisor

## Overview

AWS Trusted Advisor is a fully managed **best-practice auditing tool**.

It inspects your AWS environments, and then makes recommendations when opportunities exist to **save money**, **improve system availability and performance**, or help **close security gaps**.

It uses industry and customer-established best practices to check our AWS accounts.

It works at an account level and requires nothing else but the service.

You can use AWS Trusted Advisor to assist you while you are creating new workflows and developing new applications. Or you can use it while you are making ongoing improvements to existing applications and resources.

There are different support levels:
- **Basic** or **Developer** support plans come with all checks in the **Service Limits** category, and only six checks in the **Security category**.
- With **Business**, **Enterprise On-Ramp**, or **Enterprise** support, we get **full access** to AWS Trusted Advisory checks, full integration with Amazon Event Bridge.


## Check Categories

- **Cost Optimization**: Recommendations where AWS believes we can actually save money within our accounts.
- **Performance**: Checks where and how we can improve speed, efficiency, and responsiveness of our applications resources.
- **Security**: How can we alter our security settings to secure our AWS accounts better? Helps maintain stricter security postures.
- **Fault Tolerance**: What can be done to help increase resiliency and availability of our resources?
- **Service Limits**: Checks the usage of our accounts and whether or not we are approaching service limits for the used resources/services.


## AWS Trusted Advisor Dashboard

![](https://d1.awsstatic.com/support/jp/Trusted%20Advisor%20best%20practice%20checks%20categories.76a13b0b2bf982c874d0d03e6138b7b73e45680c.png)

When you access the Trusted Advisor dashboard on the AWS Management Console, you can review completed checks for cost optimization, performance, security, fault tolerance, and service limits.

For each category:

- The **green** check indicates the number of items for which it detected **no problems**.
- The **orange** triangle represents the number of recommended **investigations**.
- The **red** circle represents the number of recommended **actions**.