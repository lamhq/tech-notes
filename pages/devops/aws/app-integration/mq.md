# Amazon MQ

## Overview

Amazon MQ is a managed **message broker service** for **ActiveMQ**.

MQ supports industry-standard APIs and protocols so you can migrate messaging and applications without rewriting code.

Supports Apache ActiveMQ, RabbitMQ engine types, JMS, NMS, MQTT, and WebSockets.

You pay for broker instance and storage usage as you go.

MQ stores your messages redundantly across multiple AZs.

In the event of a failure of broker or AZ, MQ automatically fails over to the standby broker.

MQ provides encryption of your messages at rest and in transit. 

Access can be restricted to a private endpoint within your VPC, allows you to isolate your broker in your own virtual network.


## Amazon MQ vs SNS, SQS

All services offer topics and queues. Allow one-to-one or one-to-many messaging designs.

Application:
- MQ is for migrating existing applications
- SNS and SQS are for new applications.

Networking:
- MQ restrict access to private networking. Must have VPC connectivity (e.g., Direct Connect, or Site-to-site VPN).
- SNS and SQS are publicly accessible by default.


## Amazon MQ Brokers

Amazon MQ offers highly available architectures to minimize downtime during maintenance.

Architecture depends on the broker engine type.

### Amazon MQ for ActiveMQ

With active/standby deployments, one instance will remain available at all times.

Configure network of brokers with separate maintenance windows.

### Amazon MQ for RabbitMQ

Cluster deployments are logical groupings of three broker nodes across multiple AZs sitting behind a Network Load Balancer.
