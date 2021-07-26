# Createing Types from Types

## Generic

### Generic Interfaces

```ts
interface Abc<T> {
  a: T;
}

const a : Abc<string> = { a: '123' }
```

### Generic Types

```ts
type Abc<T> = { a: T; }
type Def = Abc<number>;

const a : Abc<string> = { a: '123' }
const b : Def = { a: 111 }
```

### Generic Classes

```ts
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
```


### Generic Constraints

```ts
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}
```

Using Type Parameters in Generic Constraints:

```ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
```

Using Class Types in Generics:

```ts
class BeeKeeper {
  hasMask: boolean = true;
}

class ZooKeeper {
  nametag: string = "Mikle";
}

class Animal {
  numLegs: number = 4;
}

class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
```


## `keyof` operator

The `keyof` operator takes an object type and produces a string or numeric literal union of its keys:

```ts
type Point = { x: number; y: number };
type P = keyof Point;
```


## `typeof` operator

```ts
let s = "hello";
// let n: string
let n: typeof s;
```


## Indexed Access Types

```ts
type Person = { age: number; name: string; alive: boolean };

// type Age = number
type Age = Person["age"]

// type I1 = string | number
type I1 = Person["age" | "name"];

// type I2 = string | number | boolean
type I2 = Person[keyof Person];

// type I3 = string | boolean
type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];
```

### Get the type of an array's elements

```ts
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

type Person = typeof MyArray[number];
// type Person = {
//   name: string;
//   age: number;
// }
```

## Conditional Types

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

### Conditional Type Constraints

```ts
// we want T to have a property called message
type MessageOf<T extends { message: unknown }> = T["message"];

interface Email {
  message: string;
}

// type EmailMessageContents = string
type EmailMessageContents = MessageOf<Email>;
```

```ts
// we wanted MessageOf to take any type, and default to something like never if a message property isn’t available
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

```ts
// flattens array types to their element types
type Flatten<T> = T extends any[] ? T[number] : T;

// Extracts out the element type.
// type Str = string
type Str = Flatten<string[]>;
     
// Leaves the type alone.
// type Num = number
type Num = Flatten<number>;
```


## Distributive Conditional Types

When conditional types act on a generic type, they become distributive **when given a union type**.

```ts
type ToArray<Type> = Type extends any ? Type[] : never;

// type StrArrOrNumArr = string[] | number[]
type StrArrOrNumArr = ToArray<string | number>;
```

To avoid that behavior, you can surround each side of the `extends` keyword with square brackets.

```ts
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

// 'StrOrNumArr' is no longer a union.
// type StrOrNumArr = (string | number)[]
type StrOrNumArr = ToArrayNonDist<string | number>;
```


## Mapped Types

A mapped type is a generic type which iterate through keys of an other type to create a new type:

```ts
type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;
// type FeatureOptions = {
//   darkMode: boolean;
//   newUserProfile: boolean;
// }
```

### Mapping Modifiers

There are two additional modifiers which can be applied during mapping: `readonly` and `?` which affect mutability and optionality respectively.

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
// type UnlockedAccount = {
//   id: string;
//   name: string;
// }
```

```ts
// Removes 'optional' attributes from a type's properties
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};

type User = Concrete<MaybeUser>;
// type User = {
//   id: string;
//   name: string;
//   age: number;
// }
```

### Key Remapping via `as`

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
// type LazyPerson = {
//   getName: () => string;
//   getAge: () => number;
//   getLocation: () => string;
// }
```

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
// type KindlessCircle = {
//   radius: number;
// }
```

## Template Literal Types

When used with concrete literal types, a template literal produces a new string literal type by concatenating the contents:

```ts
type World = "world";

type Greeting = `hello ${World}`;
// type Greeting = "hello world"
```

```ts
type PropEventSource<Type> = {
  on<Key extends string & keyof Type>
    (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void ): void;
};

declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26
});

person.on("firstNameChanged", newName => {
  // (parameter) newName: string
  console.log(`new name is ${newName.toUpperCase()}`);
});

// Error: Argument of type '"firstName"' is not assignable to parameter of type '"firstNameChanged" | "lastNameChanged" | "ageChanged"'.
person.on("firstName", () => {});
```

## Intrinsic String Manipulation Types

To help with string manipulation, TypeScript includes a set of types which can be used:

### `Uppercase<StringType>`

Converts each character in the string to the uppercase version.

```ts
type Greeting = "Hello, world"
type ShoutyGreeting = Uppercase<Greeting>
// type ShoutyGreeting = "HELLO, WORLD"

type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`
type MainID = ASCIICacheKey<"my_app">
// type MainID = "ID-MY_APP"
```

### `Lowercase<StringType>`

### `Capitalize<StringType>`

### `Uncapitalize<StringType>`