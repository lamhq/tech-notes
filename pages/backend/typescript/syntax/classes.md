# Classes

## Fields

```ts
class Point {
  x: number;
  y: number;
}

const pt = new Point();
pt.x = 0;
pt.y = 0;
```

Adding `readonly` before a field prevents assignments to the field outside of the constructor:
```ts
class Greeter {
  readonly name: string = "world";

  constructor(otherName?: string) {
    if (otherName !== undefined) {
      this.name = otherName;
    }
  }

  err() {
    // Error: Cannot assign to 'name' because it is a read-only property.
    this.name = "not ok";
  }
}

const g = new Greeter();
// Error: Cannot assign to 'name' because it is a read-only property.
g.name = "also not ok";
```


## Constructors

Constructors can't have return type annotations - the class instance type is always what's returned

Constructors can't have type parameters - these belong on the outer class declaration:
```tsx
class Greeter<T> {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return "Hello, " + this.greeting;
  }
}

const greeter = new Greeter<string>("world");
console.log(greeter.greet()); // Output: "Hello, world"
```

Constructor overloads:
```ts
class Point {
  x: number = 0;
  y: number = 0;
 
  // Constructor overloads
  constructor(x: number, y: number);
  constructor(xy: string);
  constructor(x: string | number, y: number = 0) {
    // Code logic here
  }
}
```

If you have a base class, you'll need to call `super();` in your constructor body before using any `this`:
```tsx
class Base {
  k = 4;
}
 
class Derived extends Base {
  constructor() {
    // 'super' must be called before accessing 'this' in the constructor of a derived class.
    super();
    console.log(this.k);
  }
}
```

The `strictPropertyInitialization` setting controls whether class fields need to be initialized in the constructor:
```ts
class GoodGreeter {
  name: string;
  
  // Not initialized, but no error
  email!: string;

  constructor() {
    this.name = "hello";
  }
}
```


## Parameter Properties

Parameter properties is a special syntax for turning a constructor parameter into a class property with the same name and value.

By prefixing a constructor argument with one of the visibility modifiers `public`, `private`, `protected`, or `readonly`. The resulting field gets those modifier(s):
```ts
class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    // No body necessary
  }
}
const a = new Params(1, 2, 3);
console.log(a.x);
```


## Methods
A function property on a class is called a method.
```ts
class Point {
  x = 10;
  y = 10;
 
  scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}
```


## Getters / Setters

