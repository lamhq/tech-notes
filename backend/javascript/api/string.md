# String

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
