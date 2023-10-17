# String

## Raw string

In this example, the `String.raw()` method returns the raw string form of the template literal, which is `"Hello\\nWorld"`. The escape sequence `\\n` is not processed and is returned as is.

```tsx
const str = String.raw`Hello\nWorld`;
console.log(str); // Output: "Hello\\nWorld"
```

## Format a number with leading zeros

```ts
let num = 5;
let str = num.toString().padStart(3, '0');
console.log(str); // "005"
```

## Replace all occurences within a string

```tsx
let str = 'Hello World';
let newStr = str.replaceAll('l', 'x');
console.log(newStr); // "Hexxo Worxd"
```
