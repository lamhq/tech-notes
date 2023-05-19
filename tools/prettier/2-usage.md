# Usage

## Install

```bash
yarn add --dev --exact prettier
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
yarn prettier --write .
```


## Set up your editor

### Visual Studio Code

`prettier-vscode` can be installed using the extension sidebar – it’s called “Prettier - Code formatter.”


### ESLint (and other linters)

If you use ESLint, install `eslint-config-prettier` to make ESLint and Prettier play nice with each other. It turns off all ESLint rules that are unnecessary or might conflict with Prettier.


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