## The Query component

What's happening behind the scenes with Apollo Client when we fetch data from a Query component:

1. When the Query component mounts, Apollo Client creates an observable for our query. Our component subscribes to the result of the query via the Apollo Client cache.
2. First, we try to load the query result from the Apollo cache. If it’s not in there, we send the request to the server.
3. Once the data comes back, we normalize it and store it in the Apollo cache. Since the Query component subscribes to the result, it updates with the data reactively.


```js
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;

const DogPhoto = ({ breed }) => (
  <Query query={GET_DOG_PHOTO} variables={{ breed }}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;

      return (
        <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
      );
    }}
  </Query>
);
```


## Polling and refetching

What if you want to reload the query in response to a user action. That's where the `refetch` function comes in! `refetch` takes variables, but if we don’t pass in new variables, it will use the same ones from our previous query.

```js
const DogPhoto = ({ breed }) => (
  <Query
    query={GET_DOG_PHOTO}
    variables={{ breed }}
    skip={!breed}
  >
    {({ loading, error, data, refetch }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;

      return (
        <div>
          <img
            src={data.dog.displayImage}
            style={{ height: 100, width: 100 }}
          />
          <button onClick={() => refetch()}>Refetch!</button>
        </div>
      );
    }}
  </Query>
);
```

## Loading and error state

If you click on the refetch button, you’ll see that the component doesn't re-render until the new data arrives. What if we want to indicate to the user that we’re refetching the photo?

Apollo Client provides fine-grained information about the status of our query via the `networkStatus` property on the result object in the render prop function. We also need to set the prop `notifyOnNetworkStatusChange` to true so our query component re-renders while a refetch is in flight.

```js
const DogPhoto = ({ breed }) => (
  <Query
    query={GET_DOG_PHOTO}
    variables={{ breed }}
    skip={!breed}
    notifyOnNetworkStatusChange
  >
    {({ loading, error, data, refetch, networkStatus }) => {
      if (networkStatus === 4) return "Refetching!";
      if (loading) return null;
      if (error) return `Error!: ${error}`;

      return (
        <div>
          <img
            src={data.dog.displayImage}
            style={{ height: 100, width: 100 }}
          />
          <button onClick={() => refetch()}>Refetch!</button>
        </div>
      );
    }}
  </Query>
);
```

The `networkStatus` property is an enum with number values from 1-8 representing a different loading state. 4 corresponds to a refetch, but there are also numbers for polling and pagination. For a full list of all the possible loading states, check out the [reference guide](https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-networkStatus)


## Query API overview

Checkout [here](https://www.apollographql.com/docs/react/essentials/queries.html#api)