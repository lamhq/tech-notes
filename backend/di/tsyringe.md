# TSyringe

A lightweight dependency injection container for TypeScript/JavaScript for **constructor injection** (maintained by Microsoft).

Support:
- class-based and token-based injections.
- provide parameterless constructor that has dependencies auto-resolved.

## Version

This document is for version `4.7.0`


## Installation

```bash
yarn add tsyringe reflect-metadata
```

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

Add a polyfill for the Reflect API:

```js
// main.ts
import "reflect-metadata";

// Your code here...
```

## Decorators

### `injectable()`

Class decorator factory that allows the class' dependencies to be injected at runtime.

```ts
import {injectable} from "tsyringe";

@injectable()
class Foo {
  constructor(private database: Database) {}
}

// some other file
import "reflect-metadata";
import {container} from "tsyringe";
import {Foo} from "./foo";

const instance = container.resolve(Foo);
```


### `singleton()`

Class decorator factory that registers the class as a singleton within the global container.

```ts
import {singleton} from "tsyringe";

@singleton()
class Foo {
  constructor() {}
}

// some other file
import "reflect-metadata";
import {container} from "tsyringe";
import {Foo} from "./foo";

const instance = container.resolve(Foo);
```


## Examples

### Example without interfaces

```ts
// Foo.ts
export class Foo {}
```

```ts
// Bar.ts
import { injectable } from "tsyringe";
import { Foo } from "./Foo";

@injectable()
export class Bar {
  constructor(public myFoo: Foo) {}
}
```

```ts
// main.ts
import "reflect-metadata";
import { container } from "tsyringe";
import { Bar } from "./Bar";

const myBar = container.resolve(Bar);
// myBar.myFoo => An instance of Foo
```

### Example with interfaces

nterfaces don't have type information at runtime, so we need to decorate them with `@inject(...)` so the container knows how to resolve them.

```ts
// SuperService.ts
export interface SuperService {
  // ...
}
```

```ts
// TestService.ts
import {SuperService} from "./SuperService";
export class TestService implements SuperService {
  //...
}
```

```ts
// Client.ts
import {injectable, inject} from "tsyringe";

@injectable()
export class Client {
  constructor(@inject("SuperService") private service: SuperService) {}
}
```

```ts
// main.ts
import "reflect-metadata";
import {Client} from "./Client";
import {TestService} from "./TestService";
import {container} from "tsyringe";

container.register("SuperService", {
  useClass: TestService
});

const client = container.resolve(Client);
// client's dependencies will have been resolved
```


### Injecting primitive values (Named injection)

Primitive values can also be injected by utilizing named injection:

```ts
import {singleton, inject} from "tsyringe";

@singleton()
class Foo {
  private str: string;
  constructor(@inject("SpecialString") value: string) {
    this.str = value;
  }
}
```

```ts
// main.ts
import "reflect-metadata";
import {container} from "tsyringe";
import {Foo} from "./foo";

const str = "test";
container.register("SpecialString", {useValue: str});

const instance = container.resolve(Foo);
```
