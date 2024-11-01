# pnpm

## About

pnpm (Performant Node Package Manager) is a package manager for JavaScript.

It's particularly loved for its speed and reliability compared to npm and Yarn.

## Why pnpm

- Saving disk space.
- Boosting installation speed. 2x faster than npm.
- Avoids dependency conflicts by creating a non-flat `node_modules` structure.


## Installation

### Using npm

Require Node.js:

```shell
npm install -g pnpm
```

### Using Corepack

Since v16.13, Node.js is shipping Corepack for managing package managers.

```shell
corepack enable pnpm
```

You can choose the version of pnpm used on your project using the following command:

```shell
corepack use pnpm@latest
```


### Using standalone script

You may install pnpm even if you don't have Node.js installed.

On POSIX systems (macOS):
```shell
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

In a Docker container:
```shell
# bash
wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
# sh
wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -
# dash
wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.dashrc" SHELL="$(which dash)" dash -
```

Installing a specific version (using `PNPM_VERSION` env variable):
```shell
curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION=<version> sh -
```


### Making a shorter alias

`pnpm` might be hard to type, so you may use a shorter alias like `pn` instead

For POSIX systems (like macOS), just put the following line to your `.bashrc`, `.zshrc`, or `config.fish`:
```shell
alias pn=pnpm
```
