# Amazon Detective

## Overview

Using Detective, you can analyze, investigate, and quickly **identify the root cause** of potential security issues or suspicious activities.

Detective operates across multiple AWS services and analyzes the root cause of an event (using machine learning, statistical analysis, and graph theory).

Detective uses a number of sources within your AWS account to automatically create an overview of your users, resources, and the interactions between them over time, including:
- VPC Flow Logs
- CloudTrail logs
- Amazon EKS audit logs
- Amazon GuardDuty findings

Do not confuse this with **Inspector**, which is an automated vulnerability management service that continually scans EC2 and container workloads for software vulnerabilities and unintended network exposure.


## Use cases

### Triage Security Findings

If you have a suspected security instance, you need to be able to quickly assess if it's in fact real or a false positive.

Detective generates visualizations that can show you what resources, IP addresses, and AWS accounts are connected to your security incident to determine if the finding is an actual malicious activity or not.


### Threat Hunting

In comparison to root cause analysis, you can also be proactive and go threat hunting.

Detective helps with threat hunting by creating detailed visualizations on specific resources, such as IP addresses, AWS accounts, VPC, and EC2 instances.