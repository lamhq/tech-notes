# Global Object Identification

To provide options for GraphQL clients to elegantly handle caching and data refetching, GraphQL servers need to expose object identifiers in a standardized way.

For this to work, a client will need to query via a standard mechanism to request an object by ID. Then, in the response, the schema will need to provide a standard way of providing these IDs.


## Reserved Types

A GraphQL server that follows object identification specification must reserve certain types and type names:

- An interface named `Node`.
- The `node` field on the root query type.


## `Node` Interface

The server must provide an interface called `Node`. That interface must include exactly one field, called `id` that returns a non-null `ID`.

```graphql
# An object with a Globally Unique ID
interface Node {
  # The ID of the object.
  id: ID!
}
```

A server that correctly implements the above interface will accept the following introspection query, and return the provided response:

```graphql
{
  __type(name: "Node") {
    name
    kind
    fields {
      name
      type {
        kind
        ofType {
          name
          kind
        }
      }
    }
  }
}
```

Expected response:

```json
{
  "__type": {
    "name": "Node",
    "kind": "INTERFACE",
    "fields": [
      {
        "name": "id",
        "type": {
          "kind": "NON_NULL",
          "ofType": {
            "name": "ID",
            "kind": "SCALAR"
          }
        }
      }
    ]
  }
}
```

## `node` root field

The server must provide a root field called `node` that returns the `Node` interface. This root field must take exactly one argument, a non-null ID named `id`.

A server that correctly implements the above requirement will accept the following introspection query, and return a response that contains the provided response.

```graphql
{
  __schema {
    queryType {
      fields {
        name
        type {
          name
          kind
        }
        args {
          name
          type {
            kind
            ofType {
              name
              kind
            }
          }
        }
      }
    }
  }
}
```

Expected response:

```json
{
  "__schema": {
    "queryType": {
      "fields": [
        // This array may have other entries
        {
          "name": "node",
          "type": {
            "name": "Node",
            "kind": "INTERFACE"
          },
          "args": [
            {
              "name": "id",
              "type": {
                "kind": "NON_NULL",
                "ofType": {
                  "name": "ID",
                  "kind": "SCALAR"
                }
              }
            }
          ]
        }
      ]
    }
  }
}
```

## Field stability

If two objects appear in a query, both implementing `Node` with identical IDs, then the two objects must be equal.


# Plural identifying root fields

Plural identifying root fields are used to retrieve multiple objects of the same type from a GraphQL schema. These fields are typically defined in the root Query type in the schema.

Plural identifying root fields have two main characteristics:

1. They return a list of objects: Unlike singular identifying root fields that return a single object, plural identifying root fields return a list of objects. Each object in the list represents an instance of the specified type.

2. They use plural names: Plural identifying root fields are named using plural nouns. For example, if you have a type called "User" in your schema, a corresponding plural identifying root field might be named "users". This helps to convey that the field will return multiple instances of the "User" type.

Here's an example of how plural identifying root fields are used in a GraphQL schema:

```graphql
type Query {
  users: [User]!
}

type User {
  id: ID!
  name: String!
  email: String!
}
```

In this example, the `users` field is a plural identifying root field that returns a list of `User` objects. The exclamation mark at the end of `[User]!` signifies that the field is non-null and will always return a value (either an empty list or a list of `User` objects).

To query the `users` field, you can specify the fields you want to retrieve from each `User` object, like this:

```graphql
query {
  users {
    id
    name
    email
  }
}
```

This query will return a list of users and for each user, it will include their `id`, `name`, and `email`.

Plural identifying root fields in GraphQL are useful when you need to retrieve multiple objects of the same type efficiently in a single query.