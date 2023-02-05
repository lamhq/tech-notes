# Dynamic query

Allow querying nested data between entities.

Inspired by GraphQL, but it is simpler to implement and can be applied in RESTful API

```ts
interface FieldSelector {
  [key: string]: number | FieldSelector;
}

interface Query {
  limit?: number;
  offset?: number;
  fields?: FieldSelector;
}

interface QueryService<T> {

  findAll(q: Query = {}): T[];
  
  findOne(q: Query = {}): T | undefined;
  
  findOneOrFail(q: Query = {}): T;

  findByIdOrFail(id: IDField, fields?: FieldSelector): T
}
```