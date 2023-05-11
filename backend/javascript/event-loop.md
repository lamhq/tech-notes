# Event loop

## Introduction

The event loop is a **queue of callback functions**. When an async function executes, the callback function is pushed into the queue. The JavaScript engine doesn't start processing the event loop until the code after an async function has executed. 

The event loop is the system that JavaScript uses in the browser to handle the execution of multiple pieces of code. It consists of the Call Stack, Web APIs, and the Callback Queue. It is responsible for giving JavaScript its asynchronous programming ability.

It waits for tasks, executes them starting with the oldest one, and sleeps until a new task appears. It monitors both the **callback queue and the call stack**, and places the next function from the queue to the stack when the stack is empty. 


## Example

Here is an example of how the event loop works:

```javascript
console.log('Hi');

setTimeout(function cb1() {
  console.log('cb1');
}, 5000);

console.log('Bye');
```

The output of this code will be:

```
Hi
Bye
cb1
```

This is because the `console.log('Hi')` and `console.log('Bye')` statements are executed first, before the `console.log('cb1');`

The `setTimeout()` function is called with a callback function `cb1()`. The callback function is added to the callback queue after 5 seconds.

The event loop then waits for the call stack to be empty before executing the callback function. Since there are no other functions in the call stack, the callback function is executed and logs `'cb1'` to the console.
