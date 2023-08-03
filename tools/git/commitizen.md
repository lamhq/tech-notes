# Commitizen

## Overview

When you commit with Commitizen, you'll be prompted to fill out any required commit fields at commit time.

## Installation

```bash
yarn add -D commitizen
```

## Making your repo Commitizen friendly

**Initialize your project to use the cz-conventional-changelog adapter**

```bash
npx commitizen init cz-conventional-changelog --yarn --dev --exact
```

The above command does three things for you:

1. Installs the cz-conventional-changelog adapter npm module
2. Saves it to `package.json`'s `dependencies` or `devDependencies`
3. Adds the `config.commitizen` key to the root of your `package.json` file as shown here:

```json
...
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
```

This just tells Commitizen which adapter we actually want our contributors to use when they try to commit to this repo.


**Add the "Commitizen friendly" badge** to your README using the following markdown:

```
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
```


## Running Commitizen on `git commit` (optional)

For `husky` users, run this command:

```bash
npx husky add .husky/prepare-commit-msg "exec < /dev/tty && npx cz --hook || true"
```


## Using command line tool

Simply use `git cz` or just `cz` instead of git commit when committing.
