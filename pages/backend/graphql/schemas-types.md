# Schemas and Types

Every GraphQL service defines a set of types which completely describe the set of possible data you can query on that service.

When queries come in, they are validated and executed against that schema.

We use GraphQL schema language to define GraphQL schemas.


## Object types and fields

Object types represent a kind of object you can fetch from your service, and what fields it has.

```gql
type Character {
  name: String!
  appearsIn: [Episode!]!
}
```

- `Character` is a _GraphQL Object Type_, meaning it's a type with some fields.
- `name` and `appearsIn` are _fields_ on the `Character` type.
- `String` is one of the built-in _scalar_ types.
- `String!` means that the field is _non-nullable_.
- `[Episode!]!` represents an _array_ of `Episode` objects. Since it is also _non-nullable_, you can always expect an array when you query the `appearsIn` field. And since `Episode!` is also _non-nullable_, you can always expect every item of the array to be an `Episode` object.


## Arguments

Every field on a GraphQL object type can have zero or more arguments, for example the `length` field below:

```graphql
type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}
```

All arguments in GraphQL are passed by name (not a list of ordered arguments).

## The Query and Mutation types

Most types in your schema will just be normal object types, but there are two types that are special within a schema:

```graphql
schema {
  query: Query
  mutation: Mutation
}
```

Every GraphQL service has a `query` type and may or may not have a `mutation` type. These types are special because they define the _entry point_ of every GraphQL query. So if you see a query that looks like:

```graphql
# { "graphiql": true }
query {
  hero {
    name
  }
  droid(id: "2000") {
    name
  }
}
```

That means that the GraphQL service needs to have a `Query` type with `hero` and `droid` fields:

```graphql
type Query {
  hero(episode: Episode): Character
  droid(id: ID!): Droid
}
```

Mutations work in a similar way.


## Scalar types

Fields in a GraphQL object type sometimes have to resolve to some concrete data.

That's where the scalar types come in: they represent the leaves of the query.

GraphQL comes with a set of default scalar types out of the box:

- `Int`: A signed 32‐bit integer.
- `Float`: A signed double-precision floating-point value.
- `String`: A UTF‐8 character sequence.
- `Boolean`: `true` or `false`.
- `ID`: The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache. The ID type is serialized in the same way as a String; however, defining it as an `ID` signifies that it is not intended to be human‐readable.

In most GraphQL service implementations, there is also a way to specify custom scalar types (e.g., `Date` type). Then it's up to our implementation to define how that type should be serialized, deserialized, and validated.


## Enumeration types

Also called _Enums_, enumeration types are a special kind of scalar that is restricted to a particular set of allowed values. This allows you to:

1. Validate that any arguments of this type are one of the allowed values
2. Communicate through the type system that a field will always be one of a finite set of values

```graphql
enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}
```


## Non-Null type modifier

### Making field value non-nullable

Here, we're using a `String` type and marking it as _Non-Null_ by adding an exclamation mark, `!` after the type name.

This means that our server always expects to return a non-null value for this field, and if it ends up getting a null value that will actually trigger a GraphQL execution error, letting the client know that something has gone wrong.

```graphql
type Character {
  name: String!
  appearsIn: [Episode]!
}
```

### Making arguments non-nullable

The Non-Null type modifier can also be used when defining arguments for a field, which will cause the GraphQL server to return a validation error if a null value is passed as that argument.

```graphql
query DroidById($id: ID!) {
  droid(id: $id) {
    name
  }
}
```

## Lists type modifier

We can use a type modifier to mark a type as a `List`, which indicates that this field will return an array of that type.

In the schema language, this is denoted by wrapping the type in square brackets, `[` and `]`.

The Non-Null and List modifiers can be combined. For example, you can have a List of Non-Null Strings:

```graphql
myField: [String!]
```

This means that the _list itself_ can be null, but it can't have any null members. For example, in JSON:

```js
myField: null // valid
myField: [] // valid
myField: ["a", "b"] // valid
myField: ["a", null, "b"] // error
```


## Interfaces

An _Interface_ is an abstract type that includes a certain set of fields that a type must include to implement the interface.

```graphql
interface Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}
```

Any type that _implements_ `Character` needs to have these exact fields, with these arguments and return types.

here are some types that might implement `Character`:

```graphql
type Human implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  starships: [Starship]
  totalCredits: Int
}

type Droid implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  primaryFunction: String
}
```

Interfaces are useful when you want to return an object or set of objects, but those might be of several different types.


## Union types

Union types are very similar to interfaces, but they don't get to specify any common fields between the types.

```graphql
union SearchResult = Human | Droid | Starship
```

Members of a union type need to be concrete object types; you can't create a union type out of interfaces or other unions.

If you query a field that returns union type, you need to use an inline fragment to be able to query any fields at all.

```graphql
union SearchResult = Human | Droid | Starship
```

Wherever we return a `SearchResult` type in our schema, we might get a `Human`, a `Droid`, or a `Starship`.


```graphql
{
  search(text: "an") {
    __typename
    ... on Human {
      name
      height
    }
    ... on Droid {
      name
      primaryFunction
    }
    ... on Starship {
      name
      length
    }
  }
}
```

The `__typename` field resolves to a `String` which lets you differentiate different data types from each other on the client.

```json
{
  "data": {
    "search": [
      {
        "__typename": "Human",
        "name": "Han Solo",
        "height": 1.8
      },
      {
        "__typename": "Human",
        "name": "Leia Organa",
        "height": 1.5
      },
      {
        "__typename": "Starship",
        "name": "TIE Advanced x1",
        "length": 9.2
      }
    ]
  }
}
```

If your types share a common interface, you can query their common fields in one place rather than having to repeat the same fields across multiple types:

```graphql
{
  search(text: "an") {
    __typename
    ... on Character {
      name
    }
    ... on Human {
      height
    }
    ... on Droid {
      primaryFunction
    }
    ... on Starship {
      name
      length
    }
  }
}
```

- `Human` and `Droid` share a common interface (`Character`)
- `name` is still specified on `Starship` because `Starship` is not a `Character`

## Input types (mutation)

You can pass complex objects as arguments into a field.

This is particularly valuable in the case of mutations, where you might want to pass in a whole object to be created.

In the GraphQL schema language, input types are declared with the keyword `input`:

```graphql
input ReviewInput {
  stars: Int!
  commentary: String
}
```

Here is how you could use the input object type in a mutation:

```graphql
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
```

The fields on an input object type can themselves refer to input object types, but you can't mix input and output types in your schema. 

Input object types can't have arguments on their fields.