# API

## Create a GraphQL API

```sh
amplify add api
```

The CLI will prompt you to enter **your API name**.

You can access the GraphQL schema at `amplify/backend/api/<your-api-name>/schema.graphql`.


## Deploying the API

```sh
amplify push -y
```


## Review deployed API in AWS console

```sh
amplify console api
```


## Test API with local mocking

```sh
amplify mock api
```

This will open the GraphiQL explorer on a local port.


## Update the generated schema

```sh
amplify api gql-compile
```
