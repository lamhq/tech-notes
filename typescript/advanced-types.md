# Advanced Types

## Intersection Types

That means an object of intersection type will have all members of all sub types.

```ts
function extend<First, Second>(first: First, second: Second): First & Second {
  const result: Partial<First & Second> = {};
  for (const prop in first) {
    if (first.hasOwnProperty(prop)) {
      (result as First)[prop] = first[prop];
    }
  }
  for (const prop in second) {
    if (second.hasOwnProperty(prop)) {
      (result as Second)[prop] = second[prop];
    }
  }
  return result as First & Second;
}

class Person {
  constructor(public name: string) { }
}

interface Loggable {
  log(name: string): void;
}

class ConsoleLogger implements Loggable {
  log(name) {
    console.log(`Hello, I'm ${name}.`);
  }
}

const jim = extend(new Person('Jim'), ConsoleLogger.prototype);
jim.log(jim.name);
```


## Union Types

A union type describes a value that can be one of several types.

If we have a value that has a union type, we can only access members that are common to all types in the union.

```ts
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: string | number) {
  // ...
}

let indentedString = padLeft("Hello world", 'a');
let indentedString = padLeft("Hello world", 4);
```


## Type Aliases

```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === "string") {
    return n;
  }
  else {
    return n();
  }
}
```

```ts
type Tree<T> = {
  value: T;
  left: Tree<T>;
  right: Tree<T>;
}
```

You should always use an interface over a type alias if possible.

On the other hand, if you can’t express some shape with an interface and you need to use a union or tuple type, type aliases are usually the way to go


## Discriminated Union

```ts
interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape = Square | Rectangle;

function area(s: Shape) {
  if (s.kind === "square") {
    // Now TypeScript *knows* that `s` must be a square ;)
    // So you can use its members safely :)
    return s.size * s.size;
  }
  else {
    // Wasn't a square? So TypeScript will figure out that it must be a Rectangle ;)
    // So you can use its members safely :)
    return s.width * s.height;
  }
}

function area(s: Shape) {
  switch (s.kind) {
    case "square": return s.size * s.size;
    case "rectangle": return s.width * s.height;
    case "circle": return Math.PI * s.radius * s.radius;
    default:
      const _exhaustiveCheck: never = s;
      return _exhaustiveCheck;
  }
}
```

```ts
type DTO =
| {
  version: undefined, // version 0
  name: string,
 }
| {
  version: 1,
  firstName: string,
  lastName: string,
}
// Even later
| {
  version: 2,
  firstName: string,
  middleName: string,
  lastName: string,
}

function printDTO(dto:DTO) {
  if (dto.version == null) {
    console.log(dto.name);
  } else if (dto.version == 1) {
    console.log(dto.firstName,dto.lastName);
  } else if (dto.version == 2) {
    console.log(dto.firstName, dto.middleName, dto.lastName);
  } else {
    const _exhaustiveCheck: never = dto;
  }
}
```

## Non-Null Assertion Operator

```ts
// Compiled with --strictNullChecks
function validateEntity(e?: Entity) {
  // Throw exception if e is null or invalid entity
}

function processEntity(e?: Entity) {
  validateEntity(e);
  let a = e.name;  // TS ERROR: e may be null.
  let b = e!.name;  // OKAY. We are asserting that e is non-null.
}
```

Note that it is just an assertion, and just like type assertions you are responsible for making sure the value is not null. A non-null assertion is essentially you telling the compiler "I know it's not null so let me use it as though it's not null".


## Definite Assignment Assertion Operator

TypeScript will also complain about properties in classes not being initialized. You can use the definite assignment assertion postfixed to the property name to tell TypeScript that you are initializing it somewhere other than the constructor e.g.

```ts
class C {
  foo!: number;
  // ^
  // Notice this exclamation point!
  // This is the "definite assignment assertion" modifier.

  constructor() {
    this.initialize();
  }
  initialize() {
    this.foo = 0;
  }
}
```

```ts
let a: number[]; // No assertion
let b!: number[]; // Assert

initialize();

