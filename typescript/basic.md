# Basic

## Types

```ts
// boolean
let isDone: boolean = false;

// number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// string
let fullName: string = `Bob Bobbington`;
let age: number = 37;
// multiline string
let color: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`;
color = 'red';

// array
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];

// tuple
let x: [string, number];
x = ["hello", 10]; // OK

// enum
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];
console.log(colorName); // Displays 'Green' as its value is 2 above

// any
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

// void
function warnUser(): void {
  console.log("This is my warning message");
}

// Null and Undefined
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;

// never
// Function returning never must have unreachable end point
function error(message: string): never {
  throw new Error(message);
}

// object
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error

// Type assertions
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
let strLength: number = (someValue as string).length;
```

## Destructuring

### Array destructuring

```js
let [first, second] = [1, 2];

function f([first, second]: [number, number]) {
  console.log(first);
  console.log(second);
}

let [first, ...rest] = [1, 2, 3, 4];
console.log(first); // outputs 1
console.log(rest); // outputs [ 2, 3, 4 ]

let [first] = [1, 2, 3, 4];
console.log(first); // outputs 1

let [, second, , fourth] = [1, 2, 3, 4];
console.log(second); // outputs 2
console.log(fourth); // outputs 4
```

### Object destructuring

```ts
let { a, b } = { a: "foo", b: 12, c: "bar" };

// property renaming
let { a: newName1, b: newName2 } = o;

// b is optional
function keepWholeObject(wholeObject: { a: string, b?: number }) {
  let { a, b = 1001 } = wholeObject;
}

type C = { a: string, b?: number }
function f({ a, b = 0 }: C): void {
  // ...
}

function f({ a, b = 0 } = { a: "" }): void {
  // ...
}
f({ a: "yes" }); // ok, default b = 0
f(); // ok, default to { a: "" }, which then defaults b = 0
f({}); // error, 'a' is required if you supply an argument
```


## Spread

```ts
let first = [1, 2];
let second = [3, 4];
let bothPlus = [0, ...first, ...second, 5];

let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };
```