# Configuration Files

ESLint supports configuration files in several formats:

1. `.eslintrc.js`
1. `.eslintrc.cjs`
1. `.eslintrc.yaml`
1. `.eslintrc.yml`
1. `.eslintrc.json`
1. `package.json`

There are two ways to use configuration files:

1. Put configuration file in the directory of the file to be linted
2. Pass its location to the CLI using the `--config` option

```sh
eslint -c myconfig.json myfiletotest.js
```

## Shared Settings across all Rules

```json
{
  "settings": {
    "sharedData": "Hello"
  }
}
```

## Cascading and Hierarchy

ESLint will searches up the directory structure, merging any configuration files it finds along the way until reaching either a configuration file with `root: true` or the root directory.

## Extending Configuration Files

A configuration file can inherit all the traits of another configuration file (including rules, plugins, and language options) and modify all the options using the `extends` property:

The `extends` property value is either:

- a string that specifies a configuration: a path to a config file, the name of a shareable config, `eslint:recommended`, or eslint:all
- an array of strings where each additional configuration extends the preceding configurations

ESLint extends configurations recursively.

The `eslint-config-` prefix can be omitted from the configuration name. For example, `airbnb` resolves as `eslint-config-airbnb`.

### Using a shareable configuration package

A sharable configuration is an npm package that exports a configuration object.

The extends property value can omit the eslint-config- prefix of the package name (for example, `eslint-config-standard`).

```js
module.exports = {
  "extends": "standard",
}
```

### Using a configuration from a plugin

A plugin is an npm package that can add various extensions to ESLint.

The `plugins` property value can omit the `eslint-plugin-` prefix of the package name.

The `extends` property value can be: `plugin:<PACKAGE_NAME>/<CONFIG_NAME>`

```json
{
  "plugins":[
    "react"
  ],
  "extends":[
    "plugin:react/recommended"
  ],
  "rules":{
    "react/no-set-state":"off",
    
    // enable additional rules
    "indent": ["error", 4],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],

    // override configuration set by extending "eslint:recommended"
    "no-empty": "warn",
    "no-cond-assign": ["error", "always"],

    // disable rules from base configurations
    "for-direction": "off",
  }
}
```

### Using a configuration file

The `extends` property value can be an absolute or relative path to a base configuration file.


## Override configuration using Glob Patterns

It is possible to override settings based on file glob patterns in your configuration by using the `overrides` key.

Override blocks can contain any configuration options that are valid in a regular config, with the exception of `root` and `ignorePatterns`:

- The `root` property in the extended configs is ignored
- The `ignorePatterns` property in the extended configs is used only for the files the glob specific configuration matched.

```json
{
  "rules":{
    "quotes":[
      "error",
      "double"
    ]
  },
  "overrides":[
    {
      "files":[
        "bin/*.js",
        "lib/*.js"
      ],
      "excludedFiles":"*.test.js",
      "rules":{
        "quotes":[
          "error",
          "single"
        ]
      }
    }
  ]
}
```