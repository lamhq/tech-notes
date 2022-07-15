# JSON Schema

## `type`

`number`, `integer`, `string`, `boolean`, `array`, `object` or `null`.

## `nullable`

```js
{
  type: "string",
  nullable: true
}
```

## Keywords for numbers

### `maximum` / `minimum` / `exclusiveMaximum` / `exclusiveMinimum`

```js
{
  type: "number",
  maximum: 5
}
```

## Keywords for strings

### `maxLength` / `minLength`

```js
{
  type: "string",
  maxLength: 5
}
```

### `pattern`

Ajv uses new `RegExp(value, "u")` to create the regular expression that will be used to test data.

```js
{
  type: "string",
  pattern: "[abc]+"
}
```

### `format`

The data to be valid should match the format with this [name](https://github.com/ajv-validator/ajv-formats).

```js
{
  type: "string",
  format: "ipv4"
}
```


## Keywords for arrays

### `maxItems` / `minItems` / `uniqueItems`

```js
{
  type: "array",
  maxItems: 3,
  uniqueItems: true
}
```

### `items`

The value of the keyword should be a schema or an array of schemas.

```js
{
  type: "array",
  items: { type: "integer" }
}
```

```js
{
  type: "array",
  items: [{type: "integer"}, {type: "string"}]
}
```

### `contains`

The value of the keyword is a JSON Schema. The array is valid if it contains at least one item that is valid according to this schema.

```js
{
  type: "array", 
  contains: { type: "integer" }
}
```


## Keywords for objects

### `properties`

```js
{
  type: "object",
  properties: {
    foo: {
      type: "string"
    },
    bar: {
      type: "number",
      minimum: 2
    }
  }
}
```

### `required`

The value of the keyword should be an array of unique strings. The data object to be valid should contain all properties with names equal to the elements in the keyword value.

```js
{
  type: "object",
  required: ["a", "b"]
}
```

### `additionalProperties`

The value of the keyword should be either a boolean or a JSON Schema.

If the value is `true` the keyword is ignored.

If the value is `false` the data object to be valid should not have "additional properties" 

If the value is a schema for the data object to be valid the values in all "additional properties" should be valid according to this schema.

```js
{
  type: "object",
  properties: {
    foo: { type: "number" }
  },
  additionalProperties: false
}
```

```js
{
  type: "object",
  properties: {
    foo: { type: "number" }
  },
  additionalProperties: { type: "string" }
}
```

### `dependentRequired`

If the data object contains a property that is a key in the keyword value, then to be valid the data object should also contain all properties from the corresponding array of properties in this keyword.

```js
{
  type: "object",
  dependentRequired: {
    foo: ["bar", "baz"]
  }
}
```

### `dependentSchemas`

If the data object contains a property that is a key in the keyword value, then to be valid the data object itself (NOT the property value) should be valid according to the corresponding schema in this keyword.

```js
{
  type: "object",
  dependentSchemas: {
    foo: {
      properties: {
        bar: {type: "number"}
      }
    }
  }
}
```

### `discriminator`

To use `discriminator` keyword you have to use option `discriminator: true` with Ajv constructor - it is not enabled by default.

```js
{
  type: "object",
  discriminator: {propertyName: "foo"},
  required: ["foo"],
  oneOf: [
    {
      properties: {
        foo: {const: "x"},
        a: {type: "string"},
      },
      required: ["a"],
    },
    {
      properties: {
        foo: {enum: ["y", "z"]},
        b: {type: "string"},
      },
      required: ["b"],
    },
  ],
}
```

_valid_: `{foo: "x", a: "any"}`, `{foo: "y", b: "any"}`, `{foo: "z", b: "any"}`

_invalid_:

- `{}`, `{foo: 1}` - discriminator tag must be string
- `{foo: "bar"}` - discriminator tag value must be in oneOf subschema
- `{foo: "x", b: "b"}`, `{foo: "y", a: "a"}` - invalid object


### `patternProperties`

```js
{
  type: "object",
  patternProperties: {
    "^fo.*$": { type: "string" },
    "^ba.*$": { type: "number" }
  }
}
```

### `propertyNames`

For data object to be valid each property name in this object should be valid according to this schema.

```js
{
  type: "object",
  propertyNames: {
    format: "email"
  }
}
```

### `maxProperties` / `minProperties`

```js
{
  type: "object", 
  maxProperties: 2
}
```


## Keywords for all types

### `enum`

_schema_: `{ enum: [2, "foo", {foo: "bar" }, [1, 2, 3]] }`

_valid_: `2`, `"foo"`, `{foo: "bar"}`, `[1, 2, 3]`

### `const`

_schema_: `{const: "foo"}`

_valid_: `"foo"`


## Compound keywords

### `not`

The value of the keyword should be a JSON Schema.

_schema_: `{type: "number", not: {minimum: 3}}`

_valid_: `1`, `2`

### `oneOf`

The value of the keyword should be an array of JSON Schemas. The data is valid if it matches **exactly one** JSON Schema from this array.

```js
{
  type: "number",
  oneOf: [{maximum: 3}, {type: "integer"}]
}
```

_valid_: `1.5`, `2.5`, `4`, `5`

_invalid_: `2`, `3`, `4.5`, `5.5`

### `anyOf`

The value of the keyword should be an array of JSON Schemas. The data is valid if it is valid according to one or more JSON Schemas in this array.

```js
{
  type: "number",
  anyOf: [{maximum: 3}, {type: "integer"}]
}
```

_valid_: `1.5`, `2`, `2.5`, `3`, `4`, `5`

_invalid_: `4.5`, `5.5`

### `allOf`

The value of the keyword should be an array of JSON Schemas. The data is valid if it is valid according to all JSON Schemas in this array.

_schema_:

```js
{
  type: "number",
  allOf: [{maximum: 3}, {type: "integer"}]
}
```

_valid_: `2`, `3`

_invalid_: `1.5`, `2.5`, `4`, `4.5`, `5`, `5.5`

### `if`/`then`/`else`

These keywords allow to implement conditional validation. Their values should be valid JSON Schemas (object or boolean).

```js
{
  type: "object",
  if: {properties: {foo: {minimum: 10}}},
  then: {required: ["bar"]},
  else: {required: ["baz"]}
}
```

_valid_:

- `{foo: 10, bar: true }`
- `{}`
- `{foo: 1, baz: true }`

_invalid_:

- `{foo: 10}` (`bar` is required)
- `{foo: 10, baz: true }` (`bar` is required)
- `{foo: 1}` (`baz` is required)

```js
{
  type: "integer",
  minimum: 1,
  maximum: 1000,
  if: {minimum: 100},
  then: {multipleOf: 100},
  else: {
    if: {minimum: 10},
    then: {multipleOf: 10}
  }
}
```

_valid_: `1`, `5`, `10`, `20`, `50`, `100`, `200`, `500`, `1000`

_invalid_:

- `-1`, `0` (<1)
- `2000` (>1000)
- `11`, `57`, `123` (any integer with more than one non-zero digit)
- non-integers