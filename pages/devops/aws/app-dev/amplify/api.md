# API

## Create a GraphQL API

```shell
amplify add api
```

The CLI will prompt you to enter **your API name**.

You can access the GraphQL schema at `amplify/backend/api/<your-api-name>/schema.graphql`.


## Deploying the API

```shell
amplify push
```


## Review deployed API in AWS console

```shell
amplify console api
```


## Test API with local mocking

```shell
amplify mock api
```

This will open the GraphiQL explorer on a local port. 