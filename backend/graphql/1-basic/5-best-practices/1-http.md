# Serving over HTTP

GraphQL is typically served over HTTP via a single endpoint (while REST APIs expose a suite of URLs each of which expose a single resource).

Here are some guidelines for setting up a GraphQL server to operate over HTTP.

## Web Request Pipeline

Most modern web frameworks use a pipeline model where requests are passed through a stack of middleware.

As the request flows through the pipeline, it can be inspected, transformed, modified, or terminated with a response.

GraphQL should be placed after all authentication middleware, so that you have access to the same session and user information.

## URIs, Routes

A GraphQL server operates on a single URL/endpoint, usually `/graphql`, and all GraphQL requests for a given service should be directed at this endpoint.


## HTTP Methods, Headers, and Body

Your GraphQL HTTP server should handle the HTTP GET and POST methods.

### GET request

When receiving an HTTP GET request, the GraphQL query should be specified in the "query" query string.

For example, if we wanted to execute the following GraphQL query:

```graphql
{
  me {
    name
  }
}
```

This request could be sent via an HTTP GET like so:

```
http://myapi/graphql?query={me{name}}
```

Query variables can be sent as a JSON-encoded string in an additional query parameter called `variables`.

### POST request

A standard GraphQL POST request should use the `application/json` content type, and include a JSON-encoded body of the following form:

```js
{
  "query": "...",
  "operationName": "...",
  "variables": { "myVariable": "someValue", ... }
}
```

- `operationName` and `variables` are optional fields.
- `operationName` is only required if multiple operations are present in the query.


## Response

The response should be returned in the body of the request in JSON format.

A query might result in some data and some errors, and those should be returned in a JSON object of the form:

```js
{
  "data": { ... },
  "errors": [ ... ]
}
```

- If there were no errors returned, the `"errors"` field should not be present on the response.
- If no data is returned, the `"data"` field should only be included if no errors occurred during execution.


## GraphiQL

GraphiQL is useful during testing and development but should be disabled in production by default.


## JSON (with GZIP)

It's encouraged that any production GraphQL services enable GZIP and encourage their clients to send the header:

```
Accept-Encoding: gzip
```