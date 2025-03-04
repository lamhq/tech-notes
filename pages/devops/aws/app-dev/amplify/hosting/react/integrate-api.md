# Integrate API

Connect your frontend to a GraphQL API.

## Connect Amplify provisioned API

If the API is created with Amplify CLI, configure the Amplify Client Library with an `amplifyconfiguration.json` file. This file contains your API's endpoint information and auth configurations:

```ts
import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';

Amplify.configure(config);
```


## Connect AppSync API

You must manually provide your API endpoint and auth configurations.

To configure the GraphQL API endpoint URL, set the `endpoint` and `region` values:

```ts
import { Amplify } from 'aws-amplify';

Amplify.configure({
  API: {
    GraphQL: {
      // Provide endpoint and region information here
      endpoint: 'https://abcxyz.appsync-api.us-east-1.amazonaws.com/graphql',
      region: 'us-east-1'
      // Read next section on how to set the correct authorization mode for the API
    }
  }
});
```


## Configure the default authorization mode

The Default Authorization Mode is provided as part of the `amplifyconfiguration.json` if you provisioned your API using the Amplify CLI.

If your API is created using other tools, you need to manually set the Default Authorization Mode:
```tsx
import { Amplify } from 'aws-amplify';

Amplify.configure({
  API: {
    GraphQL: {
      endpoint: 'https://abcxyz.appsync-api.us-east-1.amazonaws.com/graphql',
      region: 'us-east-1',
      // Set the default auth mode to "apiKey" and provide the API key value
      defaultAuthMode: 'apiKey',
      apiKey: 'da2-xxxxxxxxxxxxxxxxxxxxxxxxxx'
    }
  }
});
```

See [available authorization modes](https://docs.amplify.aws/react/build-a-backend/graphqlapi/connect-to-api/#configure-the-default-authorization-mode).


## Set request headers for API request

```tsx
import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';

Amplify.configure(config, {
  API: {
    GraphQL:  {
      headers: async () => ({
        'My-Custom-Header': 'my value'
      })
    }
  }
});
```


## Generate GraphQL client code and typings

You can generate GraphQL queries, mutations, and subscriptions directly from your backend GraphQL schema to use in your frontend project.

To add Appsync GraphQL API, run the command:
```sh
npx @aws-amplify/cli codegen add --apiId <...> --region <...>
```

After every API deployment, you can rerun the following command to generate updated GraphQL statement and types:
```sh
npx @aws-amplify/cli codegen
```

The code is generated at `graphql/mutations`, `./graphql/queries`, `./graphql/subscription`.


## Perform API operations
```ts
import { generateClient } from 'aws-amplify/api';

import { createTodo } from './graphql/mutations';
import { listTodos } from './graphql/queries';

const client = generateClient();

// query
const todoData = await client.graphql({
  query: listTodos,
});
const todos = todoData.data.listTodos.items

// mutation
await client.graphql({
  query: createTodo,
  variables: {
    input: todo,
  },
});
```