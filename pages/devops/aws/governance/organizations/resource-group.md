# Resource Groups

## Overview

In AWS, a resource is an entity that you can work with.

A resource group is a collection of AWS resources that are all in the same AWS region, and that match criteria provided in a query.

Resource groups allow you to group resources and then tag them.

Resource groups make it easier to manage and automate tasks on large numbers of resources at one time.

You can access Resource Groups through any of the following entry points:
- On the navigation bar of the AWS Management Console.
- In the AWS Systems Manager console, from the left navigation pane entry for Resource Groups.
- By using the Resource Groups API, in AWS CLI commands or AWS SDK programming languages.

The Tag Editor assists with finding resources and adding tags.

Resource groups can be nested; a resource group can contain existing resource groups in the same region.


## Query types

In Resource Groups, there are two types of queries on which you can build a group. Both query types include resources that are specified in the format `AWS::service::resource`:

- **Tag-based**: Tag-based queries include lists of resources and tags. Tags are keys that help identify and sort your resources within your organization. Optionally, tags include values for keys.
- **AWS CloudFormation stack-based**: In an AWS CloudFormation stack-based query, you choose an AWS CloudFormation stack in your account in the current region, and then choose resource types within the stack that you want to be in the group. You can base your query on only one AWS CloudFormation stack.