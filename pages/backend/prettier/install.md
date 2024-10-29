# Installation

## Install Prettier

```bash npm2yarn
npm install --save-dev --save-exact prettier
```

Create an empty config file to let editors and other tools know you are using Prettier:

```bash
echo {}> .prettierrc.json
```

Create a `.prettierignore` file to let the Prettier CLI and editors know which files to not format.

```
# Ignore artifacts:
build
coverage
```

**Tip!** Base your `.prettierignore` on `.gitignore` and `.eslintignore` (if you have one).

Format all files with Prettier:

```bash
npx prettier . --write
```


## Set up IDE

### Visual Studio Code

Install [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension (`esbenp.prettier-vscode`).


### ESLint (and other linters)

Please check [Node.js Setup Guide](../eslint/8-nodejs-setup.md).


### Git hooks

Many people like to run Prettier as a pre-commit hook. This makes sure all your commits are formatted, without having to wait for your CI build to finish.

Install `husky` and `lint-staged`:

```bash
yarn add --dev husky lint-staged
npx husky install
npm pkg set scripts.prepare="husky install"
npx husky add .husky/pre-commit "npx lint-staged"
```

Add the following to your `package.json`:

```json
{
  "lint-staged": {
    "**/*": "prettier --write --ignore-unknown"
  }
}
```