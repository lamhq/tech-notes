# Husky

## Version

This document is for version 9.


## About

Husky is a tool that makes it easy to set up and manage Git hooks.

Git hooks are scripts that run automatically on certain Git events, like committing or pushing code.

Husky ensure tasks like code formatting, linting, or tests are run automatically before commits or pushes.


## Install

```sh
npx husky init
```


## Adding a Hook

To add a hook:
```shell
echo "npm test" > .husky/pre-commit
```


## Use cases

### Check branch name before commit

```sh npm2yarn
npm i -D git-branch-is@^4.0.0 
```

Add hook:
```shell
echo "npx git-branch-is -r '^(feature|fix)/[a-z\\-\\d\\.]+$'" > .husky/pre-push
```


### Run unit test before push

```shell
echo "npm run test:cov" > .husky/pre-commit
npm pkg set scripts.test:cov="jest --coverage"
```
