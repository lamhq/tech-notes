# Standard Version

## Installing

```sh
yarn add -D standard-version
```

**package.json**
```json
{
  "scripts": {
    "release": "standard-version"
  }
}
```


## Concepts

- packageFiles – files where versions can be read from and be "bumped".
- bumpFiles – files where versions should be "bumped", but not explicitly read from.


## First Release

This will tag a release without bumping the version bumpFiles1.

```sh
yarn release -- --first-release
```


## Release as a Target Type Imperatively (npm version-like)

```sh
yarn release -- --release-as 1.1.0
```


## Dry Run Mode

```sh
yarn release -- --dry-run
```