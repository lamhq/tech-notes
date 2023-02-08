# Usage

## Starting a new project

```bash
yarn init
```

## Installing all the dependencies of project

```bash
yarn
# or
yarn install
```

### yarn install --production[=true|false]

Yarn will not install any package listed in `devDependencies` if the `NODE_ENV` environment variable is set to `production`. 

Use this flag to instruct Yarn to ignore `NODE_ENV` and take its production-or-not status from this flag instead.


### yarn install --frozen-lockfile

Don’t generate a `yarn.lock` lockfile and fail if an update is needed.


## Adding a dependency

```bash
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

```bash
yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional
```


## Upgrading a dependency

```bash
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```


## Removing a dependency

```bash
yarn remove [package]
```

## Run User-defined scripts

```bash
yarn <script> [<args>]
yarn run <script> [<args>]
```


## Checks for outdated package dependencies

```bash
yarn outdated
```

## Update outdated packages

```bash
yarn upgrade-interactive [--latest]
```


## Working with version control

The following files must be checked into source control for anyone to be able to manage your package:

- `package.json`: This has all the current dependencies for your package.
- `yarn.lock`: This stores the exact versions of each dependency for your package.

The actual source code that provides the functionality for your package.