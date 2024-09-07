# Operators

## `==`

`==` operator is used to compare two values for equality.

It performs type coercion if the types of the two values are different (it will try to convert one or both of them to an appropriate type before comparing them). 


## `===`

`===` operator is used to compare two values for equality without performing type coercion.

If the types of the two values are different, the comparison will return `false`.

For example:

```javascript
console.log(5 == '5'); // true
console.log(5 === '5'); // false
```


## `?.`

The **optional chaining operator** (`?.`) is used to access a property of an object (or call a function) if it exists, without throwing an error if the object is nullish (null or undefined). 

Here's an example: 

```javascript
let user = {
  name: "John",
  age: 30,
  address: {
    street: "123 Main St.",
    city: "Seattle",
    state: "WA"
  }
};

let city = user?.address?.city;
console.log(city); // Output: Seattle
```

In this example, the `user` object has an `address` property, which in turn has a `city` property. The `?.` operator is used to access the `city` property without throwing an error if either the `user` or `address` object is nullish.

If either the `user` or `address` object was nullish, the value of `city` would be `undefined`.


## `??`

The nullish coalescing operator (`??`) is used to return the right-hand side operand when the left-hand side operand is `null` or `undefined`. Otherwise, it returns the left-hand side operand.

Here's an example:

```javascript
let x = null;
let y = x ?? "default value";
console.log(y); // Output: "default value"
```

In this example, the variable `x` is `null`, so the `??` operator returns the right-hand side operand `"default value"`.

The nullish coalescing operator can be used to provide a default value for a variable that may be `null` or `undefined`.


## `??=`

The nullish coalescing assignment operator (`??=`) is used to assign a value to a variable only if the variable is `null` or `undefined`. 

Here's an example:

```javascript
let x = null;
x ??= "default value";
console.log(x); // Output: "default value"
```

In this example, the variable `x` is `null`, so the `??=` operator assigns the right-hand side operand `"default value"` to `x`.

The nullish coalescing assignment operator can be used to provide a default value for a variable that may be `null` or `undefined`.