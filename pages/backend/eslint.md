# ESLint

## Version

This document is for version `9.13.0` (2024).

*ESLint v8.x reached end-of-life on 2024-10-05 and is no longer maintained.*


## Overview

ESLint is an open-source JavaScript linting utility.

It helps developers find and fix problems in their JavaScript code, with the goal of making code more consistent and avoiding bugs.

It's widely used in both browser and server-side JavaScript projects to maintain code quality and consistency.


## Prerequisites

Node.js `^18.18.0`, `^20.9.0`, or `>=21.1.0`.


## Installation

Install and configure ESLint:
```sh
npm init @eslint/config@latest
```

If you want to use a specific shareable config that is hosted on npm, you can use the `--config` option:
```shell
# use `eslint-config-standard` shared config
npm init @eslint/config@latest -- --config eslint-config-standard
```


## Running ESLint

Run ESLint on any file or directory:
```sh
npx eslint yourfile.js
```

Run and fix:
```sh
npx eslint --fix file.js
```


## Reference

- [Official doc](https://eslint.org/docs/latest/use/getting-started)
- [awesome-eslint](https://github.com/dustinspecker/awesome-eslint)