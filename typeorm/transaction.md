# Transactions

## Creating transactions

```ts
import {getConnection} from "typeorm";

await getConnection().transaction(async transactionalEntityManager => {
  // ...
});
```

```ts
import {getManager} from "typeorm";

await getManager().transaction(async transactionalEntityManager => {
  // ...
});
```


## Specifying Isolation Levels

Standard isolation levels:

- READ UNCOMMITTED
- READ COMMITTED
- REPEATABLE READ
- SERIALIZABLE

```ts
import {getManager} from "typeorm";

await getManager().transaction("SERIALIZABLE", transactionalEntityManager => {
  // ...
});
```