# Operators

## Loose equality operator (`==`)

`==` operator is used to compare two values for equality.

It performs type coercion if the types of the two values are different (it will try to convert one or both of them to an appropriate type before comparing them). 


## Strict equality operator, (`===`)

`===` operator is used to compare two values for equality without performing type coercion.

If the types of the two values are different, the comparison will return `false`.

For example:

```javascript
console.log(5 == '5'); // true
console.log(5 === '5'); // false
```


## Optional Chaining operator (`?.`)

The **optional chaining operator** (`?.`) is used to access a property of an object (or call a function) if it exists, without throwing an error if the object is nullish (null or undefined). 

Use cases:
1. **Property Access**: If the object or property before `?.` is `null` or `undefined`, the expression returns `undefined` instead of throwing an error.
   ```typescript
   let user = { name: "Alice", address: { city: "Wonderland" } };
   let city = user?.address?.city; // "Wonderland"
   let street = user?.address?.street; // undefined
   ```
2. **Array Indexing**: You can use it to safely access elements in an array.
   ```typescript
   let arr = [1, 2, 3];
   let firstElement = arr?.[0]; // 1
   let nonExistentElement = arr?.[10]; // undefined
   ```
3. **Function Calls**: It can also be used to call a function that might not exist.
   ```typescript
   let obj = { greet: () => "Hello" };
   let greeting = obj.greet?.(); // "Hello"
   let farewell = obj.farewell?.(); // undefined
   ```


## Nullish coalescing operator (`??`)

The nullish coalescing operator (`??`) is used to return the right-hand side operand when the left-hand side operand is `null` or `undefined`. Otherwise, it returns the left-hand side operand.

Here's an example:

```javascript
let x = null;
let y = x ?? "default value";
console.log(y); // Output: "default value"
```

In this example, the variable `x` is `null`, so the `??` operator returns the right-hand side operand `"default value"`.

The nullish coalescing operator can be used to provide a default value for a variable that may be `null` or `undefined`.


## Nullish coalescing assignment operator (`??=`)

The nullish coalescing assignment operator (`??=`) is used to assign a value to a variable only if the variable is `null` or `undefined`. 

Here's an example:

```javascript
let x = null;
x ??= "default value";
console.log(x); // Output: "default value"
```

In this example, the variable `x` is `null`, so the `??=` operator assigns the right-hand side operand `"default value"` to `x`.

The nullish coalescing assignment operator can be used to provide a default value for a variable that may be `null` or `undefined`.