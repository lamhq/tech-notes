## Setting up

```js
import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./resolvers";

const client = new ApolloClient({
  uri: `https://nx9zvp49q7.lp.gql.zone/graphql`,
  clientState: {
    defaults,
    resolvers,
    typeDefs
  }
});
```

The three options you can pass to `clientState` are:

- defaults: Object. The initial data you want to write to the Apollo cache when the client is initialized
- resolvers: Object. A map of functions that your GraphQL queries and mutations call in order to read and write to the cache
- typeDefs: string | Array. A string representing your client-side schema written in [Schema Definition Language](https://www.apollographql.com/docs/graphql-tools/generate-schema.html#schema-language)


## Updating local data

There are two ways to perform mutations in apollo-link-state: 

- The first way is directly writing to the cache by calling `cache.writeData` within an ApolloConsumer or Query component. Direct writes are great for one-off mutations that don't depend on the data that's currently in the cache, such as writing a single value. 
- The second way is creating a Mutation component with a GraphQL mutation that calls a client-side resolver. We recommend using resolvers if your mutation depends on existing values in the cache, such as adding an item to a list or toggling a boolean. 

You can think of direct writes like calling `setState`, whereas resolvers offer a bit more structure like Redux.


### Direct writes

Direct writes to the cache do not require a GraphQL mutation or a resolver function. They access your Apollo Client instance directly by accessing the `client` property within the render prop function of the `ApolloConsumer` or `Query` components.

It's important to note that direct writes are not implemented as GraphQL mutations under the hood, so you shouldn't include them in your schema.

To immediately subscribe to a client-side mutation, wrap it in a `Query` component. The `Query` component also has the client instance exposed on its render prop function.


```js
import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Link from './Link';

const GET_VISIBILITY_FILTER = gql`
  {
    visibilityFilter @client
  }
`;

// Remember to set an initial value for visibilityFilter with defaults
const FilterLink = ({ filter, children }) => (
  <Query query={GET_VISIBILITY_FILTER}>
    {({ data, client }) => (
      <Link
        onClick={() => client.writeData({ data: { visibilityFilter: filter } })}
        active={data.visibilityFilter === filter}
      >
        {children}
      </Link>
    )}
  </Query>
);
```

### Resolvers

```js
export const resolvers = {
  Mutation: {
    toggleTodo: (_, variables, { cache, getCacheKey }) => {
      const id = getCacheKey({ __typename: 'TodoItem', id: variables.id })
      const fragment = gql`
        fragment completeTodo on TodoItem {
          completed
        }
      `;
      const todo = cache.readFragment({ fragment, id });
      const data = { ...todo, completed: !todo.completed };
      cache.writeData({ id, data });
      return null;
    },
  },
};
```

Let's learn how to trigger our `toggleTodo` mutation from our component:

```js
import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: Int!) {
    toggleTodo(id: $id) @client
  }
`;

const Todo = ({ id, completed, text }) => (
  <Mutation mutation={TOGGLE_TODO} variables={{ id }}>
    {toggleTodo => (
      <li
        onClick={toggleTodo}
        style={{
          textDecoration: completed ? 'line-through' : 'none',
        }}
      >
        {text}
      </li>
    )}
  </Mutation>
);
```

## Setting default state

Your `defaults` object represents the initial state that you would like to write to the cache.

```js
const defaults = {
  todos: [],
  visibilityFilter: 'SHOW_ALL',
};
```

## Client-side schema

You can optionally pass a client-side schema to the `typeDefs` config property.

```js
import gql from 'graphql-tag';

const typeDefs = gql`
  type Todo {
    id: Int!
    text: String!
    completed: Boolean!
  }

  type Mutation {
    addTodo(text: String!): Todo
    toggleTodo(id: Int!): Todo
  }

  type Query {
    visibilityFilter: String
    todos: [Todo]
  }
`;
```


## Combining local and remote data

What’s really cool about using a `@client` directive to specify client-side only fields is that you can actually combine local and remote data in one query.

First, let’s look at an example of a mixed query. The `images` field comes from the server. When the array of images comes back, we add a local field `isLiked` to each image.

```js
const GET_DOG = gql`
  query GetDogByBreed($breed: String!) {
    dog(breed: $breed) {
      images {
        url
        id
        isLiked @client
      }
    }
  }
`;

const resolvers = {
  Image: {
    isLiked: () => false
  }
};
```


## Next steps

- [apollo-link-state docs](https://www.apollographql.com/docs/link/links/state.html)
- [The future of state management](https://blog.apollographql.com/the-future-of-state-management-dd410864cae2?_ga=2.99929438.190626572.1543718053-1463789589.1540703730)