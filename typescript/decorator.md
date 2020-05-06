# Decorators

## Enable decorator

**tsconfig.json**:

```json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```


## Decorator

A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter.


## Decorator Factories

A Decorator Factory is simply a function that returns the expression that will be called by the decorator at runtime.

```ts
function color(value: string) { // this is the decorator factory
  return function (target) { // this is the decorator
    // do something with 'target' and 'value'...
  }
}
```


## Property Descriptor

A **property descriptor** is an object which describes following attributes of the target property:

- value: The value of the property.
- writable: Can property be changed?.
- configurable: Can property be changed and deleted?.
- enumerable: Can property be looped over?.
- get: The corresponding getter method of the property. If there's no getter then it is `undefined`.
- set: The corresponding setter method of the property. If there's no setter then it is `undefined`.

```ts
const person = { name: 'Joe' };
let propertyDescriptor = Object.getOwnPropertyDescriptor(person, 'name');
console.log(propertyDescriptor);
// {"value":"Joe","writable":true,"enumerable":true,"configurable":true}
```


## Class Decorators

The class decorator can be used to observe, modify, or replace a class definition.

Class decorator will be called as at runtime, its only argument is the constructor of the decorated class.

If the class decorator returns a value, it will replace the class declaration with the provided constructor function.

```ts
function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
  return class extends constructor {
    newProperty = "new property";
    hello = "override";
  }
}

@classDecorator
class Greeter {
  property = "property";
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
}

console.log(new Greeter("world"));
```


## Method Decorators

Method decorator can be used to observe, modify, or replace a method definition. It will be called at runtime, with the following three arguments:

1. Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
2. The name of the member.
3. The *Property Descriptor* for the member.

If the method decorator returns a value, it will be used as the *Property Descriptor* for the method.

```ts
function f() {
  console.log("f(): evaluated");
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("f(): called");
  }
}

function g() {
  console.log("g(): evaluated");
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("g(): called");
  }
}

class C {
  @f()
  @g()
  method() {
    console.log("method(): called");
  }
}
```