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
    ```bash
    npm init -y
    ```
2. Install [TypeScript](/backend/typescript.mdx#installation)
3. Update `tsconfig.json`:
    ```json
    {
      // Reference: https://github.com/tsconfig/bases/blob/main/bases/node20.json
      "compilerOptions": {
        "lib": ["es2023"], // Use ES2023 library definitions.
        "module": "node16", // Use Node.js module system for ES modules.
        "target": "es2022", // Transpile code to ES2022.
        "strict": true,
        "esModuleInterop": true, // Allow default imports from CommonJS modules.
        "skipLibCheck": true, // Skip type checking of declaration files.
        "moduleResolution": "node16", // Use Node's module resolution algorithm.

        "preserveConstEnums": true, // Keeps const enums in the code as they are
        "noEmit": true, // Prevents TypeScript from generating any output files (for type-checking only)
        "forceConsistentCasingInFileNames": true // Ensures file imports have consistent casing
      },
      "include": ["src"]
    }
    ```


## Linting and Formatting

1. **Installation**: Install dependencies:
    ```bash npm2yarn
    npm install --save-dev eslint \
      @eslint/js \
      @types/eslint__js \
      typescript-eslint \
      prettier \
      eslint-config-prettier \
      eslint-plugin-prettier \
      husky \
      lint-staged
    ```
2. **Configuration**: create an `eslint.config.mjs` config file in the root of your project:
    ```js filename="eslint.config.mjs"
    // @ts-check
    import eslint from '@eslint/js';
    import tseslint from 'typescript-eslint';
    import eslintConfigPrettier from 'eslint-config-prettier';
    import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

    const tseslintConfig = tseslint.config(
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      {
        languageOptions: {
          parserOptions: {
            projectService: true,
            tsconfigRootDir: import.meta.dirname,
          },
        },
      }
    );

    export default [
      ...tseslintConfig,
      eslintConfigPrettier,
      eslintPluginPrettierRecommended,
      {
        // include only the `src` directory
        ignores: [
          "*",
          "!src/",
        ]
      }
    ];
    ```

    Create a Prettier config file:
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

    Set up Git Hook:
    ```shell
    npx husky init
    node --eval "fs.writeFileSync('.husky/pre-commit','npx lint-staged\n')"
    ```

3. **Update your `package.json`**:
    ```json
    "scripts": {
      "lint": "eslint"
    },
    "lint-staged": {
      "*.ts": "eslint --fix"
    }
    ```
4. **Run ESLint**:
    ```bash
    npm run lint
    ```


## Testing

Follow this guide to set up [Jest](/backend/jest/getting-started) for the project.


## Debugging


## References

- [typescript-eslint](https://typescript-eslint.io/getting-started/)
- [Prettier](/backend/prettier)
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
