# Keybinding Tips

## Shortcut key to run terminal command

From the Command Palette (`Cmd+Shift+P`), choose `Preferences: Open Keyboard Shortcuts (JSON)` command.

Copy the config here to the editor and save:

```json
// Place your key bindings in this file to override the defaultsauto[]
[
  {
    "key": "cmd+alt+u",
    "command": "workbench.action.terminal.sendSequence",
    "args": {
      "text": "yarn dev\u000D"
    }
  }
]
```

Now when you press `Cmd + Option + U`, it will run `yarn dev` in the terminal.