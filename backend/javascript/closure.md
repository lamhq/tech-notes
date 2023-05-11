# Closure

## Introduction

A function in JavaScript has access to any variables defined in the outer scope (even when the outer function has finished executing). This feature is called a `closure`.

```ts
function outerFunction(arg) {
  var variableInOuterFunction = arg;

  function bar() {
    console.log(variableInOuterFunction); // Access a variable from the outer scope
  }

  // Call the local function to demonstrate that it has access to arg
  bar();
}

outerFunction("hello closure"); // logs hello closure!
```


### Reason why it's awesome

It allows you to compose objects easily e.g. the revealing module pattern:

```ts
function createCounter() {
  let val = 0;
  return {
    increment() { val++ },
    getVal() { return val }
  }
}

let counter = createCounter();
counter.increment();
console.log(counter.getVal()); // 1
counter.increment();
console.log(counter.getVal()); // 2
```