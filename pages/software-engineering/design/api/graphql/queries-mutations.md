# Queries and Mutations

## Fields

A query that retrieve value of the field `name` in `hero` object:

```gql
{
  hero {
    name
  }
}
```

The result:

```json
{
  "data": {
    "hero": {
      "name": "R2-D2"
    }
  }
}
```

- the query has exactly the same shape as the result
- fields can also refer to Objects and you can make a sub-selection of fields for that object


## Arguments

In a system like REST, you can only pass a single set of arguments: query parameters and URL segments.

In GraphQL, every field and nested object can get its own set of arguments

```gql
{
  human(id: "1000") {
    name
    # passing arguments into scalar fields for data transformations
    height(unit: FOOT)
  }
}
```

```json
{
  "data": {
    "human": {
      "name": "Luke Skywalker",
      "height": 5.6430448
    }
  }
}
```


## Aliases

Since the result object fields match the name of the field in the query, you can't directly query for the same field with different arguments.

*Aliases* let you rename the result of a field to anything you want.

```gql
{
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}
```

```json
{
  "data": {
    "empireHero": {
      "name": "Luke Skywalker"
    },
    "jediHero": {
      "name": "R2-D2"
    }
  }
}
```


## Fragments

To query for two objects side by side, along with their relation without repeating the fields in your query, you can use fragments.

Fragments let you construct sets of fields, and then include them in queries where you need to.

Here's the query that gets two heroes side by side, along with their friends:

```gql
{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}
​
fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
```

**Accessing arguments declared in query inside fragments**:

Getting the first 3 friends for each hero:

```gql
query HeroComparison($first: Int = 3) {
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  friendsConnection(first: $first) {
    totalCount
    edges {
      node {
        name
      }
    }
  }
}
```


## Operation name

Here's an example that includes the keyword `query` as *operation type* and `HeroNameAndFriends` as *operation name*:

```gql
query HeroNameAndFriends {
  hero {
    name
    friends {
      name
    }
  }
}
```

The **operation type** is either `query`, `mutation`, or `subscription` and describes what type of operation you're intending to do.

The **operation name** is a meaningful and explicit name for your operation. It is only required in multi-operation documents, but its use is encouraged because it is very helpful for debugging and server-side logging.

If you're using the query shorthand syntax, you can't supply a name or variable definitions for your operation.


## Variables

Variables allow you to pass dynamic values from client code to arguments in query.

When we start working with variables, we need to do three things:

- Replace the static value in the query with `$variableName`
- Declare `$variableName` as one of the variables accepted by the query
- Pass `variableName: value` in the separate, transport-specific (usually JSON) variables dictionary

```gql
query HeroNameAndFriends($episode: Episode) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

Variables:

```json
{
  "episode": "JEDI"
}
```

All declared variables must be either scalars, enums, or input object types.

Variable definitions can be optional or required.

To learn more about the syntax for variable definitions, it's useful to learn the GraphQL schema language.

### Default variables

```gql
query HeroNameAndFriends($episode: Episode = JEDI) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```


## Directives

Directives allow us to ynamically change the structure and shape of our queries using variables.

In below query, `$withFriends` variable is required (with `!` suffix). If its value is `true`, the field `friends` will be included in the response (by the directive `@include(if: Boolean)`).

```gql
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}
```

A directive can be attached to a field or fragment inclusion.

The core GraphQL specification includes exactly two directives:
- `@include(if: Boolean)`
- `@skip(if: Boolean)`


## Mutations

Any operations that cause writes should be sent explicitly via a mutation.

Just like in queries, if the mutation field returns an object type, you can ask for nested fields.

While query fields are executed in parallel, mutation fields run in series, one after the other.

```gql
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
```

Variables:

```json
{
  "ep": "JEDI",
  "review": {
    "stars": 5,
    "commentary": "This is a great movie!"
  }
}
```

Response:

```json
{
  "data": {
    "createReview": {
      "stars": 5,
      "commentary": "This is a great movie!"
    }
  }
}
```


## Inline Fragments

If you are querying a field that returns an interface or a union type, you will need to use inline fragments to access data on the underlying concrete type. 

```gql
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... on Droid {
      primaryFunction
    }
    ... on Human {
      height
    }
  }
}
```

Variables:

```json
{
  "ep": "JEDI"
}
```

Response:

```json
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "primaryFunction": "Astromech"
    }
  }
}
```

In this query, the `hero` field returns the type `Character`, which might be either a `Human` or a `Droid`.

To ask for a field on the concrete type, you need to use an **inline fragment** with a type condition.

The first fragment is labeled as `... on Droid`. The `primaryFunction` field will only be executed if the `Character` returned from `hero` is of the `Droid` type.

Similarly for the `height` field for the `Human` type.


## Meta fields

GraphQL allows you to get the name of the object type by request a meta field: `__typename`.

```gql
{
  search(text: "an") {
    __typename
    ... on Human {
      name
    }
    ... on Droid {
      name
    }
    ... on Starship {
      name
    }
  }
}
```

Response:

```json
{
  "data": {
    "search": [
      {
        "__typename": "Human",
        "name": "Han Solo"
      },
      {
        "__typename": "Human",
        "name": "Leia Organa"
      },
      {
        "__typename": "Starship",
        "name": "TIE Advanced x1"
      }
    ]
  }
}
```
