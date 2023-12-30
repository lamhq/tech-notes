# AWS Config

## Overview

AWS Config tracks how your AWS resources are configured and how they change over time.

You can view how your resources are related to one another and how they were configured at any time in the past.

You can also compare your resource configurations against a baseline that you define and have AWS Config **alert** you when a resource falls out of compliance.

This service is configured on per region. you must enable it independently
in each region where you have resources that you need to record.

Results can be aggregated across Regions and AWS Accounts.


## Features

This service helps you **discover** the architecture components running in your accounts. You can query based on resource type, tags, and even deletion of infrastructure resources. 

You can create **rules** to flag when something is going wrong compared to how you want your baseline infrastructure to be configured. Whenever one of these rules gets violated, you can alert a team via SNS, automatically remediate using SSM Automation documents, and even leverage Lambda functions to help perform the automation.

You can also use this service to check the **history** of your environments and see when something changed and who made that change.


## AWS Config Rules

AWS provides predefined **managed Config rules** that cover best practices and compliance checks. 

You can also create custom Config rules to evaluate resource configurations according to your organization's unique standards.

Config rules are evaluated on a schedule or based on a trigger. A trigger is initiated by a configuration change event.

AWS Config is a monitoring and assessment tool that provides visibility and alerting into resource Config changes. It's used to detect non-compliance and other deviations, but it will not prevent configuration changes. 

AWS Config is not free. $0.003 per configuration items you're recording, $0.001 per rule evaluation.


## Remediation

AWS Config allows automatic remediation of non-compliant configurations. You can use Systems Manager Automation Documents to be run whenever a non-compliant resource is detected.

The Automation Documents can be either AWS-managed or custom documents created by you. AWS provides a range of built-in Automation Documents to address common remediation tasks.

For more complex or custom remediation tasks, you can create your own documents that leverage Lambda functions. These functions can execute specific logic to correct your resource configurations.

In case an automatic remediation attempt fails, Config provides the option to enable a retry. This ensures that the systems will continue to attempt remediation until that non-compliant configuration is corrected.


## Alert and Events

### SNS

AWS Config easily integrates with SNS topics for alerting on configuration changes and compliance state notifications.

You can configure your topics to deliver messages to different subscribers, including email addresses for operations teams or SMS to someone on call. You can also trigger other services to start remediation efforts.

### EventBridge

EventBridge can send events from AWS Config events to other AWS services like SQS and Lambda. For example, you can send events to SQS or Lambda to automate responses to specific changes that are recorded. These integrations enable you to set up real-time alerting and event-driven automation in response to configuration changes and compliance status updates.


## Tips

- AWS Config is the best way to check what standards are applied to your architecture
- You can track previously deleted AWS resources using AWS Config
- You can use Automation documents and Lambda to enforce your standards
- You can roll up all your results to a single region (aggregation)
- AWS Config is a regional service!
- AWS Config is NOT preventative!