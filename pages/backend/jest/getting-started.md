# Getting Started

## Installation 

Install jest for TypeScript projects.

```sh npm2yarn
npm install --save-dev jest @types/jest ts-jest
```

Explanation:
- `jest`: Install jest framework
- `@types/jest`: Install types for Jest globals (`describe`, `expect`, `test`, ...)
- `ts-jest`: Install the TypeScript preprocessor which allows jest to transpile TypeScript on the fly and have source-map support built in.
- This assume the TypeScript compiler (`'typescript'`) is already installed.


## Configure Jest

Create a `jest.config.js` file with below content:

```js
import type { Config } from 'jest';

module.exports = {
  // A list of paths to directories that Jest should use to search for files in
  roots: [
    "<rootDir>/src"
  ],

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
}
```


## Configure ESLint

- Allow ESLint to skip linting for Jest globals
- Add rules that enforces good testing practices for Jest test files

Install `eslint-plugin-jest`:
```shell npm2yarn
npm install --save-dev eslint-plugin-jest
```

Update your ESLint configuration:
```js filename="eslint.config.js"
import pluginJest from 'eslint-plugin-jest';

export default [
  {
    // update this to match your test files
    files: ['**/*.spec.js', '**/*.test.js'],
    ...jest.configs['flat/all'],,
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
];
```


## Write test

First, create a `sum.ts` file:

```js
export default function sum(a: int, b: int) {
  return a + b;
}
```

Then, create a file named `sum.test.ts`. This will contain our actual test:

```js
import sum from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```


## Run tests

Run `npx jest` from your project root and jest will execute any tests you have.


## References

- [ts-jest](https://kulshekhar.github.io/ts-jest/)
- [eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/intro-1/jest)