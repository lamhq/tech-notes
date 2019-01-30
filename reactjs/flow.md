## Installation

```bash
yarn add --dev babel-cli babel-preset-flow
yarn add --dev flow-bin
```

Create a `.babelrc` file at the root of your project 

```
{
  "presets": ["flow"]
}
```

Run Flow

```bash
yarn run flow
```

## Usage

### Initialize Your Project

```bash
flow init
```

### Run the Flow Background Process

```bash
flow status
```

To stop the background process, run `flow stop`.

### Write Flow Code 

```js
// @flow

function foo(x: ?number): string {
  if (x) {
    return x;
  }
  return "default string";
}
```

### Check Your Code

```bash
flow
```

## Type Annotations

```js
// @flow

// Primitive Types
function method(x: number, y: string, z: boolean, a: null, b: void) : string {
  // ...
}

// Maybe types
function acceptsMaybeString(value: ?string) {
  // ...
}

// Optional object properties
function acceptsObject(value: { foo?: string }) {
  // ...
}

// Optional function parameters
function acceptsOptionalString(value?: string) {
  // ...
}

// Function parameters with defaults
function acceptsOptionalString(value: string = "foo") {
  // ...
}

// Mixed Types
function stringifyBasicValue(value: string | number, a: mixed) {
  // ...
}

// Union Types
function getColor(name: "success" | "warning" | "danger") {
  switch (name) {
    case "success" : return "green";
    case "warning" : return "yellow";
    case "danger"  : return "red";
  }
}

// Object Types
var obj1: { foo: boolean } = { foo: true };

// Variable Types
const bar: number = 2;
var barVar: number = 2;
let arr: Array<number> = [1, 2, 3];
let arr: number[] = [0, 1, 2, 3];
let arr1: ?number[] = null;   // Works!

// Function Types
function method(str: string, bool?: boolean, ...nums: Array<number>): void {
  // ...
}

let method = (str: string, bool?: boolean, ...nums: Array<number>): void => {
  // ...
};

function method(...args: Array<number>) {
  // ...
}

// Class Types
class MyClass {
  static constant: number;
  
  prop: number;

  method(value: string): number {
    this.prop = 42;
  }
}

let myInstance: MyClass = new MyClass();
```
