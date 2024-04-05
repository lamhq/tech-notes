# Building GraphQL API with NestJS

## Overview

NestJS provide the built-in `@nestjs/graphql` module to build GraphQL API.

It can be configured to use [Apollo](https://www.apollographql.com/) server (with the `@nestjs/apollo` driver) and [Mercurius](https://github.com/mercurius-js/mercurius) (with the `@nestjs/mercurius`).

You can also build your own dedicated driver.


## Approaches

Nest offers two ways of building GraphQL applications:

### Code first
- you use decorators and TypeScript classes to generate the corresponding GraphQL schema.
- useful if you prefer to work exclusively with TypeScript and avoid context switching between language syntaxes.

### Schema first

- you define GraphQL schemas using Schema Definition Language
- Nest automatically generates your TypeScript definitions based on the GraphQL schemas
