# API Integration

# Connect frontend to API

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