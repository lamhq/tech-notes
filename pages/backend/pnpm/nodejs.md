# Install Node.js using pnpm

You can use pnpm to install and use the specified version of Node.js. This's similar to [nvm](https://github.com/nvm-sh/nvm).

Install the LTS version of Node.js:
```bash
pnpm env use --global lts
```

Install Node.js v16:
```bash
pnpm env use --global 16
```

Removes the specified version of Node.JS:
```bash
pnpm env remove --global 14.0.0
```