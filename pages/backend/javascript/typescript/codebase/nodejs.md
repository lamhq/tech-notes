# Instructions for setting up Node.js codebase

## Features

- [x] Node.js v20.11.0
- [x] TypeScript v5
- [x] ESLint v9 with flat config system
- [x] Use Prettier for code formatting
- [x] Display linting errors in VS Code
- [ ] Conventional Commit support
- [ ] Sample unit test with Jest
- [ ] Run and debug unit test with VS Code
- [ ] API e2e test
- [ ] Terraform
- [ ] CI/CD with Github Actions


## Creating project

1. Generate `package.json` file:
    ```shell
    npm init -y
    ```
2. Generate a `.gitignore` file for Node.js project:
    ```shell
    npx gitignore Node
    ```
3. Install [TypeScript](../../typescript/install.md)


## Linting

Follow this [guide](../../linters/eslint/install.mdx).

To only process files in your `src/` directory, add this config to `eslint.config.mjs`:
```js
export default [
  // other configs...

  {
    // include only the `src` directory
    ignores: ["*", "!src/"]
  }
];
```


## Formatting

Follow this [guide](../../linters/prettier/install.mdx).


## Testing

Follow this [guide](../../testing/jest/getting-started.mdx).


## References

- [tsconfig/bases](https://github.com/tsconfig/bases/blob/main/bases/node20.json)
