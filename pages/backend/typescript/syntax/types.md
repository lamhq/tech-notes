# Types

## Primitives

- `string`, `number`, or `boolean`
- Arrays: `string[]`, `number[]`
- `null`, `undefined`


## Type Annotations

Type annotations are a way to explicitly specify the types of variables, function parameters, return values, and object properties.

This helps catch errors early and makes the code more readable and maintainable.

```ts
let numbers: number[] = [1, 2, 3];
let myName: string = "Alice";
let employee: { id: number; name: string; } = { id: 100, name: "John" };

function greet(name: string): number {
  console.log("Hello, " + name.toUpperCase() + "!!");
  return 26;
}
```


## Literal Types

Literal types are types that only accepted one possible value

```ts
let x: "hello" = "hello";
// OK
x = "hello";

// Type '"howdy"' is not assignable to type '"hello"'.
x = "howdy";
```


## Union Types

```ts
function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
```


## Type Aliases

```ts
type Point = {
  x: number;
  y: number;
};

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
```

### Extending a Type
```ts
type Animal = {
  name: string
}

type Bear = Animal & { 
  honey: boolean 
}

const bear = getBear();
bear.name;
bear.honey;
```


## Interfaces

```ts
interface Point {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
```

### Extending an Interface

```ts
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const bear = getBear() 
bear.name
bear.honey
```

### Merging Interfaces

You can add new fields to interfaces after creation.

```ts
interface User {
  name: string;
}

interface User {
  age: number;
}

const user: User = {
  name: "John",
  age: 34,
}
```


## Types or Interfaces?

You should always use Types until you need to use features from Interfaces.

Interfaces have less features than Types:

1. Interfaces can only be used to define type for an object:
    ```ts
    interface AType = string | number; // this's impossible ❌

    type AType = string | number; // this works ✅
    ```
2. Interfaces don't support declaring a union of multiple different types:
    ```ts
    interface OrType = { name: string} | { age: number }; // this's impossible ❌

    type OrType = { name: string} | { age: number }; // this works ✅
    ```

The only main benefit to using interfaces is [merging multiple interfaces](#merging-interfaces) (but it introduces more issues than helping).


## Type Assertions

```ts
const myCanvas = document.getElementById("main_canvas") 
  as HTMLCanvasElement;
// or
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");

const a = (expr as unknown) as T;
```
