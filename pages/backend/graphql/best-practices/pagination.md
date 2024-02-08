# Pagination

## Cursor-based pagination

In general, we've found that cursor-based pagination is the most powerful of those designed.

The cursors are opaque, either offset or ID-based pagination can be implemented using cursor-based pagination.

We suggest base64 encoding for cursors.

For example, if we wanted to get a list of friends, we could query like this:

```graphql
{
  hero {
    name
    friends(first:2, after:$friendCursor)
      name
    }
  }
}
```

- `first: 2`: specify how many friends they want to fetch
- `after: $friendCursor`: The cursor we get from the last item and use that to paginate.


## Edges

To get the cursor from the object, we introduce a new layer of indirection, the `friends` fields should give us a list of edges, and an edge has both a cursor and the underlying node:

```graphql
{
  hero {
    name
    friends(first: 2) {
      edges {
        node {
          name
        }
        cursor
      }
    }
  }
}
```


## End-of-list, counts, and Connections

If we want to know whether we reach the end of the connection, or how many total items are available, the field can return a connection object.

The connection object will then have a field for the edges, as well as other information (like total count and information about whether a next page exists).

So our final query might look more like:

```graphql
{
  hero {
    name
    friends(first: 2) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          name
        }
        cursor
      }
    }
  }
}
```

## Connection Specification

To ensure a consistent implementation of this pattern, the Relay project has a formal [specification](https://facebook.github.io/relay/graphql/connections.htm) you can follow for building GraphQL APIs which use a cursor based connection pattern.