# Extensions

## Extension location

```
~/.vscode/extensions
```


## Extensions for developers

- [GitHub Actions VS Code extension](https://marketplace.visualstudio.com/items?itemName=github.vscode-github-actions)


### ChatGPT - Genie AI

https://marketplace.visualstudio.com/items?itemName=genieai.chatgpt-vscode

To change custom promp command, open `Settings` > `Genieai` > `Prompt Prefix: Custom Prompt1`

To change the context menu title:
1. Open the file `~/.vscode/extensions/genieai.chatgpt-vscode-0.0.13/package.json`
2. Search for `chatgpt-vscode.customPrompt1` under `contributes` > `commands`
3. Change the `title` key