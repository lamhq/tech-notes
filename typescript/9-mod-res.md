# Module Resolution

Module resolution is the process the compiler uses to figure out what an import refers to.


## Relative vs. Non-relative module imports

Module imports are resolved differently based on whether the module reference is relative or non-relative.

A relative import is one that starts with `/`, `./` or `../`:

```ts
import Entry from "./components/Entry";
import { DefaultHeaders } from "../constants/http";
import "/mod"
```

Any other import is considered **non-relative**:

```ts
import * as $ from "jquery";
import { Component } from "@angular/core";
```

A relative import is resolved relative to the importing file and cannot resolve to an ambient module declaration

A non-relative import can be resolved relative to baseUrl, or through path mapping, they can also resolve to ambient module declarations.


## Module Resolution Strategies

There are two possible module resolution strategies: Node and Classic

- Node for `--module commonjs`
- Classic for otherwise (when `--module` is set to `amd`, `system`, `umd`, `es2015`, `esnext`, etc).

### Classic

Nowadays, this strategy is mainly present for backward compatibility.

**For relative import**, module will be resolved **relative to the importing file**.

`import { b } from "./moduleB"` in source file `/root/src/folder/A.ts` would result in the following lookups:

1. `/root/src/folder/moduleB.ts`
2. `/root/src/folder/moduleB.d.ts`

**For non-relative import**, the compiler **walks up the directory tree** starting with the directory containing the importing file, trying to locate a matching definition file.

`import { b } from "moduleB"`, in a source file `/root/src/folder/A.ts`, would result in attempting the following locations for locating `"moduleB"`:

1. The file in the same level. `/root/src/folder/moduleB.ts`, `/root/src/folder/moduleB.d.ts`
1. The file in the upper level. `/root/src/moduleB.ts`, `/root/src/moduleB.d.ts`
1. Jump up the directory tree until it find the module.

### Node

#### How Node.js resolves modules

For relative paths, 

`var x = require("./moduleB");` in a source file `/root/src/moduleA.js` will be resolved in the following order:

1. The file with the same module name, in the same level as the current file. `/root/src/moduleB.js`.
1. The directory with the same module name, in the same level as the current file, that contain a file named `package.json` that specifies a `"main"` module. `/root/src/moduleB/package.json`
1. The directory with the same module name, in the same level as the current file, that contain a file named `index.js`.

For non-relative paths, Node will look for your modules in special folders named `node_modules`. This folder can be on the same level as the current file, or higher up in the directory chain, until it finds the module you tried to load.

Node.js look for a file name, then an applicable `package.json`, and then for an `index.js`.

`var x = require("moduleB");` in a source file `/root/src/moduleA.js` will be resolved in the following order:

1. `/root/src/node_modules/moduleB.js`
1. `/root/src/node_modules/moduleB/package.json` (if it specifies a `"main"` property)
1. `/root/src/node_modules/moduleB/index.js`
1. (jump up) `/root/node_modules/moduleB.js`


#### How TypeScript resolves modules

TypeScript will mimic the Node.js run-time resolution strategy. TypeScript will also use a field in `package.json` named `"types"` to mirror the purpose of `"main"`.

A non-relative import statement like `import { b } from "./moduleB"` in `/root/src/moduleA.ts` would result in attempting the following locations for locating `"./moduleB"`:

1. `/root/src/node_modules/moduleB.ts`
1. `/root/src/node_modules/moduleB.tsx`
1. `/root/src/node_modules/moduleB.d.ts`
1. `/root/src/node_modules/moduleB/package.json` (if it specifies a `"types"` property)
1. `/root/src/node_modules/@types/moduleB.d.ts`
1. `/root/src/node_modules/moduleB/index.ts`
1. `/root/src/node_modules/moduleB/index.tsx`
1. `/root/src/node_modules/moduleB/index.d.ts`
1. (jump up) `/root/node_modules/moduleB.ts`


## Base URL

All module imports with non-relative names are assumed to be relative to the `baseUrl`.

Value of baseUrl is determined as either command line argument or property in `tsconfig.json`


## Path mapping

Sometimes modules are not directly located under *baseUrl*.

Please notice that `"paths"` are resolved relative to `"baseUrl"`.

```json
{
  "compilerOptions": {
    "baseUrl": ".", // This must be specified if "paths" is.
    "paths": {
      // These mappings are relative to "baseUrl"
      "jquery": ["node_modules/jquery/dist/jquery"],
      "*": ["*", "generated/*"]
    }
  }
}
```

- `"*"`: meaning the same name unchanged, so map `<moduleName>` => `<baseUrl>/<moduleName>`
- `"generated/*"`: meaning the module name with an appended prefix `"generated"`, so map `<moduleName>` => `<baseUrl>/generated/<moduleName>`


## `rootDirs`

Using `rootDirs`, you can inform the compiler that there are many "virtual" directories acting as a single root. And thus the compiler can resolve **relative modules imports** within these "virtual" directories

```ts
{
  "compilerOptions": {
    "rootDirs": ["src/views", "generated/templates/views"]
  }
}
```

`rootDirs` is not limited to specifying a list of physical source directories. The supplied array may include any number of ad hoc, arbitrary directory names, regardless of whether they exist or not.

In below example, the compiler will now resolve `import messages from './#{locale}/messages'` to `import messages from './zh/messages'` for tooling purposes, allowing development in a locale agnostic manner without compromising design time support:

```json
{
  "compilerOptions": {
    "rootDirs": ["src/zh", "src/de", "src/#{locale}"]
  }
}
```

## Tracing module resolution

Enabling the compiler module resolution tracing using `--traceResolution`
