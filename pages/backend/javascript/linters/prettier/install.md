# Installation

Install Prettier and make it work with ESLint.

## Installing Prettier

This assumes that you already have ESLint installed.

```bash npm2yarn
npm install --save-dev prettier \
  eslint-config-prettier \
  eslint-plugin-prettier \
```

- [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier#installation) makes ESLint and Prettier play nice with each other.
- [`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier) plugin helps reporting Prettier formatting issues as linting errors.

Prettier will follow rules specified in `.gitignore` if it exists the directory where Prettier is run. You can also base your `.prettierignore` on `.eslintignore`.

It's important to install Prettier locally in every project, so each project gets the correct Prettier version.


## Configuring Prettier

Create a Prettier config `.prettierrc` file:
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


## Configuring ESLint

Update `eslint.config.mjs` file:
```js filename="eslint.config.mjs"
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  // your existing configs...
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
];
```


## Using Prettier

Prettier's formatting issues are reported as linting errors. You can run `eslint --fix` to automatically format your code.

Or run Prettier directly:
```bash
npx prettier . --write
```


## Set up Visual Studio Code

*This is optional. You can just use the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).*

Install [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension (`esbenp.prettier-vscode`).


## References

- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
