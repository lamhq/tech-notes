# AWS Health (AWS Personal Health Dashboard)

## Overview

AWS Health provides ongoing visibility into your resource performance and the **availability of AWS services and accounts**.

You can view how the health events affect you and your services, resources, and accounts.

It helps you be better prepared and allows you to implement automation regarding different event types. You can view upcoming maintenance tasks that may affect your accounts and resources.

It has near-instant delivery of notifications and alerts to speed up troubleshooting or prevention.

You can automate actions based on incoming events using **Amazon Event Bridge**. You can look for an event coming into this service, kick off some type of automation via Event Bridge, which may be connected to an SNS topic or maybe a Lambda function.

Keywords:
- checking alerts for service health
- automating the reboot of EC2 instances for AWS maintenance.


## Concepts

**AWS Health event**: Notifications sent on behalf of AWS services or AWS

**Account-specific event**: Events specific to your AWS account or AWS organization

**Public event**: Events reported on services that are public, not specific to accounts

**AWS Health Dashboard**: Dashboard showing account and public events, shows service health as well

**Event type code**: Include the affected services and the specific type of event

**Event type category**: Associated category - will be attached to every event

**Event status**: Reports if the event is open, closed, or upcoming

**Affected entities**: Which AWS resources are or may be affected by the event