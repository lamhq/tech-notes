# Rules

## Overview

A rule validates if your code meets a certain expectation, and what to do if it does not meet that expectation.

Rules can also contain additional configuration options specific to that rule.


## Configuring Rules

### Using configuration object

You can configure rules in a configuration object by add a `rules` property containing an object with your rule configurations.

You can provide rule's configuration options by specifying an array where the first item is the **severity** and each item after that is an **option** for the rule.

For example, you can switch the `semi` rule to disallow semicolons by passing `"never"` as an option:

```js
export default [
  {
    rules: {
      semi: ["error", "never"]
    }
  }
];
```

### Using configuration comments

To configure rules inside of a file using configuration comments, use a comment in the following format:
```js
/* eslint eqeqeq: "off", curly: "error" -- `eqeqeq` is turned off and `curly` is turned on as an error.. */

/* eslint quotes: ["error", "double"]
 * --------
 * specifies the “double” option for the quotes rule.
 */
```

When more than one configuration object specifies the same rule, the later rule object overrides any previous objects.
```js
export default [
  {
    rules: {
      semi: ["error", "never"]
    }
  },
  {
    rules: {
      semi: ["warn", "always"]
    }
  }
];
```


## Configure Rules from Plugins

To configure a rule that is defined within a plugin, prefix the rule ID with the plugin namespace and `/`.
```js
import example from "eslint-plugin-example";

export default [
  {
    plugins: {
      example
    },
    rules: {
      "example/rule1": "warn"
    }
  }
];
```

## Disabling Rules

Disable rule warnings in a part of a file:
```js
/* eslint-disable no-alert, no-console */

alert('foo');
console.log('bar');

/* eslint-enable no-alert, no-console */
```

Disable rules on a specific line:
```js
alert('foo'); // eslint-disable-line

// eslint-disable-next-line
alert('foo');

// eslint-disable-next-line no-console, quotes, semi -- Here's a description about why this configuration is necessary.
console.log('hello');

/* eslint-disable-next-line no-console --
 * Here's a very long description about why this configuration is necessary
 * along with some additional information
**/
console.log('hello');
```

Using configuration files:
```js
export default [
  {
    rules: {
      "no-unused-expressions": "error"
    }
  },
  {
    files: ["*-test.js", "*.spec.js"],
    rules: {
      "no-unused-expressions": "off"
    }
  }
];
```
