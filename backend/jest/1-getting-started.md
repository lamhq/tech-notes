# Getting Started

## Install jest for typescript project

```sh
yarn add jest @types/jest ts-jest -D
```

Explanation:
- Install jest framework (`jest`)
- Install the types for jest (`@types/jest`)
- Install the TypeScript preprocessor for jest (`ts-jest`) which allows jest to transpile TypeScript on the fly and have source-map support built in.
- Save all of these to your dev dependencies (`-D`)
- This assume the TypeScript compiler (`'typescript'`) is already installed.


## Configure Jest

Add the following `jest.config.js` file to the root of your project:

```js
module.exports = {
  roots: [
    "<rootDir>/src"
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}
```

Explanation:
- We assume all TypeScript files in a `src` folder in your project. This is specified using the `roots` option.
- The `testMatch` config is a glob pattern matcher for discovering test file.
- The transform config just tells jest to use `ts-jest` for `ts / tsx` files.


## Write test

First, create a `sum.js` file:

```js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

Then, create a file named `sum.test.js`. This will contain our actual test:

```js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```


## Run tests

Run `npx jest` from your project root and jest will execute any tests you have.


## References

- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/intro-1/jest)
- [ts-jest Documentation](https://kulshekhar.github.io/ts-jest/)
