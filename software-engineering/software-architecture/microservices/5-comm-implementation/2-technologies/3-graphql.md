# GraphQL

GraphQL enables client-side devices to define queries that can retrieve the required information without the need for multiple requests. This feature of GraphQL can significantly improve the performance of constrained client-side devices.

To use GraphQL, a microservice needs to expose a GraphQL endpoint to the client device. The GraphQL endpoint serves as the entry point for all client queries and exposes a schema for client devices to utilize. The schema exposes the types available to the client and often includes a graphical query builder to simplify query creation.

GraphQL reduces the number of calls and the amount of data retrieved by the client device, which can address challenges when building user interfaces with microservice architectures.


## Challenges

### Query

GraphQL allows client devices to issue dynamically changing queries, which can lead to server-side load issues. GraphQL queries with high complexity can cause significant load on the server side.

SQL offers query planners for databases to help diagnose problematic queries, while GraphQL may lack such tools, making it harder to track down issues.

Server-side throttling of GraphQL requests is a potential solution, but it can be complex to implement, especially when the execution of a call spans multiple microservices.


### Caching

Caching in GraphQL is more complex compared to normal REST-based HTTP APIs.

In REST-based APIs, response headers can be set to enable client-side devices and intermediate caches like CDNs to cache responses. This isn't as straightforward with GraphQL.

The common advice for caching in GraphQL involves associating an ID with each returned resource and having the client device cache the request against that ID.

This limitation might lead to a hybrid solution for client devices, with some requests using normal REST-based HTTP APIs, while others use GraphQL.


## Where to use it

GraphQL is well-suited for use at the perimeter of a system, where it exposes functionality to external clients, especially GUIs and mobile devices with data presentation constraints and limited network capabilities.

GraphQL serves as a call aggregation and filtering mechanism, making it useful in a microservice architecture for aggregating calls across multiple downstream microservices.

GraphQL doesn't replace general microservice-to-microservice communication; it complements it by providing a specific solution for client interactions.

An alternative to the use of GraphQL would be to consider an alternative pattern like the backend for frontend (BFF) pattern.
