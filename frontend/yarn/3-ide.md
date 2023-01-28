# Editor setup for Plug'n'Play

Smart IDEs require special configuration for TypeScript to work when using Plug'n'Play installs.

## VSCode

```bash
yarn dlx @yarnpkg/sdks vscode
```

Configured VSCode to use TypeScript in the workspace:

- Press `cmd+shift+p` in a TypeScript file
- Choose "Select TypeScript Version"
- Pick "Use Workspace Version"


## Go to code definition

Since the Yarn packages are kept within their archives, you can run command to instruct yarn to unzip the package, which will re-enable Go to definition functionality for the specific package:

```bash
yarn unplug pkg-name
```
