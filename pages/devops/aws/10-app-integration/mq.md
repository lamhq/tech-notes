# Amazon MQ

## Overview

Amazon MQ is a **message broker service** allowing easier migration of existing brokering applications to the AWS Cloud.

It leverages multiple programming languages, operating systems, and messaging protocols.

Currently supports both Apache ActiveMQ or RabbitMQ engine types.

Allows easily leverage existing apps without managing and maintaining your own system


## Amazon MQ vs SNS, SQS

All services offer topics and queues. Allow one-to-one or one-to-many messaging designs.

**MQ is for migrating existing applications** with messaging systems in place. **SNS and SQS are for new applications**.

MQ restrict access to private networking. Must have VPC connectivity (e.g., Direct Connect, or Site-to-site VPN). SNS and SQS are publicly accessible by default.


## Amazon MQ Brokers

Amazon MQ offers highly available architectures to minimize downtime during maintenance.

Architecture depends on the broker engine type.

### Amazon MQ for ActiveMQ

With active/standby deployments, one instance will remain available at all times.

Configure network of brokers with separate maintenance windows.

### Amazon MQ for RabbitMQ

Cluster deployments are logical groupings of three broker nodes across multiple AZs sitting behind a Network Load Balancer.
