# What Makes a Good Microservice Boundary?

## Information Hiding

1. Information hiding is a concept developed by David Parnas to define module boundaries effectively.
2. The benefits of information hiding include:
  - **Improved development time**: By allowing modules to be developed independently, we can allow for more work to be done in parallel and reduce the impact of adding more developers to a project.
  - **Comprehensibility**: Each module can be looked at in isolation and understood in isolation.
  - **Flexibility**: Modules can be changed independently from one another, allowing for changes to be made to the functionality of the system without requiring other modules to change.
3. Microservices can be seen as a form of modular architecture that aligns with the desirable characteristics of information hiding.
4. The connections between modules (or microservices) are the assumptions they make about each other.
5. By reducing the number of assumptions, we can minimize the impact of changes in one module on others.


## Cohesion

1. Cohesion refers to the idea that "the code that changes together, stays together."
2. In the context of microservice architecture, we optimize for ease of making changes in business functionality.
3. We want related behavior to be grouped together and unrelated behavior to be separated.
4. Grouping related behavior allows us to make changes in one place and release that change quickly.
5. Making changes in multiple places increases the risk and time required for deployment.
6. To avoid these issues, we need to find boundaries within our problem domain that ensure related behavior is in one place and communicate loosely with other boundaries.
7. Weak cohesion occurs when related functionality is spread across the system, while strong cohesion is the goal in microservice architectures.

## Coupling

1. Loosely coupled services allow for changes to one service without requiring changes to other services.
2. The purpose of microservices is to enable independent changes and deployments.
3. Tight coupling occurs when a change in one service necessitates a change in another service.
5. A loosely coupled service should only know what it needs to know about the services it collaborates with.
6. It is advisable to limit the number of different types of calls between services to avoid chatty communication, which can lead to tight coupling and potential performance problems.


## The Interplay of Coupling and Cohesion

1. Coupling and cohesion are related concepts that affect the stability of a system.
2. *A structure is stable when there is strong cohesion and low coupling.*
3. Microservice boundaries need a certain degree of stability to enable independent deployability and reduce coordination between teams.
4. If the contract exposed by a microservice constantly changes in a backward-incompatible way, it will require constant changes for upstream consumers.
5. Cohesion relates to the relationship between things within a boundary (microservice), while coupling describes the relationship across boundaries.
6. The organization of code cannot have an absolute best way, but coupling and cohesion help articulate trade-offs in grouping code.
7. Finding the right balance between coupling and cohesion depends on the context and problems faced.
8. System requirements may change over time, requiring a reevaluation of decisions made.
9. In some cases, stability may become impossible due to excessive changes in parts of the system.
