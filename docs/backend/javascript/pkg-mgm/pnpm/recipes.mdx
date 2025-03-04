# Recipes

## CI (GitHub Actions)

On GitHub Actions, you can use pnpm for installing and caching your dependencies:
```yml
name: pnpm Example Workflow
on:
  push:

jobs:
  build:
    runs-on: ubuntu-22.04
    strategy:
      matrix:
        node-version: [20]
    steps:
    - uses: actions/checkout@v4
    - name: Install pnpm
      uses: pnpm/action-setup@v4
      with:
        version: 9
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'pnpm'
    - name: Install dependencies
      run: pnpm install
```


## Working with Git

You should always commit the lockfile (`pnpm-lock.yaml`)

pnpm can automatically resolve merge conflicts in `pnpm-lock.yaml`. If you have conflicts, just run `pnpm install` and commit the changes.


## VS Code Dev Containers

If avoid permission errors when running `pnpm install` inside a Dev Container, make sure to change pnpm's store directory to an accessible location for the remote user (often is `root`):
```sh
pnpm config set store-dir /root/.pnpm-store
```
