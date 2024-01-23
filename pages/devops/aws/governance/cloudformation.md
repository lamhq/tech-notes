# AWS CloudFormation

## Overview

AWS service that allows you to declare your AWS infrastructure as code.

Everything is defined via a JSON orYAML template file.

Not ALL AWS resources are supported, but most are!


## Process

- Write your code. Declarative programming language that supports either JSON or YAML formatting.
- Deploy your code as a Stack or Stack Set. CloudFormation will go through the process of making the needed AWS API calls on your behalf.


## Benefits

- **Infrastructure as Code**. Allows you to easily leverage version control for all supported AWS infrastructure resources.
- **Cost Tracking**. Leverage stack tags in order to easily identify resources and their cost.
- **Automated Deployment**. No more having to manually stand up resources. Deploy and destroy them automatically via a template!
- **Stacks Are Regional**. Each stack you deploy is a regional resource. Easily deploy portable stacks into other regions as needed!
- **Change Sets**. You can generate a preview of resource changes when updating an existing stack.
- **Stack Sets**. Use an admin account to create, update, or delete stacks across multiple accounts and Regions with a single operation.


## Template sections

- `AWSTemplateFormatVersion` (optional): identifies the capabilities of the template. The latest template format version is `2010-09-09`
- `Parameters` (optional): You can use parameters to dynamically create resources
based on input values for your template.
- `Mappings` (optional): Mappings are used to look up values based on different data points. A common example of mappings is to use regional mappings
that map to specific AMI IDs for EC2 instances.
- `Resources` (optional): where to define all of your resources in your account
as well as their configuration requirements.
- `Output` (optional): specify what information and values to be referenced
within other stacks
- `Transform` (optional): specify one or more macros to modify the template
before it's actually processed.


## Immutable pattern

The immutable pattern specifies a deployment of application code by starting an entirely new set of servers with a new configuration or version of application code.

When we go immutable, we don't want to ever upgrade in place. Once the cloud resource exists, it can't be modified.