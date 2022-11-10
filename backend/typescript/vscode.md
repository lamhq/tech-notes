# Visual Studio Code with TypeScript

## Install TypeScript compliler

```shell
yarn global add typescript
```


## Modify the TypeScript compiler options

Add a file `tsconfig.json` which defines the TypeScript project settings such as the compiler options and the files that should be included.

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "outDir": "dist",
    "sourceMap": true
  }
}
```


## Setup default build task

You can define the TypeScript build task as the default build task so that it is executed directly when triggering **Run Build Task** (`Command + Shift + B`)

To do so, select **Configure Default Build Task** from the global **Terminal** menu (`Command + Shift + P`). This shows you a picker with the available build tasks. Select TypeScript **tsc: build**,


## Debugging

You have to enable source maps during the build by setting `"sourceMap": true` in your `tsconfig.json`.

With source code file open in the editor, press `F5` to start the debugger.

Execution will stop when the breakpoint is hit and you'll be able to see debugging information such as variable values and the call stack in the Run view