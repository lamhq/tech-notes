# Husky (v7)

You can use it to lint your commit messages, run tests, lint code, etc... when you commit or push. Husky supports all Git hooks.

## Install (automatic)

```sh
npx husky-init && yarn
```


## Lint commit message

```sh
npx husky add .husky/commit-msg "yarn commitlint --edit $1"
```


## Check branch name and run linter before commit

```sh
npx husky add .husky/pre-commit "yarn preversion && yarn lint-staged"
```

```json
// package.json
  "scripts": {
    "preversion": "git-branch-is -r \"^(feature|fix|hotfix)/NB-\\d+/[a-z\\-\\d\\.]+$\" && echo Preversion checks passed. Your branch name is correct format.",
  },
  "lint-staged": {
    "*.ts": [
      "eslint --fix"
    ]
  },
  "devDependencies": {
    "git-branch-is": "^4.0.0",
    "eslint": "^7.31.0",
    "lint-staged": "^11.0.1",
  }
```

## Run unit test before push

```sh
npx husky add .husky/pre-push "yarn test:cov"
```

```json
// package.json
  "scripts": {
    "test:cov": "jest --coverage",
  },
}
```