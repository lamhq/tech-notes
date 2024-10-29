# Installation

## Installing Prettier

```bash npm2yarn
npm install --save-dev --save-exact prettier
```

Create an empty config file to let editors and other tools know you are using Prettier:
```bash
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
```

Create a `.prettierignore` file to let the Prettier CLI and editors know which files to not format:
```bash
node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"
```

Prettier will follow rules specified in `.gitignore` if it exists the directory where Prettier is run. You can also base your `.prettierignore` on `.eslintignore`.

It's important to install Prettier locally in every project, so each project gets the correct Prettier version.


## Using Prettier

Format all files with Prettier:
```bash
npx prettier . --write
```

Run this command in CI to make sure your code meets Prettier's formatting rules before merging any changes:
```shell
npx prettier . --check
```


## Set up Visual Studio Code

Install [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension (`esbenp.prettier-vscode`).


## Set up ESLint

Install [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier#installation) to make ESLint and Prettier play nice with each other.

Install plugin [`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier) to run Prettier as an ESLint rule (report Prettier formatting issues as linting errors).


## Git hooks (Husky)

Run Prettier as a pre-commit hook. This makes sure all your commits are formatted, without having to wait for your CI build to finish.

Install `husky` and `lint-staged`:

```bash npm2yarn
npm install --save-dev husky lint-staged
npx husky init
node --eval "fs.writeFileSync('.husky/pre-commit','npx lint-staged\n')"
```

Add the following to your `package.json`:

```json
{
  "lint-staged": {
    "**/*": "prettier --write --ignore-unknown"
  }
}
```