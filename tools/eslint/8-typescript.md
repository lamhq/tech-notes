# Setup ESLint for TypeScript project

## Installation

```bash
yarn add --dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript
```


## Configuration

create a `.eslintrc.cjs` config file in the root of your project, and populate it with the following:

```cjs
/* eslint-env node */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
};
```


## Run ESLint

```bash
npx eslint .
```
