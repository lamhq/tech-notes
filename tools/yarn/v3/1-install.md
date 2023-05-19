# Installation

## Version

This document is for version: `3.3.1`


## Requirements

- Node.js >=16.10 (with Corepack shipped)


## Instructions

Enable Corepack:

```bash
corepack enable
```

Migrate Yarn to new version:

```bash
corepack prepare yarn@stable --activate
```


## Initializing your project

```bash
yarn init -2
```


## Updating to the latest versions

```bash
yarn set version stable
```

## Install For CI environment

- Commit `.yarnrc.yml` to git repo
- Run `yarn install` locally and commit `yarn.lock`
- Make sure the yarn version of CI match with the one used in project 

```bash
corepack enable
corepack prepare yarn@3.3.1 --activate
yarn install --immutable
```