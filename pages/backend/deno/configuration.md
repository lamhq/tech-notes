# Configure your project

Configuration file is named `deno.json` or `deno.jsonc`

## Import map

you can use configuration file to configure an import map, which will let you set up aliases for frequently used modules:

```json filename="deno.jsonc"
{
  "imports": {
    // The dollar sign in front of "std" isn't special - it's an optional
    // convention to show that $std is an alias set up in an import map
    "$std/": "https://deno.land/std@0.219.0/"
  }
}
```

Change your code to use import alias:
```ts
import { assertEquals } from "$std/assert/mod.ts";

Deno.test("sayHello function", () => {
  const grace: Person = {
    lastName: "Hopper",
    firstName: "Grace",
  };

  assertEquals("Hello, Grace!", sayHello(grace));
});
```
