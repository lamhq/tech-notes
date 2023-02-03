# Microservice Architecture

## Context

- You are developing a server-side enterprise application. 
- It must support a variety of different clients including desktop browsers, mobile browsers and native mobile applications. 
- The application might also expose an API for 3rd parties to consume. 
- It might also integrate with other applications via either web services or a message broker. 
- The application handles requests (HTTP requests and messages) by executing business logic; accessing a database; exchanging messages with other systems; and returning a HTML/JSON/XML response.
- There are logical components corresponding to different functional areas of the application.


## Problem

What’s the application’s deployment architecture?


## Forces

- There is a team of developers working on the application
- New team members must quickly become productive
- The application must be easy to understand and modify
- You want to practice continuous deployment of the application
- You must run multiple instances of the application on multiple machines in order to satisfy scalability and availability requirements
- You want to take advantage of emerging technologies (frameworks, programming languages, etc)


## Solution

Define an architecture that structures the application as a set of loosely coupled, collaborating services. Each service is:

- Highly maintainable and testable - enables rapid and frequent development and deployment
- Loosely coupled with other services - enables a team to work independently the majority of time on their service(s) without being impacted by changes to other services and without affecting other services
- Independently deployable - enables a team to deploy their service without having to coordinate with other teams
- Capable of being developed by a small team - essential for high productivity by avoiding the high communication head of large teams


## Examples

### Fictitious e-commerce application

Let’s imagine that you are building an e-commerce application that takes orders from customers, verifies inventory and available credit, and ships them. 

The application consists of several components including the StoreFrontUI, which implements the user interface, along with some backend services for checking credit, maintaining inventory and shipping orders. 

The application consists of a set of services.

![](https://microservices.io/i/Microservice_Architecture.png)


### Example applications

http://eventuate.io/exampleapps.html


## Resulting context

### Benefits

- Enables the continuous delivery and deployment of large, complex applications.
  - Improved maintainability - each service is relatively small and so is easier to understand and change
  - Better testability - services are smaller and faster to test
  - Better deployability - services can be deployed independently
  - It enables you to organize the development effort around multiple, autonomous teams. Each team owns and is responsible for one or more services. Each team can develop, test, deploy and scale their services independently of all of the other teams.
- Each microservice is relatively small:
  - Easier for a developer to understand
  - The IDE is faster making developers more productive
  - The application starts faster, which makes developers more productive, and speeds up deployments.
- Improved fault isolation. For example, if there is a memory leak in one service then only that service will be affected. The other services will continue to handle requests. In comparison, one misbehaving component of a monolithic architecture can bring down the entire system.
- Eliminates any long-term commitment to a technology stack. When developing a new service you can pick a new technology stack. Similarly, when making major changes to an existing service you can rewrite it using a new technology stack.

### Drawbacks

- Developers must deal with the additional complexity of creating a distributed system:
  - Developers must implement the inter-service communication mechanism and deal with partial failure
  - Implementing requests that span multiple services is more difficult
  - Testing the interactions between services is more difficult
  - Implementing requests that span multiple services requires careful coordination between the teams
  - Developer tools/IDEs are oriented on building monolithic applications and don’t provide explicit support for developing distributed applications.
- Deployment complexity. In production, there is also the operational complexity of deploying and managing a system comprised of many different services.
- Increased memory consumption. The microservice architecture replaces N monolithic application instances with NxM services instances. If each service runs in its own JVM (or equivalent), which is usually necessary to isolate the instances, then there is the overhead of M times as many JVM runtimes. Moreover, if each service runs on its own VM (e.g. EC2 instance), as is the case at Netflix, the overhead is even higher.


## When to use the microservice architecture?

When developing the first version of an application, you often do not have the problems that this approach solves. Moreover, using an elaborate, distributed architecture will slow down development. This can be a major problem for startups whose biggest challenge is often how to rapidly evolve the business model and accompanying application


## How to decompose the application into services?

This is very much an art, but there are a number of strategies that can help:

- [Decompose by business capability](https://microservices.io/patterns/decomposition/decompose-by-business-capability.html) and define services corresponding to business capabilities.
- [Decompose by domain-driven design subdomain](https://microservices.io/patterns/decomposition/decompose-by-subdomain.html).
- Decompose by verb or use case and define services that are responsible for particular actions. e.g. a `Shipping Service` that’s responsible for shipping complete orders.
- Decompose by by nouns or resources by defining a service that is responsible for all operations on entities/resources of a given type. e.g. an `Account Service` that is responsible for managing user accounts.


## How to maintain data consistency?

In order to ensure loose coupling, each service has its own database. Maintaining data consistency between services is a challenge because 2 phase-commit/distributed transactions is not an option for many applications. 

An application must instead use the [Saga pattern](https://microservices.io/patterns/data/saga.html). A service publishes an event when its data changes. Other services consume that event and update their data. 

There are several ways of reliably updating data and publishing events including [Event Sourcing](https://microservices.io/patterns/data/event-sourcing.html) and [Transaction Log Tailing](https://microservices.io/patterns/data/transaction-log-tailing.html).


## How to implement queries?

Another challenge is implementing queries that need to retrieve data owned by multiple services.

The [API Composition](https://microservices.io/patterns/data/api-composition.html) and [Command Query Responsibility Segregation (CQRS)](https://microservices.io/patterns/data/cqrs.html) patterns.


## Known uses

Most large scale web sites including [Netflix](https://netflixtechblog.com/), [Amazon](http://highscalability.com/blog/2007/9/18/amazon-architecture.html) and eBay have evolved from a monolithic architecture to a microservice architecture.