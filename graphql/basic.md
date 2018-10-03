## Resolver result format

1. `null` or `undefined` - this indicates the object could not be found.
2. An array.
3. A promise.
4. A scalar or object value.


## Resolver function signature

```js
fieldName(obj, args, context, info) { result }
```

1. `obj`: The object that contains the result returned from the resolver on the parent field.
3. `context`: This is an object shared by all resolvers in a particular query, and is used to contain per-request state, including authentication information, dataloader instances, and anything else that should be taken into account when resolving the query.
4. `info`: This argument should only be used in advanced cases, but it contains information about the execution state of the query, including the field name, path to the field from the root, and more.


## Unions and interfaces

When you have a field in your schema that returns a union or interface type, you will need to specify an extra `__resolveType` field in your resolver map, which tells the GraphQL executor which type the result is, out of the available options.

For example, if you have a `Vehicle` interface type with members `Airplane` and `Car`:

```gql
interface Vehicle {
  maxSpeed: Int
}

type Airplane implements Vehicle {
  maxSpeed: Int
  wingspan: Int
}

type Car implements Vehicle {
  maxSpeed: Int
  licensePlate: String
}
```

```js
const resolverMap = {
  Vehicle: {
    __resolveType(obj, context, info){
      if(obj.wingspan){
        return 'Airplane';
      }

      if(obj.licensePlate){
        return 'Car';
      }

      return null;
    },
  },
};
```


## Resources

- [GitHunt API](https://github.com/apollographql/GitHunt-API)
- [GraphQL schema language cheat sheet](https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png)
