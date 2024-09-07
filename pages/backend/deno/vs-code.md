# VS Code

## Set up

Install the [official Deno extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno).

Then in command palette, run `Deno: Initialize Workspace Configuration`:

![](https://docs.deno.com/assets/images/command_palette-dd2a85f903f65636307b8a9d526cd773.png)


## Debugging

### Overview

You can use Chrome DevTools or VSCode to debug Deno programs (using V8 Inspector Protocol).

To activate debugging capabilities run Deno with the `--inspect`,
`--inspect-wait` or `--inspect-brk` flags:

```shell
deno run --inspect main.ts
```

- `--inspect` allows attaching the debugger at any point in time,
- `--inspect-wait` will wait for debugger to attach and start executing code,
- `--inspect-brk` will wait for the debugger to attach and will pause
execution on the first line of code.


### VS Code set up

You can generate a configuration by: going to `Run and Debug` panel, clicking `create a launch.json file` and selecting `Deno` option.


## Linting

By enabling the *Deno: Lint* setting in the settings
panel (or `deno.lint` if editing settings in JSON) the editor should start to display lint "warnings" in your code.


## Formatting

Deno formatter should be specified in VS Code workspace settings:
```json
{
  "editor.defaultFormatter": "denoland.vscode-deno"`
}
```


## Configuration file

The Deno extension will also auto-identify and apply a `deno.jsonc` or `deno.json` by looking in the workspace root for the configuration file and applying it.

## References

- [Using Visual Studio Code](https://docs.deno.com/runtime/manual/references/vscode_deno)