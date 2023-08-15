# Introspection

## List available types

By querying the `__schema` field, we know what types are available.

```graphql
{
  __schema {
    types {
      name
    }
  }
}
```


## Find available queries

```graphql
{
  __schema {
    queryType {
      name
    }
  }
}
```

Response:

```json
{
  "data": {
    "__schema": {
      "queryType": {
        "name": "Query"
      }
    }
  }
}
```

The `Query` type is where we will start.


## Find types by name

```graphql
{
  __type(name: "Droid") {
    name
  }
}
```

Checking whether a type is an interface or an object:

```graphql
{
  __type(name: "Droid") {
    name
    kind
  }
}
```

Response:

```json
{
  "data": {
    "__type": {
      "name": "Droid",
      "kind": "OBJECT"
    }
  }
}
```


## List available fields of a type

```graphql
{
  __type(name: "Droid") {
    name
    fields {
      name
      type {
        name
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

Response:

```json
{
  "data": {
    "__type": {
      "name": "Droid",
      "fields": [
        {
          "name": "id",
          "type": {
            "name": null,
            "kind": "NON_NULL",
            "ofType": {
              "name": "ID",
              "kind": "SCALAR"
            }
          }
        },
        {
          "name": "name",
          "type": {
            "name": null,
            "kind": "NON_NULL",
            "ofType": {
              "name": "String",
              "kind": "SCALAR"
            }
          }
        },
      ]
    }
  }
}
```
