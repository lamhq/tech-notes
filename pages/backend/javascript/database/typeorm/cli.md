# Using CLI

If your entity files are in typescript, you will need to transpile them to javascript before using CLI. 


## Installation

You may setup `ts-node` in your project:
```shell npm2yarn
npm install ts-node --save-dev
```

Add typeorm command under scripts section in `package.json`:
```json
"scripts": {
  "typeorm": "typeorm-ts-node-commonjs"
}
```

Then you may run the command like this:

```shell
npm run typeorm migration:run -- -d path-to-datasource-config
```
