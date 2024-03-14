# Syntax

## Importing remote modules

The [Standard library](https://deno.land/std@0.219.0) and most third-party modules are distributed on HTTPS URLs.

```ts
import { assertEquals } from "https://deno.land/std@0.219.0/assert/mod.ts";

Deno.test("sayHello function", () => {
  const grace: Person = {
    lastName: "Hopper",
    firstName: "Grace",
  };

  assertEquals("Hello, Grace!", sayHello(grace));
});
```


## Using Node.js APIs and npm packages

You can use Node and npm modules in your code by using either `node:` or `npm:` specifier when importing Node built-ins or npm modules:

```ts
import express from "npm:express@4";

const app = express();

app.get("/", (request, response) => {
  response.send("Hello from Express!");
});

app.listen(3000);
```
