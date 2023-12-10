# Aurora Serverless v2

## Overview

An on-demand, auto-scaling configuration for the MySQL-compatible and PostgreSQL-compatible editions of Amazon Aurora.

An Aurora Serverless DB cluster automatically starts up, shuts down, and scales capacity up or down based on your application's needs.

It can help you to stay within budget. Your're charged only for resources consumed by DB clusters, per-second billing.

It's the same data resiliency as Aurora provisioned: six copies of data across three AZs.

You can achieve high availability by Multi-AZ deployments.

Use Aurora Serverless if you want a simple, cost-effective option for infrequent, intermittent, or unpredictable workloads.


## Concepts

**Aurora Capacity Units (ACUs)**: Measurements on how your clusters scale. You set a minimum and maximum of ACUs for scaling requirements - can be zero (to shutdown).

ACUs are allocated quickly by AWS-managed warm pools.

Each ACUs is combination of about 2 GiB of memory, matching CPU, and networking capability.


## Usecases

- **Variable workloads**: unpredictable or sudden activity.
- **Multi-tenant apps**: Let the service manage database capacity for each individual app.
- **New Apps**: Unsure what database instance needs are required.
- **Dev and Test**: Development or testing of new features.
- **Mixed-Use Apps**: App might serve more than one purpose with different traffic spikes.
- **Capacity Planning**: Easily swap from provisioned to serverless or vice versa.