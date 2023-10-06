# Advantages of Microservices

## Technology Heterogeneity

1. Multiple microservices allow us to use different technologies for each service, enabling us to choose the right tool for the job.
2. Different parts of the system can use different technology stacks to improve performance or handle data storage in a more suitable way.
3. Microservices enable faster adoption of new technologies and understanding how they can benefit us.
6. Upgrading technologies can be easier as the implementation details are hidden from consumers.

![](images/tech-hetero.png)


## Robustness

1. The concept of bulkheads is crucial for improving the robustness of an application.
2. By isolating failures within service boundaries, the rest of the system can continue functioning.
3. In a monolithic service, a failure halts the entire system, whereas microservices allow for handling the failure of individual services and degrading functionality accordingly.
4. However, distributed systems introduce new sources of failure, such as network and machine failures, which need to be understood and handled properly. Failure to address these concerns seriously can result in a less robust system after migrating to microservices.


## Scaling

1. With a large monolithic service, scaling requires scaling everything together.
2. Smaller services in a microservices architecture allow for scaling only the services that need it, enabling other parts of the system to run on smaller hardware.
4. Microservices, combined with on-demand provisioning systems like AWS, enable cost-effective scaling based on demand.


## Ease of Deployment

1. Making a change to a million-line monolithic application requires deploying the entire application, which can be high-risk and infrequent due to fear of impacting the whole system.
2. Changes in a microservices architecture can be made to a single service and deployed independently, allowing for quicker deployment of code.
3. Any problems that occur can be isolated to an individual service, making rollback easier and faster.
4. Microservices enable organizations like Amazon and Netflix to quickly release new functionality and remove impediments to software deployment.


## Organizational Alignment

1. Large teams and large codebases can lead to problems, especially when the team is distributed.
2. Smaller teams working on smaller codebases tend to be more productive.
3. Microservices align architecture with organization by minimizing the number of people working on a specific codebase, optimizing team size and productivity.
4. Ownership of services can be changed as the organization evolves, maintaining alignment between architecture and organization in the future.


## Composability

1. Distributed systems and service-oriented architectures enable reuse of functionality.
2. Microservices allow functionality to be consumed in different ways for different purposes, catering to the needs of different consumers.
5. Microservices open up seams in the system that can be addressed by external parties, providing flexibility in building applications.
6. Monolithic applications often have only one coarse-grained seam that can be used from the outside, making it difficult to break them up for more fine-grained functionality.
