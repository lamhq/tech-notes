# Managing schemas

In this topic, we'll discuss approaches to manage compiled schemas"

## Compiling during initialization

The simplest approach is to compile all your schemas when the application starts, outside of the code that handles requests. It can be done simply in the module scope:

```ts
mport Ajv from "ajv"
import * as schema_user from "./schema_user.json"
const ajv = new Ajv()
const validate_user = ajv.compile<User>(schema_user)

interface User {
  username: string
}

// this is just some abstract API framework
app.post("/user", async (cxt) => {
  if (validate_user(cxt.body)) {
    // create user
  } else {
    // report error
    cxt.status(400)
  }
})
```


## Using Ajv instance cache

Another, more effective approach, is to use Ajv instance cache to have all compiled validators available anywhere in your application from a single import.

In this case you would have a separate module where you instantiate Ajv and use this instance in your application.

```ts
// validation.ts
import Ajv from "ajv"
import * as schema_user from "./schema_user.json"
import * as schema_document from "./schema_document.json"
export const ajv = new Ajv()
ajv.addSchema(schema_user, "user")
ajv.addSchema(schema_document, "document")
```

```ts
// users.ts
import ajv from "./validation"

interface User {
  username: string
}

// this is just some abstract API framework
app.post("/user", async (cxt) => {
  const validate = ajv.getSchema<User>("user")
  if (validate(cxt.body)) {
    // create user
  } else {
    // report error
    cxt.status(400)
  }
})
```

In the example above, the key passed to the `addSchema` method was used to retrieve schemas from the cache. The other option is to use chema root `$id` attribute:

```ts
const schema = {
  $id: "http://example.com/schemas/schema.json",
  type: "object",
  properties: {
    foo: {$ref: "defs.json#/definitions/int"},
    bar: {$ref: "defs.json#/definitions/str"},
  },
}
```