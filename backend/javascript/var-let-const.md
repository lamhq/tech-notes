# Variable declaration

## `let` and `var`

In JavaScript, both `let`, `var` and `const` are used to declare variables. 

The main difference between `let` and `var` is the scope of the variables they declare.

`var` declarations are globally scoped or function scoped, while `let` declarations are block scoped.

This means that a variable declared with `var` is available throughout the entire function it is declared in or globally if it is declared outside of a function. A variable declared with `let`, on the other hand, is only available within the block it is declared in.

For example:

```javascript
function example() {
  var x = 1;
  let y = 2;
  if (true) {
    var x = 3; // same variable as above
    let y = 4; // different variable than above
  }
  console.log(x); // 3
  console.log(y); // 2
}
```

You can re-declare a variable (in the same scope) using `var`.

```js
var a = 5
var a = 6
console.log(a)
// output: 5
```

But you can't re-declare a variable with `let`.

```js
let a = 5
let a = 6
console.log(a)
// error: The symbol "a" has already been declared
```

## hoisting

With `var`, you can access a variable before declaring it, because the `var` statement get hoisted and moved to the top:

```js
console.log(aa)
var aa = 5
console.log(aa)
```

Output:

```
undefined
5
```

Because it's equivalent to:

```js
var aa
console.log(aa)
aa = 5
console.log(aa)
```

Variables declared with `let/const` do not get hoisted, it will throw an error

```
Uncaught ReferenceError: aa is not defined
```


## `let` and `const`

The main difference between the two is that once you bind a value/object to a variable using `const`, you can’t reassign to that variable.

```js
const x = 1;
x = 2; // This will throw an error

let y = 1;
y = 2; // This is allowed
```