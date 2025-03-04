# Modules

## Module files

In TypeScript, any file containing a top-level `import` or `export` is considered a module.

Modules are executed within their own scope, not in the global scope. 


## Non-module files

A file without any top-level `import` or `export` declarations is treated as a script whose contents are available in the global scope 

If you have a file that doesn't currently have any imports or exports, but you want to be treated as a module, add the line:

```ts
export {};
```


## ES Module Syntax

ES Modules (or ES6 modules): `import/export`

### Default export

```ts
// @filename: hello.ts
export default function helloWorld() {
  console.log("Hello, world!");
}

// default import
import hello from "./hello.js";
hello();
```

### Named export

```ts
// @filename: maths.ts
export var pi = 3.14;
export let squareTwo = 1.41;
export const phi = 1.61;

export class RandomNumberGenerator {}

export function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}

// import named export
import { pi, phi, absolute } from "./maths.js";

console.log(pi);
const absPhi = absolute(phi);

// rename when import
import { pi as π } from "./maths.js";
console.log(π);

// take all of the exported objects and put them into a single namespace using `* as name`
import * as math from "./maths.js";
console.log(math.pi);

// import and evaluate a file which could trigger side-effects
import "./maths.js";
```


### Import entire module

Import the entire module into a single variable, and use it to access the module exports

```ts
import * as validator from "./ZipCodeValidator";
let myValidator = new validator.ZipCodeValidator();
```


### Import a module for side-effects only

```ts
import "./my-module.js";
```


### Import types

```ts
export type Cat = { breed: string; yearOfBirth: number };
export type Dog = { breeds: string[]; yearOfBirth: number };
```


### Export types
```ts
import type { Cat, Dog } from "./animal.js";
export type Animals = Cat | Dog;
```

Re-exports:
```ts
// Export original validator but rename it
export { ZipCodeValidator as RegExpBasedZipCodeValidator } from "./ZipCodeValidator";

// exports 'StringValidator' interface
export * from "./StringValidator";

// re-exporting another module with a name
export * as utilities from "./utilities";
```


## CommonJS Syntax

CommonJS: `module.exports =`.

```ts
const { squareTwo } = require("maths");

function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}

module.exports = {
  pi: 3.14,
  squareTwo: 1.41,
  phi: 1.61,
  absolute,
};
```

## Code Generation for Modules

Depending on the module target specified during compilation, the compiler will generate appropriate code for:
- Node.js (CommonJS)
- require.js (AMD)
- UMD
- SystemJS
- ECMAScript 2015 native modules (ES6)
