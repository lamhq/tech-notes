# commitlint

## Install

```sh npm2yarn
npm install --save-dev @commitlint/{cli,config-conventional}
```

Create a configuration file to use Conventional Commits:
```sh
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.mjs
```


## Local setup

To lint commits before they are created, you can use Husky:

1. Install Husky
    ```sh npm2yarn
    npm install --save-dev husky
    ```
2. Set up Husky and commit-msg hook
    ```sh
    npx husky init
    echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
    ```

You can test by making a git commit:
```sh
git commit -m "foo: this will fail"
```
