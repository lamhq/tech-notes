# Getting Started

## Installation

```sh
yarn add eslint --dev
```

## Create a configuration file

```sh
npx eslint --init
```

## Run

```sh
npx eslint yourfile.js
```

## Configuration explanation

```json
{
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
}
```

The names `"semi"` and `"quotes"` are the names of rules in ESLint.

The first value is the error level of the rule and can be one of these values:

- `"off"` - turn the rule off
- `"warn"` - turn the rule on as a warning (doesn't affect exit code)
- `"error"` - turn the rule on as an error (exit code will be 1)


## Run ESLint

```sh
yarn run eslint yourfile.js
yarn run eslint "{src,apps,libs,test}/**/*.ts" --fix
```