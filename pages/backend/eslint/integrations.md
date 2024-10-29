# Integrations

## Visual Studio Code

Install [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

Update your VS Code setting to auto fix ESLint errors on save:
```json filename=".vscode/settings.json"
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always"
  }
}
```

## Git (Source Control)

- [Git Precommit Hook](https://coderwall.com/p/zq8jlq/eslint-pre-commit-hook)
- [Pre-commit hook for eslint, linting only staged changes](https://gist.github.com/dahjelle/8ddedf0aebd488208a9a7c829f19b9e8).

## Reference

- [Integrations](https://eslint.org/docs/latest/use/integrations)