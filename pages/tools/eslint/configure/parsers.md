# Parsers

## Overview

An ESLint parser converts code into an abstract syntax tree that ESLint can evaluate.

Custom parsers let ESLint parse non-standard JavaScript syntax.

You don’t often have to use them directly in configuration file.

For example, `@typescript-eslint/parser` is a custom parser included in the `typescript-eslint` project that lets ESLint parse TypeScript code.


## Configure a Custom Parser

You can override the default parser by using the `parser` property.

The parser property must be an object that conforms to the [parser interface](https://eslint.org/docs/latest/extend/custom-parsers).

```js
import babelParser from "@babel/eslint-parser";

export default [
  {
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          presets: ["@babel/preset-env"]
        }
      }
    }
  }
];
```
