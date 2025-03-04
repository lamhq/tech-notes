# Functions

## Function Type

A function type represents the type of a function, including its parameter types and return type.

```ts
type GreetFunction = (a: string) => void;

function greeter(fn: GreetFunction) {
  fn("Hello, World");
}
```


## Call Signatures

Functions can have properties in addition to being callable.

A call signature in TypeScript defines the parameters and return type of a function within an **object type**. It allows you to create objects that can be invoked like functions but also have properties.

```ts
type MyCallableObject = {
  (input: string): string; // Call signature
  description: string;     // Property
};

const myObject: MyCallableObject = (input: string) => {
  return `Hello, ${input}!`;
};

myObject.description = "Greeting Function";

console.log(myObject("World")); // Output: Hello, World!
console.log(myObject.description); // Output: Greeting Function
```


## Construct Signatures

Construct signatures define the shape of a constructor function, specifying the parameters it expects and the type of object it constructs.

They use the `new` keyword in a type declaration to ensure the correct instantiation of classes or objects.

```ts
type SomeConstructor = {
  new (s: string): SomeObject;
};

function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}
```


## Optional Parameters

```ts
function f(x?: number) {
  // ...
}
f(); // OK
f(10); // OK
```

```ts
function f(x = 10) {
  // ...
}
```

### Optional Parameters in Callbacks

In JavaScript, if you call a function with more arguments than there are parameters, the extra arguments are simply ignored.

**When writing a function type for a callback, never write an optional parameter unless you intend to call the function without passing that argument.**

Read more about that [here](https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-parameters-in-callbacks).


## Function Overloads

Some JavaScript functions can be called in a variety of argument counts and types.

In TypeScript, we can specify a function that can be called in different ways by writing overload signatures.

To do this, write some number of function signatures (**overload signature**). Then, we wrote a function implementation with a compatible signature (**implementation signature** can't be called directly).

```ts
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3);
```

## Declaring type for `this`

```ts
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});
```


## Rest Parameters

Rest parameters allow a function to accept an indefinite number of arguments as an array.

A function can have only **one rest parameter**.

The rest parameter **must appear last** in the parameter list.

The type of the rest parameter is an **array type**.

```ts
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
```

When passing an array as rest arguments, you can use the spread operator (`...`) to convert an array into individual arguments

```ts
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
```


## Parameter Destructuring

```ts
type ABC = { a: number; b: number; c: number };

function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}
```
