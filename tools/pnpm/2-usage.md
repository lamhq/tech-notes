# Usage

## Install

```bash
pnpm install

# pnpm-lock.yaml is not updated
pnpm i --frozen-lockfile

# will not install any package listed in `devDependencies`
pnpm -P
```

## Add package

```bash
pnpm add <pkg@version>

# Save to devDependencies
pnpm add -D <pkg>

# Install package globally
pnpm add -g <pkg>
```

## Update

updates packages to their latest version based on the specified range.

```bash
pnpm up

# Updates all dependencies, ignoring ranges specified in package.json
pnpm up --latest
```

## Remove

```bash
pnpm rm
```

## Audit

Checks for known security issues with the installed packages.

```bash
pnpm audit --fix
```

## Outdated

Checks for outdated packages.

```bash
pnpm outdated

# List outdated global packages
pnpm outdated -g
```

## Run scriptt

```bash
pnpm <cmd>
pnpm run <cmd>
```

## Exec

Execute a shell command in scope of a project.

If you have Jest as a dependency of your project, there is no need to install Jest globally, just run it with `pnpm exec`:

```bash
pnpm exec jest
```

## DLX

Fetches a package from the registry without installing it as a dependency, hotloads it, and runs whatever default command binary it exposes.

```bash
pnpm dlx create-react-app ./my-app
```

## Start

Runs an arbitrary command specified in the package's `start` property of its `scripts` object.

```bash
pnpm start
```

## Install Node.js

Install and use the specified version of Node.js

```bash
# Install the LTS version of Node.js:
pnpm env use --global lts

# Install Node.js v16:
pnpm env use --global 16

# Removes the specified version of Node.JS.
pnpm env remove --global 14.0.0
```
