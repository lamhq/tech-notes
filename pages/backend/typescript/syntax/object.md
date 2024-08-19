# Object Types

## Declaring type for objects

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

## Optional Properties

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

## `readonly` Properties

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

Index signatures allow you to define object types with dynamic keys.

Keys can be of a specific type, and the corresponding values can be of another type.

It allows you to specify that an object can have properties of a certain type, with keys of a specific type.

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
