## The GraphQL-first philosophy

GraphQL schema is the first thing you design, and acts as the contract between your frontend and backend

Your actual business logic, permissions, and other concerns should not be part of your GraphQL schema. For large apps, we suggest splitting your GraphQL server code into 4 components: Schema, Resolvers, Models, and Connectors, which each handle a specific part of the work. 

Use standard libraries for auth and other special concerns. There’s no need to reinvent the login process in GraphQL

## Modularizing the schema

If your schema gets large, you may want to define parts of it in different files and import them to create the full schema

```js
// author.js
import Book from './book';

const Author = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    books: [Book]
  }
`;

// we export Author and all types it depends on
// in order to make sure we don't forget to include
// a dependency and we wrap it in a function
// to avoid strings deduplication
export default () => [Author, Book];
```

```js
// book.js
import Author from './author';

const Book = `
  type Book {
    title: String
    author: Author
  }
`;

export default () => [Book, Author];
```

```js
// schema.js
import Author from './author.js';

const RootQuery = `
  type RootQuery {
    author(id: Int!): Author
  }
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

export default makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, Author],
  resolvers: {},
});
```

You can do the same thing with resolvers - just pass around multiple resolver objects, and at the end combine them together into a plain array. They will be deeply merged by `makeExecutableSchema`.

```js
import { resolvers as gitHubResolvers } from './github/schema';
import { resolvers as sqlResolvers } from './sql/schema';

const rootResolvers = { ... };

// resolvers will be merged together by makeExecutableSchema.
const resolvers = [rootResolvers, gitHubResolvers, sqlResolvers];
```

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

## Resources

- [GitHunt API](https://github.com/apollographql/GitHunt-API)
- [GraphQL schema language cheat sheet](https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png)
