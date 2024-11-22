# Installation (TypeScript)

## Requirements
- Node.js >=20.11.0.


## Installing packages

Install ESLint, `typescript-eslint`, `husky`, `lint-staged`:
```bash npm2yarn
npm install --save-dev eslint \
  @eslint/js \
  @types/eslint__js \
  typescript-eslint \
  husky \
  lint-staged
```


## Configuration

Create a `eslint.config.mjs` file:

```js filename="eslint.config.mjs"
// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
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
```

`tseslint.config()` is a helper function that provide types for your flat config file without the need for JSDoc type comments. It accepts any number flat config objects and returns an array of configuration objects.


## Installing Git hook

Set up Git Hook to run `lint-staged` on commit:

```shell
npx husky init
node --eval "fs.writeFileSync('.husky/pre-commit','npx lint-staged\n')"
```


## Setting up Visual Studio Code

Install [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

Update your VS Code setting to auto fix ESLint errors on save:
```json filename=".vscode/settings.json"
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always"
  }
}
```


## Running ESLint

Add `lint` script to `package.json`:
```json
{
  "scripts": {
    "lint": "tsc --noEmit && eslint",
  },
  "lint-staged": {
    "*.ts": "eslint --fix"
  }
}
```

*Because ESLint doesn't catch TypeScript errors, we need to perform type checks using `tsc`*.

Run ESLint for current directory:
```sh
npm run lint
```

Run and fix:
```sh
npm run lint --fix
```


## References

- [typescript-eslint](https://typescript-eslint.io/getting-started/)
