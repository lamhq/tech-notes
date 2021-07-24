## Create package.json file

```sh
yarn init
```

## Installing all the dependencies

```sh
yarn
```

## Adding a dependency
```sh
yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional
```

## Removing a dependency
```sh
yarn remove [package]
```


## Upgrading a dependency
```sh
yarn upgrade [package]
```

## Upgrade outdated packages

```sh
yarn upgrade-interactive [--latest]
```

## Add/List/Remove packages globally
```sh
yarn global <add/bin/list/remove/upgrade> [--prefix]
```


## Checks for outdated package dependencies

```sh
yarn outdated
```