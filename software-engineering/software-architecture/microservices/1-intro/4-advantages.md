# Advantages of Microservices

## Technology Heterogeneity

Multiple microservices allow us to use different technologies for each service, enabling us to choose the right tool for the job.

Different parts of the system can use different technology stacks to improve performance or handle data storage in a more suitable way.

Microservices enable faster adoption of new technologies.

Upgrading technologies can be easier as the implementation details are hidden from consumers.

![](images/tech-hetero.png)


## Robustness

By isolating failures within service boundaries, the rest of the system can continue functioning.

In a monolithic service, a failure halts the entire system, whereas microservices allow for handling the failure of individual services and degrading functionality accordingly.

However, distributed systems introduce new sources of failure, such as network and machine failures, which need to be understood and handled properly. Failure to address these concerns seriously can result in a less robust system after migrating to microservices.


## Scaling

With a large monolithic service, scaling requires scaling everything together.

Smaller services in a microservices architecture allow for scaling only the services that need it, enabling other parts of the system to run on smaller hardware.

Microservices, combined with on-demand provisioning systems like AWS, enable cost-effective scaling based on demand.


## Ease of Deployment

Making a change to a monolithic application requires deploying the entire application, which can be high-risk and infrequent due to fear of impacting the whole system.

Changes in a microservices architecture can be made to a single service and deployed independently, allowing for quicker deployment of code.

Any problems that occur can be isolated to an individual service, making rollback easier and faster.

Microservices enable organizations like Amazon and Netflix to quickly release new functionality and remove impediments to software deployment.


## Organizational Alignment

Large teams and large codebases can lead to problems, especially when the team is distributed. Smaller teams working on smaller codebases tend to be more productive.

Microservices align architecture with organization by minimizing the number of people working on a specific codebase, optimizing team size and productivity.

Ownership of services can be changed as the organization evolves, maintaining alignment between architecture and organization in the future.


## Composability

Distributed systems and service-oriented architectures enable reuse of functionality.

Microservices allow functionality to be consumed in different ways for different purposes, catering to the needs of different consumers.

Microservices open up seams in the system that can be addressed by external parties, providing flexibility in building applications.

Monolithic applications often have only one coarse-grained seam that can be used from the outside, making it difficult to break them up for more fine-grained functionality.
