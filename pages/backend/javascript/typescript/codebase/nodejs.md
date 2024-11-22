# Set up Codebase for Node.js projects

## Features

- [x] Node.js v20.11.0
- [x] TypeScript v5
- [x] ESLint v9 with flat config system
- [x] Use Prettier for code formatting
- [x] Display linting errors in VS Code
- [x] Sample unit test with Jest
- [x] Run and debug unit test with VS Code
- [x] Conventional Commit support
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

Follow this [guide](../../eslint/install.md).

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

Follow this [guide](../../prettier/install.md).


## Testing

Follow this [guide](../../jest/getting-started.md).


## Debugging


## References

- [tsconfig/bases](https://github.com/tsconfig/bases/blob/main/bases/node20.json)
