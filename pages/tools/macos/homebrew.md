# Homebrew

## Install

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

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