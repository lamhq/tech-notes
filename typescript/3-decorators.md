# Decorators

Decorators provide a way to add both annotations and a meta-programming syntax for class declarations and members.

Decorators are a stage 2 proposal for JavaScript and are available as an **experimental feature of TypeScript**.

To enable experimental support for decorators, you must enable the **experimentalDecorators** compiler option

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

```ts
function sealed(target) {
  // do something with 'target' ...
}

@sealed
x
```


## Decorator Factories

If we want to customize how a decorator is applied to a declaration, we can write a decorator factory.

```ts
function color(value: string) {
  // this is the decorator factory, it sets up
  // the returned decorator function
  return function (target) {
    // this is the decorator
    // do something with 'target' and 'value'...
  };
}
```

## Decorator Composition

Multiple decorators can be applied to a declaration, single line or multiple lines

```ts
@f
@g
x
```

The following steps are performed when evaluating multiple decorators on a single declaration in TypeScript:

- Decorator Factories are evaluated top-to-bottom to return the real decorators
- Decorator are called bottom-to-top

```ts
function first() {
  console.log("first(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}

function second() {
  console.log("second(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}

class ExampleClass {
  @first()
  @second()
  method() {}
}

// console output:
// first(): factory evaluated
// second(): factory evaluated
// second(): called
// first(): called
```

## Decorator Evaluation Order

Here's the order to how decorators applied to various declarations inside of a class are applied:

1. *Parameter Decorators*, *Method*, *Accessor*, or *Property Decorators* are applied for each **instance member**.
1. *Parameter Decorators*, *Method*, *Accessor*, or *Property Decorators* are applied for each **static member**.
1. *Parameter Decorators* are applied for the **constructor**.
1. *Class Decorators* are applied for the **class**.


## Property Descriptor

A **property descriptor** is an object which describes following attributes of the target property:

- `value`: The value of the property.
- `writable`: Can property be changed?.
- `configurable`: Can property be changed and deleted?.
- `enumerable`: Can property be looped over?.
- `get`: The corresponding getter method of the property. If there's no getter then it is `undefined`.
- `set`: The corresponding setter method of the property. If there's no setter then it is `undefined`.

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
function reportableClassDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    reportingURL = "http://www...";
  };
}

@reportableClassDecorator
class BugReport {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
  }
}

const bug = new BugReport("Needs dark mode");
console.log(bug.title); // Prints "Needs dark mode"
console.log(bug.type); // Prints "report"

// Note that the decorator _does not_ change the TypeScript type
// and so the new property `reportingURL` is not known
// to the type system:
bug.reportingURL;
```


## Method Decorators

Method decorator can be used to observe, modify, or replace a method definition. It will be called at runtime, with the following three arguments:

1. Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
2. The name of the member.
3. The *Property Descriptor* for the member.

If the method decorator returns a value, it will be used as the *Property Descriptor* for the method.

```ts
function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  greet() {
    return "Hello, " + this.greeting;
  }
}
```


## Accessor Decorators

The accessor decorator is applied to the *Property Descriptor* for the accessor and can be used to observe, modify, or replace an accessor's definitions.

TypeScript disallows decorating both the `get` and `set` accessor for a single member. This is because decorators apply to a *Property Descriptor*, which combines both the `get` and `set` accessor, not each declaration separately.

Accessor decorator will be called as a function at runtime, with the following three arguments:

1. Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
1. The name of the member.
1. The *Property Descriptor* for the member.

If the accessor decorator returns a value, it will be used as the *Property Descriptor* for the member

```ts
function configurable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value;
  };
}

class Point {
  private _x: number;
  private _y: number;
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  @configurable(false)
  get x() {
    return this._x;
  }

  @configurable(false)
  get y() {
    return this._y;
  }
}
```


## Property Decorators

A Property Decorator is declared just before a property declaration.

The expression for the property decorator will be called as a function at runtime, with the following two arguments:

1. Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
1. The name of the member.

A property decorator can only be used to observe that a property of a specific name has been declared for a class.

```ts
class Greeter {
  @format("Hello, %s")
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    let formatString = getFormat(this, "greeting");
    return formatString.replace("%s", this.greeting);
  }
}
```

```ts
import "reflect-metadata";

const formatMetadataKey = Symbol("format");

function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
```

## Parameter Decorators

The parameter decorator is applied to the function for a class constructor or method declaration.

The expression for the parameter decorator will be called as a function at runtime, with the following three arguments:

1. Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
1. The name of the member.
1. The ordinal index of the parameter in the function's parameter list.

A parameter decorator can only be used to observe that a parameter has been declared on a method.

```ts
class BugReport {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
  }

  @validate
  print(@required verbose: boolean) {
    if (verbose) {
      return `type: ${this.type}\ntitle: ${this.title}`;
    } else {
     return this.title; 
    }
  }
}
```

```ts
import "reflect-metadata";
const requiredMetadataKey = Symbol("required");

function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata( requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
  let method = descriptor.value!;

  descriptor.value = function () {
    let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
    if (requiredParameters) {
      for (let parameterIndex of requiredParameters) {
        if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
          throw new Error("Missing required argument.");
        }
      }
    }
    return method.apply(this, arguments);
  };
}
```

## Metadata

Some examples use the reflect-metadata library which adds a polyfill for an [experimental metadata API](https://github.com/rbuckton/ReflectDecorators).

TypeScript includes experimental support for emitting certain types of metadata for declarations that have decorators. To enable this experimental support, you must set the `emitDecoratorMetadata` compiler option either on the command line or in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```