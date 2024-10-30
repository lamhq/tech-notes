# Installation

## Install TypeScript

Install TypeScript and type definitions for Node.js project:

```sh npm2yarn
npm i -D typescript @types/node
```


## Configuration

Install a [predefined config](https://github.com/tsconfig/bases) from the community for your runtime environment:
```shell npm2yarn
npm install --save-dev @tsconfig/node20
```

Update your `tsconfig.json` to extend the installed config:
```json
{
  // Inherits the settings tailored for Node.js v20
  "extends": "@tsconfig/node20/tsconfig.json",
  
  // your config goes here
  "include": ["src"]  // only process files in the `src` directory
}
```


## Running code

First, compile TypeScript code to JavaScript:
```shell
npx tsc example.ts
```

Run JavaScript with Node.js:

```shell
node example.js
```
