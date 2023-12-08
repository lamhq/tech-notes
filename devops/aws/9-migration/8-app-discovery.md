# AWS Application Discovery Service

## Overview

AWS Application Discovery Service helps you migrations to
AWS via collection of usage and configuration data from on-premises servers.

It integrates with AWS Migration Hub, simplifying migrations and tracking migration statuses.

It helps you easily view discovered servers, group them by application, and track each application migration.


## Discovery Types

AWS Application Discovery Service offers two types of discoveries for our on-premise servers:

### Agentless

Agentless discovery is performed via an Agentless collector, which is an OVA file within VMware vCenter.

Once you deploy the OVA, it helps you identify your different hosts and all of the VMs within that vCenter where you deployed it.

The collector tracks and collects IP and MAC addresses, resource allocations, hostnames, and utilization data metrics such as peak utilization for CPU, RAM, and disk IO metrics.


### Agent Based

AWS Application Discovery Agent is an agent-based discovery service.

You can install this agent on each of your VMs and physical servers, regardless of the operating system.

The agent collects static config data, time-series performance information, network connections, and operating system processes.