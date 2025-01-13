# Plugins

## Overview

An ESLint plugin is an npm module that can contain a set of ESLint rules, configurations, processors.

A popular use case for plugins is to enforce best practices for a framework.

For example, `@angular-eslint/eslint-plugin` contains best practices for using the Angular framework.


## Configure plugins

To use plugins, use the `plugins` key of a configuration objects.

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

## Use Plugin Rules

To use specific rules included in a plugin. Prefix the rule with the `plugin` key in the `plugins` object:
```js
import jsdoc from "eslint-plugin-jsdoc";

export default [
  {
    files: ["**/*.js"],
    plugins: {
      jsdoc: jsdoc
    },
    rules: {
      "jsdoc/require-description": "error",
      "jsdoc/check-values": "error"
    }
  }
];
```


## Use plugin's processor

Plugins may provide processors.

To specify processors in a configuration file, use the `processor` key and assign the name of processor:
```js
import markdown from "eslint-plugin-markdown";

export default [
  {
    files: ["**/*.md"],
    plugins: {
      markdown
    },
    processor: "markdown/markdown"
  }
];
```

You can specify additional configurations for named code blocks extracted from processors with additional config objects.
```js
import markdown from "eslint-plugin-markdown";

export default [
  // applies only to JavaScript blocks inside of Markdown files
  {
    files: ["**/*.md/*.js"],
    rules: {
      strict: "off"
    }
  }
];
```
