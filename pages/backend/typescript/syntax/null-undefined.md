# `null` and `undefined`

## `undefined`

`undefined` represents a variable that has been declared but not yet assigned a value.

Common scenarios where `undefined` is used:

1. **Variable Declaration**: When a variable is declared but not initialized.
   ```javascript
   let x;
   console.log(x); // undefined
   ```
2. **Optional Function Parameters**: When a function is called with fewer arguments than it is declared to accept, the missing parameters are `undefined`.
   ```javascript
   function greet(name?: string) {
       console.log(name); // undefined if no argument is passed
   }
   greet();
   ```
3. **Function Return Value**: If a function does not explicitly return a value, it returns `undefined` by default.
   ```javascript
   function doNothing() {}
   console.log(doNothing()); // undefined
   ```
4. **Optional/Non-existent Object Properties**: Accessing a non-existent property of an object returns `undefined`. 
    
    Because of this, before reading from an optional property, you'll have to check for `undefined` or use **optional chaining operator**.
    ```javascript
    let obj: { name?: string } = {};
    console.log(obj.name); // undefined

    if (obj.name !== undefined) {
      console.log(obj.name.toUpperCase());
    }

    // A safe alternative using modern JavaScript syntax:
    console.log(obj.name?.toUpperCase());
    ```
5. **Array Elements**: Accessing an array element that has not been assigned a value returns `undefined`.
   ```javascript
   let arr = [1, 2];
   console.log(arr[5]); // undefined
   ```



## `null`

`null` represents the intentional absence of any object value.

Common scenarios where `null` is used:

1. **Variable Initialization**: explicitly indicating that a variable is meant to hold an object but hasn't been assigned one yet.
   ```javascript
   let user = null;
   ```
2. **Function Returns**: When a function is expected to return an object but doesn't find a suitable result.
   ```javascript
   function findUser(id) {
       // If user is not found, return null
       return null;
   }
   ```
3. **Resetting Values**: When you need to clear an object reference.
   ```javascript
   user = null;
   ```
4. **APIs and DOM Methods**: Many APIs and DOM methods return `null` when they don't find the expected object.
   ```javascript
   let element = document.getElementById('nonexistent'); // returns null
   ```


## Non-null Assertion operator `!`

Writing `!` after any expression is effectively a type assertion that the value isn't `null` or `undefined`

```ts
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```


## Optional Chaining operator `?.`

The **optional chaining** operator `?.` allows you to safely access deeply nested properties of an object without having to explicitly check for `null` or `undefined` at each level.

It helps to write cleaner and more readable code.

1. **Property Access**: If the object or property before `?.` is `null` or `undefined`, the expression short-circuits and returns `undefined` instead of throwing an error.
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
