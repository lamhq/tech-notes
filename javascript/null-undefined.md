# Null and Undefined

JavaScript (and by extension TypeScript) has two bottom types : `null` and `undefined`. They are *intended* to mean different things:

* Something hasn't been initialized : `undefined`.
* Something is currently unavailable: `null`.


## Checking for either

Recommend `== null` to check for both `undefined` or `null`. You generally don't want to make a distinction between the two.

```ts
function foo(arg: string | null | undefined) {
  if (arg != null) {
    // arg must be a string as `!=` rules out both null and undefined.
  }
}
```

## Checking for root level undefined

To check if a variable is defined or not at a *global* level you normally use `typeof`:

```ts
if (typeof someglobal !== 'undefined') {
  // someglobal is now safe to use
  console.log(someglobal);
}
```


## JSON and serialization

The JSON standard has support for encoding `null` but not `undefined`. When JSON-encoding an object with an attribute that is `null`, the attribute will be included with its null value, whereas an attribute with an `undefined` value will be excluded entirely.

```ts
JSON.stringify({willStay: null, willBeGone: undefined}); // {"willStay":null}
```