- If `get` exists but no `set`, the property is automatically `readonly`
- If the type of the setter parameter is not specified, it is inferred from the return type of the getter
- Getters and setters must have the same [Member Visibility](#member-visibility)

```ts
class C {
  _length = 0;
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = value;
  }
}
```


## Index Signatures

Classes can declare index signatures; these work the same as Index Signatures for other object types:

```ts
class MyClass {
  [s: string]: boolean | ((s: string) => boolean);

  check(s: string) {
    return this[s] as boolean;
  }
}
```


## Class Heritage

### `implements` Clauses

You can use an `implements` clause to check that a class satisfies a particular `interface`. An error will be issued if a class fails to correctly implement it:

```ts
interface Pingable {
  ping(): void;
}

class Sonar implements Pingable {
  ping() {
    console.log("ping!");
  }
}
```

### `extends` Clauses

```ts
class Base {
  greet() {
    console.log("Hello, world!");
  }
}
 
class Derived extends Base {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}
 
const d = new Derived();
d.greet();
d.greet("reader");
```

### Initialization Order

The order of class initialization, as defined by JavaScript, is:

- The base class fields are initialized
- The base class constructor runs
- The derived class fields are initialized
- The derived class constructor runs

```ts
class Base {
  name = "base";
  constructor() {
    console.log("My name is " + this.name);
  }
}

class Derived extends Base {
  name = "derived";
}

// Prints "base", not "derived"
const d = new Derived();
```

## Member Visibility

### `public`

The default visibility of class members is `public`. A `public` member can be accessed anywhere


### `protected`

`protected` members are only visible to subclasses of the class they're declared in.

Derived classes can make `protected` members `public`

```ts
class Base {
  protected m = 10;
}

class Derived extends Base {
  // No modifier, so default is 'public'
  m = 15;
}

const d = new Derived();
console.log(d.m); // OK
```

### `private`

`private` is like `protected`, but doesn't allow access to the member even from subclasses:

```ts
class Base {
  private x = 0;
}
const b = new Base();
// Can't access from outside the class
console.log(b.x);
```

`private` and `protected` are only enforced during type checking. This means that JavaScript runtime constructs like `in` or simple property lookup can still access a `private` or `protected` member:

```ts
class MySafe {
  private secretKey = 12345;
}

// In a JavaScript file...
const s = new MySafe();
// Will print 12345
console.log(s.secretKey);
```

## Static Members

Static Members aren't associated with a particular instance of the class. They can be accessed through the class constructor object itself

Static members can also use the same `public`, `protected`, and `private` visibility modifiers

Static members are also inherited

Because classes are themselves functions that can be invoked with `new`, certain `static` names can't be used. Function properties like `name`, `length`, and `call` aren't valid to define as `static` member

```ts
class Base {
  static x = 0;

  static printX() {
    console.log(MyClass.x);
  }

  public static getGreeting() {
    return "Hello world";
  }
}

class Derived extends Base {
  myGreeting = Derived.getGreeting();
}

console.log(Derived.x);
Derived.printX();
```


## `this` at runtime

The value of `this` inside a function depends on **how the function was called**.

In this example, because the function was called through the `obj` reference, its value of `this` was `obj` rather than the class instance:
```ts
class MyClass {
  name = "MyClass";
  getName() {
    return this.name;
  }
}

const c = new MyClass();
// Prints "MyClass"
console.log(c.getName());


const obj = {
  name: "obj",
  getName: c.getName,
};
// Prints "obj", not "MyClass"
console.log(obj.getName());
```


If you want to keep the `this` context, you can use an **arrow function** property instead of a method definition:
```ts
class MyClass {
  name = "MyClass";
  getName = () => {
    return this.name;
  };
}

const c = new MyClass();
const g = c.getName;
// Prints "MyClass" instead of crashing
console.log(g());
```

- The `this` value is guaranteed to be correct at runtime
- This will use more memory, because each class instance will have its own copy of each function defined this way
- You can't use `super.getName()` in a derived class, because there's no entry in the prototype chain to fetch the base class method from


## `this` parameters

In a method or function definition, an initial parameter named `this` has special meaning in TypeScript. These parameters are erased during compilation.

TypeScript checks that calling a function with a `this` parameter is done so with a correct context. 

Instead of using an arrow function, we can add a `this` parameter to method definitions to statically enforce that the method is called correctly:

```ts
class MyClass {
  name = "MyClass";
  getName(this: MyClass) {
    return this.name;
  }
}
const c = new MyClass();
// OK
c.getName();

// Error, would crash
const g = c.getName;
console.log(g());
```

- JavaScript callers might still use the class method incorrectly without realizing it
- Only one function per class definition gets allocated, rather than one per class instance
- Base method definitions can still be called via `super`.


## `this`-based type guards

You can use `this is Type` in the return position for methods in classes and interfaces to create a type guard.

This type guard narrows the type of `this` (the instance of the class or interface) to the specified `Type` if the condition holds true.

It allows encapsulating type guard functions as class methods without writing separate functions.

In the example below, `box.value` is still marked as optional after being assigned a value. But in the type guard block, it has a new type:
```ts
class Box<T> {
  value?: T;

  hasValue(): this is { value: T } {
    return this.value !== undefined;
  }
}

const box = new Box<string>();
box.value = "Gameboy";

box.value;
// Box<string>.value?: string

if (box.hasValue()) {
  box.value;
  // value: string
}
```


## Class Expressions

Class expressions allows declaring classes without a name:
```ts
const someClass = class<Type> {
  content: Type;
  constructor(value: Type) {
    this.content = value;
  }
};

const m = new someClass("Hello, world");
```


## `abstract` Classes and Members

The role of abstract classes is to serve as a base class for subclasses which do implement all the abstract members.

When a class doesn't have any abstract members, it is said to be **concrete**.

```ts
abstract class Base {
  abstract getName(): string;

  printName() {
    console.log("Hello, " + this.getName());
  }
}

class Derived extends Base {
  getName() {
    return "world";
  }
}

const d = new Derived();
d.printName();
```

### Construct signature

Sometimes you want to accept some class constructor function that produces an instance of a class. This's how you can do it:

```ts
abstract class Base {
  abstract getName(): string;

  printName() {
    console.log("Hello, " + this.getName());
  }
}

class Derived extends Base {
  getName() {
    return "world";
  }
}

function greet(ctor: new () => Base) {
  const instance = new ctor();
  instance.printName();
}

greet(Derived);
// Error: Cannot assign an abstract constructor type to a non-abstract constructor type
greet(Base);
```


## Relationships Between Classes

In most cases, classes in TypeScript are compared structurally, the same as other types.

```ts
class Point1 {
  x = 0;
  y = 0;
}

class Point2 {
  x = 0;
  y = 0;
}

// OK
const p: Point1 = new Point2();
```