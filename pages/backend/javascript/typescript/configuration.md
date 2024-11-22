# Configuration Options

## `strictNullChecks`

By default, TypeScript `null` and `undefined` are assignable to variables of any type:
```ts
let value: string;
value = "Hello, TypeScript!";
value = null; // This is valid
```

When you enable the `strictNullChecks` option, `null` and `undefined` are only assignable to variables where their types includes `null` or `undefined`. This helps prevent runtime errors related to `null` or `undefined` values:
```ts
let value: string | null = null;
value = null; // This is valid
```


## `noImplicitAny`

When this option is enabled, TypeScript will issue an error whenever it encounters a variable or parameter that has an implicit `any` type.

```tsx
// ❌ Parameter 'name' implicitly has an 'any' type
function greet(name) {
  console.log("Hello, " + name);
}
```