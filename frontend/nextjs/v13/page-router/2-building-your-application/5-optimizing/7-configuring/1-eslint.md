# ESLint

Next.js provides an integrated ESLint experience out of the box.


## Prettier

ESLint also contains code formatting rules, which can conflict with your existing Prettier setup. We recommend including [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) in your ESLint config to make ESLint and Prettier work together.

```bash
yarn add --dev eslint-config-prettier
```

```json filename=".eslintrc.json"
{
  "extends": ["next", "prettier"]
}
```


## lint-staged

If you would like to use next lint with lint-staged to run the linter on staged git files, you'll have to add the following to the `.lintstagedrc.js` file in the root of your project in order to specify usage of the --file flag.

```js
const path = require('path')
 
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`
 
module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
}
```