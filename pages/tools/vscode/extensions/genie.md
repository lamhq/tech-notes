# ChatGPT - Genie AI

## Overview

Link: [ChatGPT - Genie AI](https://marketplace.visualstudio.com/items?itemName=genieai.chatgpt-vscode)

## Set label for Custom Prompt

1. Open the file `~/.vscode/extensions/genieai.chatgpt-vscode-0.0.13/package.json`
2. Find the command `chatgpt-vscode.customPrompt1`, then edit the `title` field
```json
{
  "command": "chatgpt-vscode.customPrompt1",
  "title": "Genie: Shorten this",
  "enablement": "editorHasSelection"
},
```
