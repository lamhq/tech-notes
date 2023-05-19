# NPM

## Updating NPM

``` bash
npm install npm@latest -g
```

## Creating a package.json

``` bash
npm init --yes
npm init -y
```

## Install package locally

``` bash
npm install <package_name> --save
npm install <package_name> --save-dev
```

## Updating local packages

``` bash
npm update
```

## List outdated packages

``` bash
npm outdated
```

## List global installed packages

``` bash
npm list -g --depth=0
```

## Uninstalling local packages

``` bash
npm uninstall <package> --save
npm uninstall <package> --save-dev
```

## Installing npm packages globally

``` bash
npm install -g <package>
```

## Updating global packages

``` bash
npm update -g <package>
```

## Uninstalling global packages

``` bash
npm uninstall -g <package>
```

## Get peer dependencies of a package

```bash
npm view "@mui/lab" peerDependencies
```
