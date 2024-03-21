# Environment variables

## `Deno.env` API

```ts
Deno.env.set("FIREBASE_API_KEY", "examplekey123");
Deno.env.set("FIREBASE_AUTH_DOMAIN", "firebasedomain.com");

console.log(Deno.env.get("FIREBASE_API_KEY")); // examplekey123
console.log(Deno.env.get("FIREBASE_AUTH_DOMAIN")); // firebasedomain.com
console.log(Deno.env.has("FIREBASE_AUTH_DOMAIN")); // true
```


## `.env` file

You can also put environment variables in a `.env` file and retrieve them using `dotenv` in the standard library.

```ts
import { load } from "https://deno.land/std@0.220.0/dotenv/mod.ts";

const env = await load();
const password = env["PASSWORD"];

console.log(password);
// "Geheimnis"
```

```shell filename=".env"
PASSWORD=Geheimnis
```


## Special environment variables

See [pre-defined environment variables](https://docs.deno.com/runtime/manual/basics/env_variables#special-environment-variables).
