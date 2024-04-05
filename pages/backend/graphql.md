# GraphQL

## Introduction

GraphQL is a query language for your API.

It defines how API server and client exchange data.

GraphQL isn't tied to any specific database or storage engine.

A GraphQL service is created by defining types and fields on those types, then providing functions for (processing) each field on each type

After a GraphQL service is running, it can receive GraphQL queries to validate and execute. The service first checks a query to ensure it only refers to the types and fields defined, and then runs the provided functions to produce a result.

For example, a GraphQL service that tells you who the logged in user is as well as that user's name might look like this:

```gql
type Query {
  me: User
}

type User {
  id: ID
  name: String
}
```

Functions for each field on each type:

```js
function Query_me(request) {
  return request.auth.user
}

function User_name(user) {
  return user.getName()
}
```

An example query:

```gql
{
  me {
    name
  }
}
```

Could produce the following JSON result:

```json
{
  "me": {
    "name": "Luke Skywalker"
  }
}
```


## Why use GraphQL

1. **Strongly Typed Schema**: GraphQL APIs have a **clearly defined schema** that specifies the supported operations (queries, mutations, and subscriptions), input arguments, and possible responses.

2. **Dynamic Queries**: GraphQL allows clients to construct **dynamic queries** based on their specific needs. Clients can request only the fields they require, avoiding unnecessary data retrieval and improving performance.

3. **Less Time Spent Documenting**: The schema-driven approach means developers no longer need to manually write extensive API documentation. Documentation can be **auto-generated** from the schema, streamlining the development process.

4. **Legacy App Support**: GraphQL can be incrementally adopted in existing systems, making it suitable for **legacy applications**. Developers can gradually replace REST endpoints with GraphQL while maintaining compatibility.

5. **Single Endpoint**: Unlike REST APIs with multiple endpoints for different resources, GraphQL uses a **single endpoint** for all queries and mutations. This simplifies API management and reduces network overhead.

6. **Real-time Data with Subscriptions**: GraphQL supports **real-time data updates** through subscriptions. Clients can subscribe to specific events and receive live updates when relevant data changes on the server.

7. **Versionless APIs**: GraphQL APIs are inherently **versionless**. Developers can add new fields or types without breaking existing clients. This flexibility ensures smooth evolution of APIs over time.

8. **Batched Queries**: GraphQL allows clients to send **batched queries** in a single request. This minimizes round trips to the server, enhancing efficiency in data retrieval.

9. **Introspection and Tooling**: GraphQL's built-in **introspection** feature enables powerful developer tools. Tools like GraphiQL and Apollo Studio allow exploration, testing, and debugging of APIs.


## References

- [Tutorials](https://www.howtographql.com/)
- [Code and libraries](https://graphql.org/code/)
- [Course: Exploring GraphQL: A Query Language for APIs](https://www.edx.org/learn/graphql/the-linux-foundation-exploring-graphql-a-query-language-for-apis)