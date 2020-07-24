# Installation

## Basic

```sh
yarn add --dev jest
```


## TypeScript

### Install ts-jest

```sh
yarn add --dev jest typescript ts-jest @types/jest
```


### Create config file

```sh
yarn ts-jest config:init
```

```js
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // for testing React app
};
```


### References

- [ts-jest Online Documentation](https://kulshekhar.github.io/ts-jest/)