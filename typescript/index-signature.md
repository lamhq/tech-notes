# Index Signature

## Using a limited set of string literals

```ts
type Index = 'a' | 'b' | 'c'
type FromIndex = { [k in Index]?: number }

const good: FromIndex = {b:1, c:2}

// Error:
// Type '{ b: number; c: number; d: number; }' is not assignable to type 'FromIndex'.
// Object literal may only specify known properties, and 'd' does not exist in type 'FromIndex'.
const bad: FromIndex = {b:1, c:2, d:3};
```

```ts
type FromSomeIndex<K extends string> = { [key in K]: number }
```