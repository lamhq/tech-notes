# What Makes a Good Microservice Boundary?

## Information Hiding

Information hiding is a concept developed by David Parnas to define module boundaries effectively.

The benefits of information hiding include:
- **Improved development time**: By allowing modules to be developed independently, we can allow for more work to be done in parallel and reduce the impact of adding more developers to a project.
- **Comprehensibility**: Each module can be looked at in isolation and understood in isolation.
- **Flexibility**: Modules can be changed independently from one another, allowing for changes to be made to the functionality of the system without requiring other modules to change.

Microservices can be seen as another form of modular architecture that aligns with the desirable characteristics of information hiding.

The connections between modules (or microservices) are the assumptions they make about each other. By reducing the number of assumptions, we can minimize the impact of changes in one module on others.

> By keeping the number of assumptions small, it is easier to ensure that we can change one module without impacting others. If a developer changing a module has a clear understanding as to how the module is used by others, it will be easier for the developer to make changes safely in such a way that upstream callers won’t also have to change.


## Cohesion

Cohesion refers to the idea that "the code that changes together, stays together."

In the context of microservice architecture, we optimize for ease of making changes in business functionality. We want related behavior to be grouped together and unrelated behavior to be separated.

Grouping related behavior allows us to make changes in one place and release that change quickly. Making changes in multiple places increases the risk and time required for deployment.

To avoid these issues, we need to find boundaries within our problem domain that ensure related behavior is in one place and communicate loosely with other boundaries.

Weak cohesion occurs when related functionality is spread across the system, while strong cohesion is the goal in microservice architectures.


## Coupling

Loosely coupled services allow for changes to one service without requiring changes to other services.

The purpose of microservices is to enable independent changes and deployments.

Tight coupling occurs when a change in one service necessitates a change in another service.

A loosely coupled service should only know what it needs to know about the services it collaborates with.

It is advisable to limit the number of different types of calls between services to avoid chatty communication, which can lead to tight coupling and potential performance problems.


## The Interplay of Coupling and Cohesion

Coupling and cohesion are related concepts that affect the stability of a system.

**A structure is stable when there is strong cohesion and low coupling.**

Microservice boundaries need a certain degree of stability to enable independent deployability and reduce coordination between teams.

If the contract exposed by a microservice constantly changes in a backward-incompatible way, it will require constant changes for upstream consumers.

Cohesion relates to the relationship between things within a boundary (microservice), while coupling describes the relationship across boundaries.

The organization of code cannot have an absolute best way, but coupling and cohesion help articulate trade-offs in grouping code.

Finding the right balance between coupling and cohesion depends on the context and problems faced.
