# Husky

## Version

This document is for version 7.


## About

Husky is a tool that simplifies the use of Git hooks.

Git hooks are scripts that run automatically on certain Git events, like committing or pushing code.

Husky makes it easy to set up and manage Git hooks, ensuring tasks like code formatting, linting, or tests are run automatically before commits or pushes.


## Install (automatic)

This will setup husky, modify `package.json` and create a sample `pre-commit` hook that you can edit.

```sh
npx husky-init@^7.0.0 && yarn
```


## Lint commit message

```sh
# Install and configure if needed
yarn add -D @commitlint/{cli,config-conventional}

# Configure commitlint to use conventional config
echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js

# Add hook
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'

# test the hook
git commit -m "foo: this will fail"
```

Reference: https://commitlint.js.org/#/guides-local-setup


## Check branch name before commit

```sh
yarn add -D git-branch-is@^4.0.0 

# Add hook
npx husky add .husky/pre-commit "npx git-branch-is -r '^(feature|fix)/[a-z\\-\\d\\.]+$'"
```

## Run linter before commit

```sh
yarn add -D lint-staged@^11.0.1 eslint@^7.31.0
npx husky add .husky/pre-commit "yarn lint-staged"
```

**package.json**

```json
  "lint-staged": {
    "*.ts": [
      "eslint --fix"
    ]
  },
```

## Run unit test before push

```sh
npx husky add .husky/pre-push "yarn test:cov"
npm pkg set scripts.test:cov="jest --coverage"
```

```json
// package.json
  "scripts": {
    "test:cov": "jest --coverage",
  },
}
```