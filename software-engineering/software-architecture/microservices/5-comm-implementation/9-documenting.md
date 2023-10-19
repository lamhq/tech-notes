# Documenting Services

Decomposing systems into finer-grained microservices creates numerous APIs. It's crucial to understand what these APIs do and how to use them effectively. Documentation is one of the key solutions for addressing this need.

## Explicit Schemas

Explicit schemas are valuable in helping understand the structure of endpoints in an API. However, they may not provide a complete picture of the behavior of an endpoint, necessitating the need for additional documentation.

Without an explicit schema, documentation has to do more work by explaining both the endpoint's functionality and its interface structure. Keeping such documentation up to date can be challenging.

OpenAPI is mentioned as an effective schema format that also serves as documentation. Various open source and commercial tools support OpenAPI descriptors, making it easier to create developer portals for reading API documentation.

For those using Kubernetes, Ambassador's Developer Portal is highlighted as an interesting tool. It can automatically discover available OpenAPI endpoints, making documentation readily accessible when deploying new microservices.

Documenting event-based interfaces has historically been a challenge, but there are now options available. Two formats, AsyncAPI and CloudEvents, are mentioned.

CloudEvents is particularly appealing due to its association with the Cloud Native Computing Foundation (CNCF) and its extensive integration and support. However, it may have been historically more restrictive in terms of event format support, with recent reintroduction of protocol buffer support as a consideration.


## The Self-Describing System

Gaining a comprehensive understanding of a system, especially at scale, is crucial. Several techniques and tools can help with this:

- Tracking the health of downstream services and using correlation IDs to visualize call chains.
- Utilizing service discovery systems like Consul to identify the locations of microservices.
- Employing schema formats like OpenAPI and event formats like CloudEvents to understand the capabilities of endpoints.
- Monitoring system health and individual service health.

All the information mentioned is accessible programmatically. Making such information readily available is a valuable tool for managing the complexity that arises when running systems at scale. 

### Biz Ops

The Financial Times developed a tool called Biz Ops to address the challenge of managing a large number of microservices and other IT infrastructure services. Biz Ops serves as a centralized platform for gathering and providing information about microservices and other IT assets. It is built on top of a graph database, offering flexibility in data collection and information modeling.

What sets Biz Ops apart from similar tools is its System Operability Score. This score is calculated to evaluate whether services and their teams are taking necessary steps to ensure smooth operation. This can include checking if the registry information is accurate and ensuring services have proper health checks. The System Operability Score provides teams with a quick overview of areas that may need attention.

### Backstage

In the open source realm, Spotify's Backstage tool offers a way to build a service catalog similar to Biz Ops. It employs a plug-in model to enable advanced functionality, such as triggering the creation of new microservices or integrating live data from a Kubernetes cluster.


### Ambassador's Service Catalog

Ambassador's Service Catalog focuses more narrowly on providing visibility into services within Kubernetes, which may limit its broad applicability compared to tools like Biz Ops. Nevertheless, these innovative approaches to managing microservices and related infrastructure are valuable additions to the field.