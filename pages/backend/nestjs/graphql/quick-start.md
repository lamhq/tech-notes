# Quick Start

## Installation

For Express and Apollo (default):

```shell
npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql
```

Import the GraphQLModule and configure it:

```ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
    }),
  ],
})
export class AppModule {}
```

The `forRoot()` method takes an options object as an argument. These options are passed through to the underlying driver instance. In this case, these options will be forwarded to the `ApolloServer` constructor.


## Include resolvers

By default, GraphQL searches for resolvers throughout the whole app. To limit this scan to only a subset of modules, use the `include` property.

```ts
GraphQLModule.forRoot({
  include: [CatsModule],
}),
```


## GraphQL playground

You can access the GraphQL playground at http://localhost:3000/graphql


## Code first

Check the [official documentation](https://docs.nestjs.com/graphql/quick-start#code-first).


## Schema first

When configuring `GraphQLModule`:
- specify `typePaths` property to the options object to indicate where to look for GraphQL SDL schema definition files
- enable automatically generating TypeScript definitions by adding the `definitions` options property. It indicates where to save generated TypeScript output.

```tsx
GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  typePaths: ['./**/*.graphql'],
}),
```

Schema definition can be splitted into several files near their resolvers and will be combined in memory.
