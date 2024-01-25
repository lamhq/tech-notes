# AWS Systems Manager

## Overview

AWS Systems Manager is a **suite of tools** designed to let you **view, control, and automate both your managed instances** in AWS and on-premises.


## Features

- **Automation**: Use predefined or custom playbooks (documents) to enable resource management. Automation documents are the primary method used in scenarios asking you to configure the inside of an EC2 instance.
- **Run Command**: Remotely execute commands on managed compute without SSH or RDP
- **Patch Manager**: Automates patching managed instances (OS patches and applications)
- **Parameter Store**: Securely store your secrets and application configuration information
- **Maintenance Windows**: Define a schedule for performing actions on your managed instances
- **Session Manager**: Securely connect to your managed compute without needing SSH access
- **Logging**: Allows you to log all usage during sessions (commands and connections to CloudWatch and CloudTrail
- **SSM Agent**: Supports both Linux and Windows without the need for SSH or RDP. Agent-based connection without opening ports!


## AWS Systems Manager Agent (SSM Agent)

SSM Agent is a software component that is installed and executed on managed instances within AWS as well as on-premise.

It enables Systems Manager to update, manage, configure resources.

You can manage patch updates and even automate actions all from a centralized place.

The agent is typically preinstalled on a majority of the official AWS AMIs. Just ensure you have the IAM permissions needed and it is running!

It is possible to install the SSM Agent on your own compute and edge devices to allow Sytems Manager interactions


## Parameter Store

Parameter Store is a **free** feature to store config data and secret values in a hierarchical manner (`/dev/b_pass`) with parameter policies (expiration dates)

Parameter types:
- `String`: Parameters contain a block of plaintext
- `StringList`: Parameters contain a comma-separated list of values
- `SecureString`: Parameter where sensitive data needs to be stored and referenced in a secure manner (encrypted via AWS KMS, but no rotation)