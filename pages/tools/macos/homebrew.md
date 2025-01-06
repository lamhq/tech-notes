# Homebrew

## Overview

[Homebrew](https://brew.sh/) is a popular package manager for macOS (and Linux) that simplifies the installation of software and tools.

- Easy to use
- Include a vast repository of packages, including developer tools like Python, Ruby, Node.js, etc.


## Install (macOS)

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Follow instructions in the terminal.


## Install a package

```shell
brew install <package_name>
```


## Uninstall a package

```shell
brew uninstall <package_name>
```


## Upgrade a package

```shell
brew upgrade <package_name>
```


## Upgrade all packages

```shell
brew upgrade
```


## List installed packages

```shell
brew list
```

List top-level packages:
```shell
brew leaves | xargs brew desc --eval-all
```

## List outdated packages

```shell
brew outdated
```

## Search package

```shell
brew search <name>
```

## References

https://devhints.io/homebrew