# Should I Use Microservices?

## Whom They Might Not Work For

Microservice architectures are often a bad choice for brand-new products or startups.

> Domain models in new products or startups undergo significant changes, resulting in more changes to service boundaries. Coordinating changes across service boundaries is expensive.

It is more appropriate to wait until enough of the domain model has stabilized before defining service boundaries.

Startups typically have fewer people available to build the system, creating challenges with respect to microservices. Microservices bring new work and complexity, which can tie up valuable bandwidth for smaller teams.

The deployment and management of microservices themselves require additional time and effort.

It is easier to move to microservices later after understanding the constraints and pain points in the architecture.


## Where They Work Well

Organizations adopt microservices to allow more developers to work independently and reduce delivery contention.

Microservice architecture is not suitable for a small startup, but it can accommodate rapid growth in a larger scale-up.

**Software as a Service (SaaS) applications** benefit from microservice architecture due to independent releasability and scalability.

Microservices can be easily deployed and matched with specific cloud services, maximizing the benefits of cloud platforms.

The technology-agnostic nature of microservices allows for experimentation with new technologies and identification of potential benefits.

Microservice architecture provides flexibility for future system evolution, at the cost of additional complexity.