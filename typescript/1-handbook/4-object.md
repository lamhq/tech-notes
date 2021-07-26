# Object Types

```ts
interface Person {
  name: string;
  age: number;
}

type Person = {
  name: string;
  age: number;
};

function greet(person: Person) {
  return "Hello " + person.name;
}
```

## Property Modifiers

### Optional Properties

```ts
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

// setting default values using destructuring pattern
function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log("x coordinate at", xPos);
                                  
  console.log("y coordinate at", yPos);
  // ...
}
```

### `readonly` Properties

```ts
interface Home {
  readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
  // We can read and update properties from 'home.resident'.
  console.log(`Happy birthday ${home.resident.name}!`);
  home.resident.age++;
}

function evict(home: Home) {
  // But we can't write to the 'resident' property itself on a 'Home'.
  // Error: Cannot assign to 'resident' because it is a read-only property.
  home.resident = {
    name: "Victor the Evictor",
    age: 42,
  };
}
```

## Index Signatures

```ts
interface StringArray {
  [index: number]: string;
}

interface ReadonlyStringArray {
  readonly [index: number]: string;
}
```

Index signatures also enforce that all properties match their return type:

```ts
interface NumberDictionary {
  [index: string]: number;

  length: number; // ok
  
  // Error: Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
  name: string;
}
```


## Extending Types

```ts
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};
```

## Intersection Types

```ts
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;
```


## Generic Object Types

### interface

```ts
interface Box<Type> {
  contents: Type;
}
```

### type alias

```ts
type Box<Type> = {
  contents: Type;
};
```


## The `Array` Type

```ts
function doSomething(value: Array<string>) {
  // ...
}

let myArray: string[] = ["hello", "world"];
```


## The `ReadonlyArray` Type

```ts
function doStuff(values: ReadonlyArray<string>) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);

  // ...but we can't mutate 'values'.
  // Error: Property 'push' does not exist on type 'readonly string[]'.
  values.push("hello!");
}

const roArray: ReadonlyArray<string> = ["red", "green", "blue"];
let x: readonly string[] = ["red", "green", "blue"];
```


## Tuple Types

A tuple type is another sort of `Array` type that knows exactly how many elements it contains, and exactly which types it contains at specific positions.

```ts
type StringNumberPair = [string, number];
type Either2dOr3d = [number, number, number?];
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];
```

We can also destructure tuples using JavaScript’s array destructuring:

```ts
function doSomething(stringHash: [string, number]) {
  const [inputString, hash] = stringHash;
  console.log(inputString);
  console.log(hash);
}
```

```ts
function readButtonInput(...args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args;
  // ...
}

// is basically equivalent to:
function readButtonInput(name: string, version: number, ...input: boolean[]) {
  // ...
}
```

### `readonly` Tuple

```ts
function doSomething(pair: readonly [string, number]) {
  // Cannot assign to '0' because it is a read-only property.
  pair[0] = "hello!";
}
```
