# Amazon Managed Grafana

## Overview

**Grafana** is a widely deployed data visualization tool that has extensive data plugin support.

**Amazon Managed Grafana** make it easy to deploy, operate, and scale Grafana within your AWS accounts.

It's a fully managed service for data visualization. Allow instant querying, correlating, visualizing of metrics, logs and traces.

It provides built-in **security** features help you meet corporate governance and compliance requirements.

Integrate with several **data sources** including Amazon CloudWatch, Amazon Managed Service for Prometheus, Amazon OpenSearch Service, and Amazon Timestream.

**Pricing** is based per active user in a workspace.

You can leverage VPC endpoints for secure VPC access.


## How it works

With this service, you create **workspaces**. They are logically isolated Grafana servers.

Within workspaces, you create dashboards, visualizations for your metrics, logs.

AWS handles scaling, setup, and mainternance of all workspaces.


## Use cases

- **Container Metric Visualizations**: Connect to data sources like Prometheus for visualizing EKS, ECS, or your own Kubernetes cluster metrics.
- **Internet of Things (IoT)**: Vast data plugins make the service a perfect fit for monitoring loT and edge device data.
- **Troubleshooting**: Centralizing dashboards allows for more efficient operational issue troubleshooting.
