# Monolithic Architecture

## Context
You are developing a server-side enterprise application. It must support a variety of different clients including desktop browsers, mobile browsers and native mobile applications. The application might also expose an API for 3rd parties to consume. It might also integrate with other applications via either web services or a message broker. The application handles requests (HTTP requests and messages) by executing business logic; accessing a database; exchanging messages with other systems; and returning a HTML/JSON/XML response. There are logical components corresponding to different functional areas of the application.

## Problem

What's the application's deployment architecture?

## Forces

- There is a team of developers working on the application
- New team members must quickly become productive
- The application must be easy to understand and modify
- You want to practice continuous deployment of the application
- You must run multiple instances of the application on multiple machines in order to satisfy scalability and availability requirements
- You want to take advantage of emerging technologies (frameworks, programming languages, etc)

## Solution

Build an application with a monolithic architecture. For example:

- a single Java WAR file.
- a single directory hierarchy of Rails or NodeJS code

## Example

Let’s imagine that you are building an e-commerce application that takes orders from customers, verifies inventory and available credit, and ships them. The application consists of several components including the StoreFrontUI, which implements the user interface, along with some backend services for checking credit, maintaining inventory and shipping orders.

The application is deployed as a single monolithic application. For example, a Java web application consists of a single WAR file that runs on a web container such as Tomcat. A Rails application consists of a single directory hierarchy deployed using either, for example, Phusion Passenger on Apache/Nginx or JRuby on Tomcat. You can run multiple instances of the application behind a load balancer in order to scale and improve availability.

![](https://microservices.io/i/DecomposingApplications.011.jpg)

## Resulting context

### Advantages

This solution has a number of benefits:

- **Simplicity of development**. The monolithic approach is a standard way of building applications. No additional knowledge is required. All source code is located in one place which can be quickly understood.
- **Simplicity of debugging**. The debugging process is simple because all code is located in one place. You can easily follow the flow of a request and find an issue.
- **Simplicity of testing**. You test only one service without any dependencies. Everything is usually clear.
- **Simplicity of deployment**. Only one deployment unit (e.g. jar file) should be deployed. There are no dependencies. In cases when UI is packaged with backend code you do not have any breaking changes. Everything exists and changes in one place.
- **Simplicity of application evolution**. Basically, the application does not have any limitation from a business logic perspective. If you need some data for new feature, it is already there.
- **Cross-cutting concerns and customizations are used only once**. You should take care of cross-cutting concerns only once. For instance, security, logging, exception handling, monitoring, choosing and setting up tomcat parameters, setup of data source connection pool, etc.
- **Simplicity in onboarding new team members**. The source code is located in one place. New team members can easily debug some functional flow and to get familiar with the application.
- **Low cost in the early stages of the application**. All source code is located in one place, packaged in a single deployment unit, and deployed. What can be easier? There is no overhead neither in infrastructure cost nor development cost.

Because of these advantages, monolithic architecture is usually used in the early stages of application development. The reasons for that are the next ones:

- **The main function of the application is to be profitable**. As a result, it is important to quickly implement some POC (Proof of Concept) solutions to verify the application in the real world. Also, it is important to bring customers to the system. Improvements can be implemented in the future.
- **The requirements are usually unclear at the early stages of development**. It is hard to create meaningful architecture when the requirements are unclear. Real customers can define the business needs after some of the functionality already works.


### Disadvantages

The problems with Monolithic Architecture start to appear when the application becomes successful. The reason for this is very simple: the growth of the application. Usually, after some period of time, the Monolithic Application changes into another.

- **Slow speed of development**. The simplest disadvantage relates to CI/CD pipeline. Imagine the monolith that contains a lot of services. Each service in this monolith is covered with tests that are executed for each Pull Request. Even for a small change in a source code, you should wait a lot of time (e.g. 1 hour) for your pipeline to succeed. And what happens when the pipeline fails for some reason? You wait again. All services are located in a single place. The size of the team is big. What happens when your colleague merges their changes? You rebase/merge and wait again.
- **High code coupling**. Of course, you can keep a clear service structure inside your repository. However, as practice shows, eventually, you will end up with a spaghetti code in at least a few places. As a result, the system becomes harder to understand especially for new team members.
- **Testing becomes harder**. Even a small change can negatively affect the system. As a result, the regression for full monolithic service is required.
- **Performance issues**. Potentially, you can scale the whole monolithic service in cases of performance issues. But what to do with the database? The single database is used for all services. You can start to optimize your database queries or use read replicas. However, there is a limit to this type of optimization.
- **Legacy technologies**. Imagine that you have the application written on Java 8. How much time is it required to migrate the whole monolith with multiple services underneath to Java 11? What to do with the tasks that are required to bring new functionality? It can be the case that the application will never be migrated.
- **Lack of flexibility**. Using Monolithic Architecture you are tight to the technologies that are used inside your monolith. You cannot use other tools even if they are better for the problem at hand.
- **Problems with deployment**. Even a small change requires the redeployment of the whole monolith.
- **Complexity**. The large monolithic code base intimidates developers, especially ones who are new to the team. The application can be difficult to understand and modify. As a result, development typically slows down. Also, because there are not hard module boundaries, modularity breaks down over time. Moreover, because it can be difficult to understand how to correctly implement a change the quality of the code declines over time. It’s a downwards spiral.
- **Overloaded IDE**. The larger the code base the slower the IDE and the less productive developers are.
- **Overloaded web container**. The larger the application the longer it takes to start up. This had have a huge impact on developer productivity because of time wasted waiting for the container to start. It also impacts deployment too.
- **Obstacle to scaling development**. A monolithic application is also an obstacle to scaling development. Once the application gets to a certain size its useful to divide up the engineering organization into teams that focus on specific functional areas. For example, we might want to have the UI team, accounting team, inventory team, etc. The trouble with a monolithic application is that it prevents the teams from working independently. The teams must coordinate their development efforts and redeployments. It is much more difficult for a team to make a change and update production.
