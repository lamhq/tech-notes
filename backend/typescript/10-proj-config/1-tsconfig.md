# tsconfig.json

## Overview

The presence of a `tsconfig.json` file in a directory indicates that the directory is the root of a TypeScript project. 

The `tsconfig.json` file specifies the root files and the compiler options required to compile the project.

## Using `tsconfig.json`

- By invoking `tsc` with no input files, the compiler searches for the `tsconfig.json` file starting in the current directory and continuing up the parent directory chain
- By invoking `tsc` with no input files with command line options that specifies the path of a directory containing a `tsconfig.json`


## Recommendations for TSConfig base

Depending on the JavaScript runtime environment which you intend to run your code in, there may be a base configuration which you can use at [github.com/tsconfig/base](https://github.com/tsconfig/bases/)

These are `tsconfig.json` files which your project extends from which simplifies your `tsconfig.json` by handling the runtime support.

```ts
{
  "extends": "@tsconfig/node12/tsconfig.json",
  "compilerOptions": {
    "preserveConstEnums": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```