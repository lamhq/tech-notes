# Amazon Inspector

## Overview

Amazon Inspector is an automated security assessment service that helps improve the security and compliance of applications deployed on AWS.

It automatically **assesses applications (VPCs, EC2 instances) for vulnerabilities** or deviations from best practices, such as:
- open access to Amazon EC2 instances
- installations of vulnerable software versions

After performing an assessment, Amazon Inspector produces a detailed list of security findings prioritized by level of severity and a recommendation for how to fix it.

Security findings can be reviewed directly or as part of detailed assessment reports that are available via the Amazon Inspector console or API.

With Amazon Inspector, you can **automate security vulnerability assessments** throughout your development and deployment pipelines or for static production systems.

Amazon Inspector provides an agent that analyzes system and resource configuration.

Keywords: vulnerability scans for EC2 instances and VPC.


## Types of Assessment

**Network Assessments**: Network configuration analysis to checks for ports reachable from outside the VPC.
Inspector agent is not required.

**Host Assessments**: Vulnerable software (VE), host hardening (CIS Benchmarks), and security best practices.
Inspector agent is required.


## How does it work?

1. Create assessment target
1. Install agents on EC2 instances (AWS will automatically install the agent for instances that allow Systems
Manager Run Command).
1. Create assessment template
1. Perform assessment run
1. Review findings against rules