a.push(4); // TS ERROR: variable used before assignment
b.push(4); // OKAY: because of the assertion

function initialize() {
  a = [0, 1, 2, 3];
  b = [0, 1, 2, 3];
}
```


## Type Guards

Check for a type of a variable at runtime.

```ts
interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}

function getSmallPet(): Fish | Bird {
  // ...
}

let pet = getSmallPet();

// Each of these property accesses will cause an error
if (pet.swim) {
  pet.swim();
}
else if (pet.fly) {
  pet.fly();
}
```

### Using type assertion

```ts
let pet = getSmallPet();

if ((pet as Fish).swim) {
  (pet as Fish).swim();
} else if ((pet as Bird).fly) {
  (pet as Bird).fly();
}

// Assert a property is non-null, when accessing it
element.parentNode!.removeChild(element) // ! before the period
myFunction(document.getElementById(dialog.id!)! // ! after the property accessing
let userID!: string // definite assignment assertion... be careful!
```


### Using type predicates

```ts
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

if (isFish(pet)) {
  pet.swim();
}
else {
  pet.fly();
}
```

### Using the `in` operator

```ts
function move(pet: Fish | Bird) {
  if ("swim" in pet) {
    return pet.swim();
  }
  return pet.fly();
}
```

### `typeof` type guards

```ts
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
```

### `instanceof` type guards

```ts
interface Padder {
  getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) { }
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder {
  constructor(private value: string) { }
  getPaddingString() {
    return this.value;
  }
}

function getRandomPadder() {
  return Math.random() < 0.5 ?
    new SpaceRepeatingPadder(4) :
    new StringPadder("  ");
}

// Type is 'SpaceRepeatingPadder | StringPadder'
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
  padder; // type narrowed to 'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
  padder; // type narrowed to 'StringPadder'
}
```

## Function

```ts
type LongHand = {
  (a: number): number;
};

type ShortHand = (a: number) => number;
```

### Function Overload

```ts
function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x): any {
  // implementation with combined signature
  // ...
}
```

However, if you don't have an implementation, remember, functions are just callable objects with no key:

```ts
type pickCard = {
  (x: { suit: string; card: number }[]): number;
  (x: number): { suit: string; card: number };
  // no need for combined signature in this form
  // you can also type static properties of functions here eg `pickCard.wasCalled`
};
```


## Callable

```ts
interface Complex {
  (foo: string, bar?: number, ...others: boolean[]): number;
}
```

An interface can provide multiple callable annotations to specify function overloading:

```ts
interface Overloaded {
  (foo: string): string
  (foo: number): number
}

// example implementation
function stringOrNumber(foo: number): number;
function stringOrNumber(foo: string): string;
function stringOrNumber(foo: any): any {
  if (typeof foo === 'number') {
    return foo * foo;
  } else if (typeof foo === 'string') {
    return `hello ${foo}`;
  }
}

const overloaded: Overloaded = stringOrNumber;

// example usage
const str = overloaded(''); // type of `str` is inferred as `string`
const num = overloaded(123); // type of `num` is inferred as `number`
```


## Newable

```ts
interface CallMeWithNewToGetString {
  new(): string
}
// Usage
declare const Foo: CallMeWithNewToGetString;
const bar = new Foo(); // bar is inferred to be of type string
```


## Inferred Types

```ts
const [state, setState] = React.useState({
  foo: 1,
  bar: 2,
}); // state's type inferred to be {foo: number, bar: number}

const someMethod = (obj: typeof state) => {
  // grabbing the type of state even though it was inferred
  // some code using obj
  setState(obj); // this works
};
```


## Partial Types

```ts
const [state, setState] = React.useState({
  foo: 1,
  bar: 2,
}); // state's type inferred to be {foo: number, bar: number}

// NOTE: stale state merging is not actually encouraged in React.useState
// we are just demonstrating how to use Partial here
const partialStateUpdate = (obj: Partial<typeof state>) =>
  setState({ ...state, ...obj });

// later on...
partialStateUpdate({ foo: 2 }); // this works
```