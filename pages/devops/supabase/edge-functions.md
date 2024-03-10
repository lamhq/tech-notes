# Edge Functions

## Overview

Edge Functions are server-side TypeScript functions, distributed globally at the edge, close to your users.

Edge Functions are developed using Deno:
- They can run on any other Deno-compatible platform
- Support WebAssembly


## Initialize a project

See [init an existing project](./cli.md#init-an-existing-project).


## Create a Function

```shell
supabase functions new hello-world
```

This creates a function stub in your `supabase` folder:
```shell
└── supabase
    ├── functions
    │   └── hello-world
    │   │   └── index.ts ## Your function code
    └── config.toml
```


## Writting Functions

```ts filename="supabase/functions/hello-world/index.ts"
Deno.serve(async (req) => {
  const { name } = await req.json()
  const data = {
    message: `Hello ${name}!`,
  }

  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
})
```
