# Setup ESLint for TypeScript Node.js project

## Requirements

- Base on Airbnb's codestyle
- Integrate with Prettier
- Support linting for Jest files


## References

- [eslint-config-airbnb-typescript](https://www.npmjs.com/package/eslint-config-airbnb-typescript)
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier#recommended-configuration)
- [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest)


## Installation

### Create config file

```tsx
// .eslintrc.js
module.exports = {
  // this file is the root-level one used by the project and
  // ESLint should not search beyond this directory for config files.
  root: true,
  // tells ESLint to use the @typescript-eslint/parser package you installed to parse your source files.
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // find the closest `tsconfig.json` for each source file
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  }
};
```


### Set up ESLint

```bash
pnpm add -D eslint \
            eslint-config-airbnb-typescript \
            @typescript-eslint/eslint-plugin@^6.0.0 \
            @typescript-eslint/parser@^6.0.0
```

Add to your config file:

```tsx
// .eslintrc.js
module.exports = {
  // ...
  extends: [
    'airbnb',
    'airbnb-typescript/base'
  ]
}
```


### Setup Prettier

```bash
pnpm add -D prettier \
            eslint-config-airbnb-typescript \
            @typescript-eslint/eslint-plugin@^6.0.0 \
            @typescript-eslint/parser@^6.0.0
```
