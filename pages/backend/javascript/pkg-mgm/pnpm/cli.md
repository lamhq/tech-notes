# CLI commands

## Install dependencies

```sh
pnpm i

# install for production, packages listed in `devDependencies` won't be installed
# default value is `NODE_ENV === 'production'`
pnpm i -P

# pnpm-lock.yaml is not updated
pnpm i --frozen-lockfile
```

## Add package

```sh
pnpm add <pkg@version>

# Save to devDependencies
pnpm add -D <pkg>

# Install package globally
pnpm add -g <pkg>
```

## Upgrade package list

Updates packages to their latest version based on the specified range:
```sh
pnpm up
```

Updates all dependencies, ignoring ranges specified in `package.json`:
```sh
pnpm up --latest
```

## Find outdated packages

```sh
pnpm outdated
```

```sh
pnpm outdated "*gulp-*" @babel/core
```

## Remove packages

```sh
pnpm remove <pkg>
```

## Removes unnecessary packages

```sh
pnpm prune
```

## Run scripts

Runs a script defined in `package.json`:
```sh
pnpm run <cmd>
```

Runs the `test` script defined in `package.json`:
```sh
pnpm test
```

Runs the `start` script defined in `package.json`:
```sh
pnpm start
```

## Executing project dependency

Execute a shell command in scope of a project.

For example, if you have Jest as a dependency of your project, you can run it with `pnpm exec`:
```sh
pnpm exec jest
```

## Executing remote package

Fetches a package from the registry without installing it as a dependency, hotloads it, and runs whatever default command binary it exposes.

```sh
pnpm dlx create-react-app ./my-app
```

`pnpx` is an alias for `pnpm dlx`:
```sh
pnpx create-react-app ./my-app
```
