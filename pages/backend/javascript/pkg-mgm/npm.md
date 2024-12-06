# NPM

## Creating a package.json

```bash
npm init --yes
npm init -y
```

## Global packages

### List

```bash
npm list -g --depth=0
```

### Install

```bash
npm install -g <package>
```

### Upgrade

```bash
npm update -g <package>
```


### Uninstall

```bash
npm uninstall -g <package>
```

## Local packages

### Install

```bash
npm install <package_name> --save
npm install <package_name> --save-dev
```

### Upgrading

```bash
npm update
```

### List outdated

```bash
npm outdated
```

### Uninstalling

```bash
npm uninstall <package> --save
npm uninstall <package> --save-dev
```

### Get peer dependencies of a package

```bash
npm view "@mui/lab" peerDependencies
```

## Upgrading NPM

```bash
npm install npm@latest -g
```
