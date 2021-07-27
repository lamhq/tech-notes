# Everyday Types

## The primitives

Always use `string`, `number`, or `boolean` for types instead of `String`, `Number`, and `Boolean`

## Arrays

To specify the type of an array like `[1, 2, 3]`, you can use the syntax `number[]`

## Type Annotations on Variables

```ts
let myName: string = "Alice";
```

## Type Annotations on Functions

```ts
function greet(name: string): number {
  console.log("Hello, " + name.toUpperCase() + "!!");
  return 26;
}
```

## Object Types

In JavaScript, if you access a property that doesn't exist, you'll get the value `undefined` rather than a runtime error. Because of this, when you read from an optional property, you'll have to check for `undefined` before using it.

```ts
function printName(obj: { first: string; last?: string }) {
  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }

  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase());
}
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

```ts
// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
  // both arrays and strings have a slice method.
  return x.slice(0, 3);
}
```

## Type Aliases

```ts
type ID = number | string;

type Point = {
  x: number;
  y: number;
};

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
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

printCoord({ x: 100, y: 100 });
```

## Differences Between Type Aliases and Interfaces

### Extending

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

### Adding new fields

A type cannot be changed after being created but interfaces can.

```ts
interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}
```

## Type Assertions

```ts
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

// or
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");

const a = (expr as unknown) as T;
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

## `null` and `undefined`

JavaScript has two primitive values used to signal absent or uninitialized value: `null` and `undefined`.

With `strictNullChecks` off, values that might be `null` or `undefined` can still be accessed normally, and the values `null` and `undefined` can be assigned to a property of any type.

With `strictNullChecks` on, when a value is `null` or `undefined`, you will need to test for those values before using methods or properties on that value.

```ts
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```

## Non-null Assertion Operator (Postfix `!`)

Writing `!` after any expression is effectively a type assertion that the value isn't `null` or `undefined`

```ts
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```

## `noImplicitAny`

In some places, TypeScript doesn't try to infer any types for us and instead falls back to the most lenient type: `any`.

Turning on the `noImplicitAny` flag will issue an error on any variables whose type is implicitly inferred as `any`.
