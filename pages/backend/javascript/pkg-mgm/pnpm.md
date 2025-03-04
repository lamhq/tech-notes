# pnpm

## About

pnpm (Performant Node Package Manager) is a package manager for JavaScript.

It's particularly loved for its speed and reliability compared to npm and Yarn.

## Why pnpm

- Saving disk space.
- Boosting installation speed. 2x faster than npm.
- Avoids dependency conflicts by creating a non-flat `node_modules` structure.


## Installation (macOS)

Install pnpm using standalone script. It allows you to install and manage multiple versions of Node.js.

```sh
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

You can install a specific version:
```sh
curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION=<version> sh -
```


### Making a shorter alias

`pnpm` might be hard to type, so you may use a shorter alias like `pn` instead.

For POSIX systems (like macOS), just put the following line to your `.bashrc`, `.zshrc`, or `config.fish`:
```sh
alias pn=pnpm
```
