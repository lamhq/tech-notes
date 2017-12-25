### Updating NPM

``` bash
npm install npm@latest -g
```

### Creating a package.json

``` bash
npm init --yes
npm init -y
```

### Install package locally

``` bash
npm install <package_name> --save
npm install <package_name> --save-dev
```

### Updating local packages

``` bash
npm update
```

### List outdated packages

``` bash
npm outdated
```

### List global installed packages

``` bash
npm list -g --depth=0
```

### Uninstalling local packages

``` bash
npm uninstall <package> --save
npm uninstall <package> --save-dev
```

### Installing npm packages globally

``` bash
npm install -g <package>
```

### Updating global packages

``` bash
npm update -g <package>
```

### Uninstalling global packages

``` bash
npm uninstall -g <package>
```

### Semantic versioning explanation

Semantic versioning is a standard that a lot of projects use to communicate what kinds of changes are in this release.

If a project is going to be shared with others, it should start at __1.0.0__

Changes should be handled as follows:

- Bug fixes and other minor changes: Patch release, increment the __last number__, e.g. 1.0.1.
- New features which don't break existing features: Minor release, increment the __middle number__, e.g. 1.1.0.
- Changes which break backwards compatibility: Major release, increment the __first number__, e.g. 2.0.0.

### Specify which kinds of updates

As a consumer, you can specify which kinds of updates your app can accept in the `package.json` file.

If you were starting with a package 1.0.4, this is how you would specify the ranges:
* Patch releases: `1.0` or `1.0.x` or `~1.0.4`
* Minor releases: `1` or `1.x` or `^1.0.4`
* Major releases: `*` or `x`