# Null and Undefined

`null` and `undefined` are falsy values.

## `undefined`

`undefined` represents a variable that has been declared but not yet assigned a value.

### Scenarios

`undefined` is returned when:
1. A variable is declared but not initialized.
   ```javascript
   let x;
   console.log(x); // undefined
   ```
2. A function is called with fewer arguments than it is declared to accept, the missing parameters are `undefined`.
   ```javascript
   function greet(name?: string) {
       console.log(name); // undefined if no argument is passed
   }
   greet();
   ```
3. A function does not explicitly return a value, it returns `undefined` by default.
   ```javascript
   function doNothing() {}
   console.log(doNothing()); // undefined
   ```
4. Accessing a non-existent property of an object returns `undefined`. 

    Before reading from an optional property, you'll have to check for `undefined` or use **optional chaining operator**.
    ```javascript
    let obj: { name?: string } = {};
    console.log(obj.name); // undefined

    if (typeof obj.name !== 'undefined') {
      console.log(obj.name.toUpperCase());
    }

    // A safe alternative using modern JavaScript syntax:
    console.log(obj.name?.toUpperCase());
    ```
5. Accessing an array element that has not been assigned a value returns `undefined`.
   ```javascript
   let arr = [1, 2];
   console.log(arr[5]); // undefined
   ```


### Checking for `undefined`

You can check if a variable is un`defined` using the `typeof` operator:

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


## `null`

`null` represents the intentional absence of any object value.

### Scenarios

`null` is used when:

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

### Checking for `null`

```js
if (myVariable === null) { 
  /* Do this if variable is null */ 
}
```


## Optional Chaining operator `?.`

The optional chaining operator (`?.`) allows you to safely access deeply nested properties of an object without having to explicitly check for `null` or `undefined` at each level.

It helps to write cleaner and more readable code.

See [Optional Chaining operator](../syntax/operators.md#optional-chaining-operator-)


## JSON and serialization

The JSON standard has support for encoding `null` but not `undefined`.

When JSON-encoding an object with an attribute that is `null`, the attribute will be included with its `null` value, whereas an attribute with an `undefined` value will be excluded entirely.

```ts
JSON.stringify({willStay: null, willBeGone: undefined}); // {"willStay":null}
```