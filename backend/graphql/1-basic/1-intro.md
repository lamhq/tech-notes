# Introduction to GraphQL

## Introduction

- GraphQL is a query language for your API
- GraphQL isn't tied to any specific database or storage engine
- A GraphQL service is created by defining types and fields on those types, then providing functions for (processing) each field on each type
- After a GraphQL service is running, it can receive GraphQL queries to validate and execute.
- The service first checks a query to ensure it only refers to the types and fields defined, and then runs the provided functions to produce a result.

A GraphQL service that tells you who the logged in user is (me) as well as that user's name might look like this:

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


## Resources

- [Code and libraries](https://graphql.org/code/)
- [Tutorials](https://www.howtographql.com/)
- [Course: Exploring GraphQL: A Query Language for APIs](https://www.edx.org/learn/graphql/the-linux-foundation-exploring-graphql-a-query-language-for-apis)