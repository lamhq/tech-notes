# Specifying files and ignores

## Overview

You can limit which files a configuration object applies to by specifying a combination of `files` and `ignores` patterns.

For example, this configuration object matches all JavaScript files in the `src` directory except those that end with `.config.js`.
```js
export default [
  {
    files: ["src/**/*.js"],
    ignores: ["**/*.config.js"],
    rules: {
      semi: "error"
    }
  }
];
```

Patterns specified in `files` and `ignores` use [minimatch](https://www.npmjs.com/package/minimatch) syntax and are evaluated relative to the location of the `eslint.config.js` file.

If using an alternate config file via the `--config` command line option, then all patterns are evaluated relative to the current working directory.

Check out the [official doc](https://eslint.org/docs/latest/use/configure/configuration-files#specifying-files-and-ignores) for details.


## Ignoring files

You can configure ESLint to ignore certain files and directories while linting by specifying one or more glob patterns in the following ways:
- Inside of your `eslint.config.js` file
- On the command line using `--ignore-pattern`


## Ignoring Directories

The following ignores the `.config` directory in the same directory as the configuration file:
```js
export default [
  {
    ignores: [".config/"]
  }
];
```

If you want to recursively ignore all `.config` directories, you need to use `**/.config/`:
```js
export default [
  {
    ignores: ["**/.config/"]
  }
];
```

You can also unignore files and directories. For example, this config unignores `node_modules/mylibrary`:
```js
export default [
  {
    ignores: [
      "!node_modules/",           // unignore `node_modules/` directory
      "node_modules/*",           // ignore its content
      "!node_modules/mylibrary/"  // unignore `node_modules/mylibrary` directory
    ]
  }
];
```

If you’d like to ignore a directory except for specific files or subdirectories, then the ignore pattern `directory/**/*` must be used instead of `directory/**`. For example, if you’d like to ignore everything in the `build` directory except for `build/test.js`, you’d need to create a config like this:
```js
export default [
  {
    ignores: [
      "build/**/*",     // ignore all contents in and under `build/` directory but not the `build/` directory itself
      "!build/test.js"  // unignore `!build/test.js`
    ]
  }
];
```

Patterns that don’t end with `/` match both files and directories.


## Including `.gitignore` Files

If you want to include patterns from a `.gitignore` file or any other file with gitignore-style patterns, refer to this [doc](https://eslint.org/docs/latest/use/configure/ignore#including-gitignore-files).


## Reference

- [Ignore Files](https://eslint.org/docs/latest/use/configure/ignore)