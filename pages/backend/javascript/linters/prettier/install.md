# Installation

Install Prettier and make it work with ESLint.

This assumes that you already have ESLint installed.

## Installing Prettier

```bash npm2yarn
npm install --save-dev prettier eslint-config-prettier
```

- [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier#installation) makes ESLint and Prettier play nice with each other.
- `eslint-plugin-prettier` isn't installed due to separation of concerns between linters and formatters

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

Update `eslint.config.mjs` file to turn off rules that conflict or are unnecessary with Prettier, by using these pre-made configs:
```js filename="eslint.config.mjs"
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  // your existing configs...
  eslintConfigPrettier,
];
```


## Using Prettier

Or run Prettier directly:
```bash
npx prettier . --write
```


## Set up Visual Studio Code

Install [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension (`esbenp.prettier-vscode`).


## References

- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
