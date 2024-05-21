# Amazon MSK (Apache Kafka compatible service)

## Overview

Amazon MSK is managed service for running data streaming applications that leverage **Apache Kafka** to process streaming data.

The service handles control plane operations for you (creation, updating, and deletion of cluster).

You manage data plane operations for producing and consuming streaming data.

You can push broker logs to CloudWatch, S3, or Kinesis Data Firehose.

The API calls for this services are logged to CloudTrail.

It's very good for existing applications, tools, plugins
that need to leverage the open-source versions
of Apache Kafka.


## Components

**Broker Nodes**: Specify the amount of broker nodes per AZ you want at time of cluster creation.

**ZooKeeper Nodes**: ZooKeeper nodes are created for you.

**Producers, Consumers, Topics**: Kafka data-plane operations allow creation of topics and ability to produce/consume data.


## Resiliency

It allows for **automatic recovery**, automatic detection
and recovery from common failure scenarios. Minimal impact.

It can **detect broker failures**. It'll work on mitigation or replacement of unhealthy nodes.

It tries to reuse storage from older brokers during failures to **reduce data** needing replication.

Has very **low impact time**. The impact time is really limited
to however long it takes Amazon MSK
to complete detection and recovery (automated).

After successful recovery, producers and consumer apps continue to communicate with the same broker IP as before.


## Features

**MSK Serverless** is a cluster type within Amazon MSK, offers serverless cluster management. Automatically provisioning and scaling. MSK Serverless is fully compatible with Apache Kafka. Use the same client apps for producing and consuming data.

**MSK Connect** allows developers to easily stream data to and from Apache Kafka clusters.


## Security & logging

- Integration with Amazon KMS for SSE requirements
- Encryption at rest by default
- TLS 1.2 for encryption in transit between brokers in clusters
- Deliver broker logs to Amazon CloudWatch, Amazon S3, and Amazon Kinesis Data Firehose
- Metrics are gathered and sent to CloudWatch
- All Amazon MSK API calls are logged to AWS CloudTrail