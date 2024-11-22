# Advanced Types

## Array Type

```ts
function doSomething(value: Array<string>) {
  // ...
}

let myArray: string[] = ["hello", "world"];
```


`ReadonlyArray` type:

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

We can also destructure tuples using JavaScript's array destructuring:

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

`readonly` Tuple:

```ts
function doSomething(pair: readonly [string, number]) {
  // Cannot assign to '0' because it is a read-only property.
  pair[0] = "hello!";
}
```


## Conditional Types

The below example illustrate how we can define a conditional type base on a variable's type:
```ts
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Email {
  message: string;
}

interface Dog {
  bark(): void;
}

// type EmailMessageContents = string
type EmailMessageContents = MessageOf<Email>;
              
// type DogMessageContents = never
type DogMessageContents = MessageOf<Dog>;
```
- `MessageOf<T>` is a conditional type that takes a generic type parameter `T`. If `T` extends an object with a property named `message` (of any type), it resolves to `T["message"]`. Otherwise, it resolves to `never`.
- `EmailMessageContents` is a type alias that evaluates `MessageOf<Email>`. Since `Email` has a `message` property of type `string`, `EmailMessageContents` is equivalent to `string`.
- `DogMessageContents` is a type alias that evaluates `MessageOf<Dog>`. Since `Dog` does not have a `message` property, `DogMessageContents` resolves to `never`.


Another example:
```ts
interface IdLabel {
  id: number /* some fields */;
}

interface NameLabel {
  name: string /* other fields */;
}

type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}

// let a: NameLabel
let a = createLabel("typescript");

// let b: IdLabel
let b = createLabel(2.8);

// let c: NameLabel | IdLabel
let c = createLabel(Math.random() ? "hello" : 42);
```

- `NameOrId` is a type alias that takes a generic type parameter `T`, which can be either `number` or `string`.
  - If `T` is `number`, it resolves to `IdLabel`.
  - If `T` is `string`, it resolves to `NameLabel`.
- `createLabel` is a generic function that takes a parameter `idOrName` of type `T` (where `T` is either `number` or `string`). It returns an object with type `NameOrId`, which is a conditional type that resolves to ``IdLabel` or `NameLabel`.


## Mapped Types

A mapped type is a generic type, which iterate through keys of an other type to create a new type:

```ts
type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;
/*
type FeatureOptions = {
  darkMode: boolean;
  newUserProfile: boolean;
}
*/
```
- `OptionsFlags<Type>` is a generic type that takes another type (`Type`) as an argument. It creates a new type where each property of `Type` is mapped to a boolean value. In this case, it maps the properties of `FeatureFlags` to boolean values.


### Mapping Modifiers

You can define properties of a mapped type to **read only** or **optional** using mapping modifiers: `readonly`, `?`.

In the example below, we create a new type `UnlockedAccount` from `LockedAccount` without the `readonly` modifier in its properties:
```ts
// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;
/*
type UnlockedAccount = {
  id: string;
  name: string;
}
*/
```


### Remapping Key

In TypeScript 4.1 and onwards, you can re-map keys in mapped types with an `as` clause:

```ts
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>;
/*
type LazyPerson = {
  getName: () => string;
  getAge: () => number;
  getLocation: () => string;
}
*/
```

You can also exclude some properties while mapping:
```ts
// Remove the 'kind' property
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};

interface Circle {
  kind: "circle";
  radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;
/*
type KindlessCircle = {
  radius: number;
}
*/
```


## Template Literal Types

Template literal types allow the creation of new string literal types using the same syntax as template literal strings in JavaScript. They're useful when you want a string value to follow a predefined format or pattern.

Create a union string type from an `Enum`:
```ts
enum Directions {
  North = "North",
  South = "South",
  East = "East",
  West = "West",
}
 
type DirectionString = `${Directions}_DIRECTION`;
// type DirectionString = "North_DIRECTION" | "South_DIRECTION" | "East_DIRECTION" | "West_DIRECTION"
```

Generate allowed CSS class names:
```ts
type ButtonSize = "small" | "medium" | "large";

type ButtonClassNames<T extends ButtonSize> = `button-${T}`;

function getButtonClassName<T extends ButtonSize>(size: T): ButtonClassNames<T> {
  return `button-${size}`;
}

const smallButtonClassName = getButtonClassName("small"); // "button-small"
const mediumButtonClassName = getButtonClassName("medium"); // "button-medium"
const largeButtonClassName = getButtonClassName("large"); // "button-large"
```

Representing CSS values:
```ts
type Unit = "px" | "rem";
type NumericValue = "1" | "2" | "3";
type CSSLength = `${NumericValue}${Unit}`;

const fontSize: CSSLength = "2rem";
```


Enforce the format of date strings:
```ts
type DateFormat = `${number}-${number}-${number}`; // 'YYYY-MM-DD'

const date: DateFormat = "2023-06-27";
```

Dynamically generating keys for an object types:
```ts
type Prefix = "prop";
type Index = "1" | "2" | "3";
type DynamicKey = `${Prefix}${Index}`;
// type DynamicKey = "prop1" | "prop2" | "prop3"

type DynamicProps = {
  [K in DynamicKey]: string;
};
/*
type DynamicProps = {
  prop1: string;
  prop2: string;
  prop3: string;
}
*/
```


## String Manipulation Types

To help with string manipulation, TypeScript includes a set of types which can be used:
- `Uppercase<StringType>`
- `Lowercase<StringType>`
- `Capitalize<StringType>`
- `Uncapitalize<StringType>`

```ts
type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`
type MainID = ASCIICacheKey<"my_app">
// type MainID = "ID-MY_APP"
```
