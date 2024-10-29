# Configuration Files

## Overview

The file `eslint.config.js` is where you can configure ESLint for your project.

It should be placed in the root directory of your project.

It export an **array of configuration objects**.


## Configuration Objects

### Structure

Each configuration object is made up of these properties:
- [`name`](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-naming-conventions): name for the configuration object
- `files`: files that the configuration object should apply to
- `ignores`: files that the configuration object should not apply to
- `languageOptions`: An object containing settings related to how JavaScript is configured for linting
  - `ecmaVersion`: `latest`, `2022`
  - `sourceType`: `script`, `module`, `commonjs`
  - `globals`: An object specifying additional objects that should be added to the global scope during linting
  - `parser`: the parser that ESLint should use to parse your code. Default: `espree`
  - `parserOptions`: An object specifying additional options that are passed directly to the parser
- `rules`: An object containing the configured rules
- `plugins`: An object containing a name-value mapping of plugin names to plugin objects
- `settings`: An object containing name-value pairs of information that should be available to all rules

Check out the [official doc](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects) for the full list of properties.


### Example

```js filename="eslint.config.mjs"
export default [
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error"
    }
  }
];
```

`no-unused-vars` and `no-undef` are the names of [rules](https://eslint.org/docs/latest/rules) in ESLint.

The first value is the error level of the rule and can be one of these values:
- `"off"` or `0` - turn the rule off
- `"warn"` or `1` - turn the rule on as a warning (doesn't affect exit code)
- `"error"` or `2` - turn the rule on as an error (exit code will be 1)


## Cascading Configuration Objects

When more than one configuration object matches a given filename, the configuration objects are merged with later objects overriding previous objects when there is a conflict.

In below example, any JavaScript file in the `tests` directory, both configuration objects are applied, so `languageOptions.globals` are merged to create a final result:
```js filename="eslint.config.mjs"
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        MY_CUSTOM_GLOBAL: "readonly"
      }
    }
  },
  {
    files: ["tests/**/*.js"],
    languageOptions: {
      globals: {
        it: "readonly",
        describe: "readonly"
      }
    }
  }
];
```

If your project does not specify `"type":"module"` in its `package.json` file, then `eslint.config.js` must be in CommonJS format:
```js filename="eslint.config.js"
module.exports = [
  {
    rules: {
      semi: "error",
      "prefer-const": "error"
    }
  }
];
```


## Using Predefined Configurations

ESLint has two predefined configurations for JavaScript:

- `js.configs.recommended` - enables the rules that ESLint recommends everyone use to avoid potential errors
- `js.configs.all` - enables all of the rules shipped with ESLint

To include these predefined configurations, install the `@eslint/js` package and update the configuration:

```js filename="eslint.config.mjs"
import js from "@eslint/js";

export default [
  js.configs.recommended
];
```


## Using a Shareable Configuration Package

A sharable configuration is an npm package that exports a configuration object or array.

For example, to use a shareable configuration named `eslint-config-example`, your configuration file would look like this:
```js filename="eslint.config.mjs"
import exampleConfig from "eslint-config-example";

export default [
  exampleConfig
];
```


## Configuration File Resolution

THe configuration file may be named as:
1. eslint.config.js
2. eslint.config.mjs
3. eslint.config.cjs
4. eslint.config.ts
5. eslint.config.mts
6. eslint.config.cts

When running ESLint from the command line, it searches for the configuration file starting in the current working directory and moves up to the parent directories until it either finds a config file or reaches the root directory.

You can specify a config file using the `--config` option:
```sh
npx eslint --config some-other-file.js **/*.js
```


## References

https://eslint.org/docs/latest/use/configure/configuration-files