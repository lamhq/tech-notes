# Expenditure and Usage Awareness

## Overview

- Governance: manage how the cloud is used with policies, groups, and efficient structure to ensure permissions are assigned to appropriate persons.
- Monitoring: use dashboards and custom monitors to be proactive
in your actions to wrangle your costs
- Decommission: stay aware of the lifecycle of your resources and decommission them regularly.


## Governance

### AWS Organizations

AWS Organizations can help to optimize costs:
- the consolidated billing feature allows you to view the total cost for all of your AWS accounts in one place, which makes maintaining an overall budget more efficiently
- Service control policies can be used to control access to your resources and services, and even specific Regions. this will help prevent wrong resources or services being launched.
- As you scale, managing multiple accounts will be key to maintaining your costs


### IAM

The principle of least privilege (limiting access to only what users or services need access to) will keep costly mistakes from happening.

Use IAM roles to delegate what access users or AWS services have to resources at other services.

Use IAM Access Analyzer tool to continuously monitors and analyzes permissions for your resources, detects any unintended or risky access.


### AWS Control Tower

AWS Control Tower provides several features to help optimize costs in AWS environment:

**Centralized Cost Optimization:**
- Control Tower allows you to centralize cost optimization by providing a single pane of glass for all cost-related concerns.
- You can use AWS Cost Explorer and AWS Budgets within Control Tower to gain better visibility into your AWS costs and drive cost-saving initiatives.

**Pre-Configured Landing Zone:**
- When you set up AWS Control Tower, it provisions an account factory and creates shared accounts (such as log archive and audit accounts).
- The landing zone includes pre-approved AWS services optimized for cost and performance, helping you start on the right foot.


## Monitoring

Using Tags to Monitor and Maintain Costs.

### Using Tags with IAM

IAM has access levels that can be used to review permissions. One of these levels is called Tagging. This level of access is specific to tag usage.


### AWS Organization tag policies

TBC.