## Installation

```bash
yarn add apollo-boost react-apollo graphql
```

## Create a client

```js
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: '/graphql',
});

export default client;
```

## Connect your client to React

```js
import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import client from './client';

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app 🚀</h2>
    </div>
  </ApolloProvider>
);

render(<App />, document.getElementById('root'));
```