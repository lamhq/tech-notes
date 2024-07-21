# Configuration Files

## Overview
After running init command, you'll have a configuration file named `eslint.config.js` in your directory.

It is a place where you put the configuration for ESLint in your project.

You can:
- include built-in rules, configure thems
- plugins custom rules, shareable configurations
- specify which files you want rules to apply to

It should be placed in the root directory of your project and export an **array of configuration objects**.


## Configuration File Resolution

ESLint resolves configuration files in a specific order to determine which rules and settings to apply to your code:

1. **Command Line Options**: Options specified directly in the command line when running ESLint.
   ```sh
   npx eslint --config some-other-file.js **/*.js
   ```
2. **eslint.config.\*** files: Configuration files in the current working directory.
3. **Parent Directories**: Configuration files in the in parent directories up to the root directory.



## Configuration Objects

Each configuration object is made up of these properties:
- `files`
- `ignores`
- `languageOptions`:
  - `ecmaVersion`: `latest`, `2022`
  - `sourceType`: `script`, `module`, `commonjs`
  - `globals`
  - `parser`
  - `parserOptions`
- `rules`
- `plugins`
- `settings`: An object containing name-value pairs of information that should be available to all rules.

Check out the [official doc](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects) for the full list of properties.

```js filename="eslint.config.js"
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
```js
export default [
  {
    rules: {
      semi: "error",
      "prefer-const": "error"
    }
  }
];
```

If your project does not specify `"type":"module"` in its `package.json` file, then `eslint.config.js` must be in CommonJS format:
```js
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

```js
import js from "@eslint/js";

export default [
  js.configs.recommended
];
```
