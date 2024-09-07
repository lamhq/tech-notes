# Null and Undefined

JavaScript (and by extension TypeScript) has two bottom types : `null` and `undefined`.

- `undefined`: something hasn't been assigned a value. Variables that have not been assigned a value will have their value is `undefined`
- `null`: intentional absence of value, need to be assigned.


`null` and `undefined` are falsy values.


## Checking for `undefined`

You can check if a variable is undefined in JavaScript using the `typeof` operator::

```ts
if (typeof myVariable === 'undefined') {
  /* Do this if variable is undefined */
  console.log('myVariable is undefined')
}
```

If you use the strict equality operator (`===`) to check if a variable is `undefined`, it will throw an error if the variable is not declared yet:

```js
if (myVariable === undefined) {
  /* Do this if variable is undefined */
}
```

## Checking for `null`

```js
if (myVariable === null) { 
  /* Do this if variable is null */ 
}
```


## JSON and serialization

The JSON standard has support for encoding `null` but not `undefined`.

When JSON-encoding an object with an attribute that is `null`, the attribute will be included with its null value, whereas an attribute with an `undefined` value will be excluded entirely.

```ts
JSON.stringify({willStay: null, willBeGone: undefined}); // {"willStay":null}
```