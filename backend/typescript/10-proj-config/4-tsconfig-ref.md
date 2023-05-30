# TSConfig Reference

## `compilerOptions`

Specify the compiler options required to compile the project.


### `target`

The `target` setting changes which JS features are downleveled and which are left intact. For example, an arrow function `() =>` this will be turned into an equivalent `function` expression if target is ES5 or lower.


### `module`

Sets the module system for the program.

You very likely want "CommonJS" for node projects.

For example, you have a file:

```js
// @filename: index.ts
import { valueOfPi } from "./constants";
 
export const twoPi = valueOfPi * 2;
```

With `module` set to `CommonJS`, it will be transpiled to:

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twoPi = void 0;
const constants_1 = require("./constants");
exports.twoPi = constants_1.valueOfPi * 2;
```

With `module` set to `ESNext`, it will be transpiled to:

```js
import { valueOfPi } from "./constants";
export const twoPi = valueOfPi * 2;
```

The `ESNext` syntax refers to features that are not yet part of the ECMAScript standard but are being considered for inclusion in future versions. These features are often experimental and may change before they are finalized.


### `lib`

TypeScript includes a default set of type definitions for built-in JS APIs (like `Math`), as well as type definitions for things found in browser environments (like `document`).

TypeScript also includes APIs for newer JS features matching the target you specify; for example the definition for `Map` is available if target is `ES6` or newer.

You may want to change these for a few reasons:

- Your program doesn’t run in a browser, so you don’t want the `"dom"` type definitions
- Your runtime platform provides certain JavaScript API objects (maybe through polyfills), but doesn’t yet support the full syntax of a given ECMAScript version
- You have polyfills or native implementations for some, but not all, of a higher level ECMAScript version


### `allowJs`

Allow JavaScript files to be imported inside your project, instead of just `.ts` and `.tsx` files


### `outDir`

If specified, output files will be emitted into this directory. 

If not specified, output files will be emitted in the same directory as the `.ts` files they were generated from.


### `baseUrl`

Sets a base directory from which to resolve non-relative module names. For example, in the directory structure:

```
project
├── ex.ts
├── src
│   └── code.ts
└── tsconfig.json
```

With `"baseUrl": "./src"`, TypeScript will look for files in the `src` folder:

```js
import { helloWorld } from "code";
console.log(helloWorld);
```


### `paths`

A series of entries which re-map imports to lookup locations relative to the `baseUrl` if set, or to the tsconfig file itself otherwise.

For example, you can tell the TypeScript file resolver to support a prefix to find code:
```json
{
  "compilerOptions": {
    "paths": {
      "src/*": ["*"],
    },
  }
}
```

### `rootDir`

Specify the root directory of input files. Default is the directory containing the `tsconfig.json` file.

For example, let’s say you have some input files:

```
MyProj
├── tsconfig.json
├── core
│   ├── a.ts
│   ├── b.ts
│   ├── sub
│   │   ├── c.ts
├── types.d.ts
```

If your `rootDir` is `core/`, and your `outDir` is `dist`, TypeScript would write this tree:

```
MyProj
├── dist
│   ├── a.js
│   ├── b.js
│   ├── sub
│   │   ├── c.js
```

By setting `rootDir: "."`, TypeScript would write this tree:

```
MyProj
├── dist
│   ├── core
│   │   ├── a.js
│   │   ├── b.js
│   │   ├── sub
│   │   │   ├── c.js
```

### `rootDirs`

List of root folders whose combined content represents the structure of the project at runtime. Default: `[]`

`rootDirs` is used to inform the compiler that there are many “virtual” directories acting as a single root. This allows the compiler to resolve relative module imports within these “virtual” directories as if they were merged into one directory.


### `esModuleInterop`

Turn this option to fix issue of default import of CommonJS/AMD/UMD modules.

Enabling `esModuleInterop` will also enable `allowSyntheticDefaultImports`.


### `allowSyntheticDefaultImports`

When set to true, it allows you to write an import like this for modules that do not explicitly specify a **default export**:

```js
import React from "react";
```

instead of:

```js
import * as React from "react";
```


### `moduleResolution`

Specify the module resolution strategy:

- `'node'` for Node.js’ CommonJS implementation
- `'node16'` or `'nodenext'` for Node.js’ ECMAScript Module Support from TypeScript 4.7 onwards

See more at [Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html)



### `noEmit`

Do not emit compiler output files like JavaScript source code, source-maps or declarations.

This makes room for another tool like Babel, or swc to handle converting the TypeScript file to a file which can run inside a JavaScript environment.

You can then use TypeScript as a tool for providing editor integration, and as a source code type-checker.


### `composite`

Referenced projects must have the new composite setting enabled. This setting is needed to ensure TypeScript can quickly determine where to find the outputs of the referenced project.


## `include`

Specify an array of file patterns that are included in the compilation.

These filenames are resolved relative to the directory containing the tsconfig.json file.

include and exclude support wildcard characters to make glob patterns:

- `*` matches zero or more characters (excluding directory separators)
- `?` matches any one character (excluding directory separators)
- `**/` matches any directory nested to any level

If a glob pattern doesn’t include a file extension, then only files with supported extensions are included (e.g. `.ts`, `.tsx`, and `.d.ts` by default, with `.js` and `.jsx` if `allowJs` is set to `true`).

## `exclude`

This property specifies an array of file patterns that are excluded from the compilation.


## `extends`

specifiy a base configuration file to inherit from.


## `references`

Import types and definitions from other projects.

The `path` property of each reference can point to a directory containing a `tsconfig.json` file, or to the config file itself

```json
{
  "references": [
    { "path": "../src" }
  ]
}
```
