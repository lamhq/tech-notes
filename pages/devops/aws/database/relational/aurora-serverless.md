# Aurora Serverless

## Overview

An on-demand, auto-scaling configuration for the MySQL-compatible and PostgreSQL-compatible editions of Amazon Aurora.

An Aurora Serverless DB cluster automatically starts up, shuts down, and scales capacity up or down based on your application's needs.

Your're charged only for:
- the time your database is running and handling requests, per-second billing
- the amount of storage space used

It's the same data resiliency as Aurora provisioned: 6 copies of data across three AZs.

You can achieve high availability by Multi-AZ deployments.

You can easily switch between standard and serverless configurations.

Use Aurora Serverless if you want a simple, cost-effective option for infrequent, intermittent, or unpredictable workloads.


## Concepts

### Aurora Capacity Units (ACUs)

ACUs are measurements on how your clusters scale.

Each ACUs coresponds to approximately 2 GiB of memory, assiciated CPU, and networking capability.

You set a minimum and maximum of ACUs for scaling requirements (zero to shutdown).

Aurora Serverless v2 allows you to scale your capacity from 0.5 ACU to a maximum of 128 ACUs, with increments of 0.5 ACU units.

ACUs are allocated quickly by AWS-managed warm pools.

*Example: consider an Aurora Serverless v2 DB instance that has 32 GiB of memory. In this case, you can specify a minimum ACU setting of 16 (since each ACU corresponds to approximately 2 GiB of memory).*

### Storage Scaling

While ACUs handle memory and CPU, the database storage automatically scales from 10 GiB to **64 TiB**.


## Usecases

- **Variable workloads**: unpredictable or sudden activity.
- **Multi-tenant apps**: Let the service manage database capacity for each individual app.
- **New Apps**: Unsure what database instance needs are required.
- **Dev and Test**: Development or testing of new features.
- **Mixed-Use Apps**: App might serve more than one purpose with different traffic spikes.
- **Capacity Planning**: Easily swap from provisioned to serverless or vice versa.