# Getting started

Ajv takes a schema for your JSON data and converts it into a very efficient JavaScript code that validates your data according to the schema. To create a schema you can use either JSON Schema or JSON Type Definition, they have different advantages and disadvantages.

Ajv compiles schemas to functions and caches them in all cases (using the schema itself as a key in a Map), so that the next time the same schema object is used it won't be compiled again.

## Install

```sh
npm install ajv
```

## Basic data validation

To validate an object that has a **required property** "foo" (an integer number), an **optional property** "bar" (a string) and **no other properties**:

```ts
import Ajv from "ajv"
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const schema = {
  type: "object",
  properties: {
    foo: {type: "integer"},
    bar: {type: "string"}
  },
  required: ["foo"],
  additionalProperties: false
}

const validate = ajv.compile(schema)

const data = {
  foo: 1,
  bar: "abc"
}

const valid = validate(data)
if (!valid) console.log(validate.errors)
```

You need to make sure that you compile schemas only once and re-use compiled validation functions

Every time a validation function is called the `errors` property is overwritten. You need to copy the `errors` array reference to another variable if you want to use it later.


## Parsing and serializing JSON

Check [here](https://ajv.js.org/guide/getting-started.html#parsing-and-serializing-json).