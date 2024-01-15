# Aurora Serverless

## Overview

Amazon Aurora Serverless is an on-demand, auto-scaling **configuration** for Amazon Aurora.

Available for MySQL-compatible and PostgreSQL-compatible editions.

The database automatically starts up, shuts down, and scales capacity up or down based on application needs. Enables you to run a database in the cloud without managing any database instances.

It's a simple, cost-effective option for infrequent, intermittent, or unpredictable workloads.

You simply create a database endpoint and optionally specify the desired database capacity range and connect applications.

Has the same data resiliency as Aurora provisioned: 6 copies of data across three AZs.

You can achieve high availability by Multi-AZ deployments.

You can easily switch between standard and serverless configurations with a few clicks.


## Use cases

- **Variable workloads**: unpredictable or sudden activity.
- **Multi-tenant apps**: Let the service manage database capacity for each individual app.
- **New Apps**: Unsure what database instance needs are required.
- **Dev and Test**: Development or testing of new features.
- **Mixed-Use Apps**: App might serve more than one purpose with different traffic spikes.
- **Capacity Planning**: Easily swap from provisioned to serverless or vice versa.

## Pricing

Follows pay-as-you-go model.

Your're charged for:
- the amount of storage space used
- database capacity you use when the database is active, per-second billing


## Aurora Capacity Units

Aurora Capacity Units (ACUs) are measurements on how your clusters scale.

Each ACUs coresponds to approximately 2 GiB of memory, assiciated CPU, and networking capability.

You set a minimum and maximum of ACUs for scaling requirements (zero to shutdown).

Aurora Serverless v2 allows you to scale your capacity from 0.5 ACU to a maximum of 128 ACUs, with increments of 0.5 ACU units.

ACUs are allocated quickly by AWS-managed warm pools.

*Example: consider an Aurora Serverless v2 DB instance that has 32 GiB of memory. In this case, you can specify a minimum ACU setting of 16 (since each ACU corresponds to approximately 2 GiB of memory).*


## Storage Scaling

While ACUs handle memory and CPU, the database storage automatically scales from 10 GiB to **64 TiB**.
