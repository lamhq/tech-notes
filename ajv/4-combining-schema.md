# Combining schemas

## Combining schemas with `$ref`

You can structure your validation logic across multiple schema files and have schemas reference each other using `$ref` keyword.

```ts
const schema = {
  $id: "http://example.com/schemas/schema.json",
  type: "object",
  properties: {
    foo: {$ref: "defs.json#/definitions/int"},
    bar: {$ref: "defs.json#/definitions/str"},
  },
}

const defsSchema = {
  $id: "http://example.com/schemas/defs.json",
  definitions: {
    int: {type: "integer"},
    str: {type: "string"},
  },
}
```

Now to compile your schema you can pass all schemas to Ajv instance:

```ts
const ajv = new Ajv({schemas: [schema, defsSchema]})
const validate = ajv.getSchema("http://example.com/schemas/schema.json")
```

### Reference resolution

- `$ref` is resolved as the uri-reference using schema $id as the base URI 
- References can be recursive (and mutually recursive) to implement the schemas for different data structures (such as linked lists, trees, graphs, etc.).
- You don't have to host your schema files at the URIs that you use as schema $id. 
- The actual location of the schema file in the file system is not used.
- You can pass the identifier of the schema as the second parameter of `addSchema` method or as a property name in `schemas` option. This identifier can be used instead of (or in addition to) schema $id.
- You cannot have the same $id (or the schema identifier) used for more than one schema - the exception will be thrown.


## `$data` reference

With `$data` option you can use values from the validated data as the values for the schema keywords.

The value of "$data" should be a [JSON-pointer](https://datatracker.ietf.org/doc/rfc6901/) to the data (*the root is always the top level data object, even if the $data reference is inside a referenced subschema*) or a [relative JSON-pointer](http://tools.ietf.org/html/draft-luff-relative-json-pointer-00) (*it is relative to the current point in data; if the $data reference is inside a referenced subschema it cannot point to the data outside of the root level for this subschema*).