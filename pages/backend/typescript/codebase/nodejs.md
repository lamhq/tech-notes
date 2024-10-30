# Set up Codebase for Node.js projects

## Features

- [x] Node.js v20
- [x] TypeScript v5
- [x] ESLint v9 with flat config system
- [x] Use Prettier for code formatting
- [x] Display linting errors in VS Code
- [x] Sample unit test with Jest
- [ ] Run and debug unit test with VS Code
- [ ] Conventional Commit support
- [ ] esbuild
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

To only process files in your `sec` directory, add this config to `eslint.config.mjs`:
```js
export default [
  // other configs...
  {
    // include only the `src` directory
    ignores: [
      "*",
      "!src/",
    ]
  }
];
```


## Formatting

1. Install Prettier and ESLint plugins:
    ```bash npm2yarn
    npm install --save-dev prettier \
      eslint-config-prettier \
      eslint-plugin-prettier \
    ```
2. Update `eslint.config.mjs` file:
    ```js filename="eslint.config.mjs"
    import eslintConfigPrettier from 'eslint-config-prettier';
    import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

    export default [
      // your existing configs...
      eslintConfigPrettier,
      eslintPluginPrettierRecommended,
    ];
    ```
3. Create a Prettier config `.prettierrc` file:
    ```json filename=".prettierrc"
    {
      "useTabs": false,
      "tabWidth": 2,
      "semi": true,
      "singleQuote": true,
      "trailingComma": "es5",
      "printWidth": 80
    }
    ```


## Testing

Follow this guide to set up [Jest](/backend/jest/getting-started) for the project.


## Debugging


## References

- [tsconfig/bases](https://github.com/tsconfig/bases/blob/main/bases/node20.json)
- [Prettier](/backend/prettier)
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)


---
