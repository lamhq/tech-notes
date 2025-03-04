# Edge Functions

## Overview

Edge Functions are server-side TypeScript functions, distributed globally at the edge, close to your users.

Edge Functions are developed using Deno:
- They can run on any other Deno-compatible platform
- Support WebAssembly


## Initializing a project

See [init an existing project](./cli.md#init-an-existing-project).


## Creating a Function

```sh
supabase functions new hello-world
```

This creates a function stub in your `supabase` folder:
```sh
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


## Running Functions locally

```sh
supabase start # start the supabase stack
supabase functions serve # start the Functions watcher
```


## Invoking Functions locally

```sh
curl --request POST 'http://localhost:54321/functions/v1/hello-world' \
  --header 'Authorization: Bearer SUPABASE_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{ "name":"Functions" }'
```
