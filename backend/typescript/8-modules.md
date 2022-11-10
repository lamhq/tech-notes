# Modules

Modules import one another using a module loader. At runtime the module loader is responsible for locating and executing all dependencies of a module before executing it. Well-known module loaders used in JavaScript are:

- Node.js’s loader for `CommonJS` modules and the 
- `RequireJS` loader for `AMD` modules in Web applications.


## Re-exports

```ts
// Export original validator but rename it
export { ZipCodeValidator as RegExpBasedZipCodeValidator } from "./ZipCodeValidator";

// exports 'StringValidator' interface
export * from "./StringValidator";

// re-exporting another module with a name
export * as utilities from "./utilities";
```

## Import the entire module

Import the entire module into a single variable, and use it to access the module exports

```ts
import * as validator from "./ZipCodeValidator";
let myValidator = new validator.ZipCodeValidator();
```

## Import a module for side-effects only

```ts
import "./my-module.js";
```

## Importing Types

```ts
// Explicitly use import type
import type { APIResponseType } from "./api";
```

## Code Generation for Modules

Depending on the module target specified during compilation, the compiler will generate appropriate code for **Node.js (CommonJS)**, **require.js (AMD)**, **UMD**, **SystemJS**, or **ECMAScript 2015 native modules (ES6)** module-loading systems. 


## Declaring modules

```ts
declare module "url" {
  export interface Url {
    protocol?: string;
    hostname?: string;
    pathname?: string;
  }

  export function parse(
    urlStr: string,
    parseQueryString?,
    slashesDenoteHost?
  ): Url;
}

declare module "path" {
  export function normalize(p: string): string;
  export function join(...paths: any[]): string;
  export var sep: string;
}

/// <reference path="node.d.ts"/>
import * as URL from "url";
let myUrl = URL.parse("http://www.typescriptlang.org");
```

```ts
declare module "*!text" {
  const content: string;
  export default content;
}

// Some do it the other way around.
declare module "json!*" {
  const value: any;
  export default value;
}

import fileContent from "./xyz.txt!text";
import data from "json!http://example.com/data.json";
console.log(data, fileContent);
```