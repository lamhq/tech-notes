# TypeScript


## Transpilation

Rsbuild uses SWC by default for transpiling TypeScript code (can be switched to Babel).

When using TypeScript in Rsbuild, you need to enable the `isolatedModules` option in your `tsconfig.json` file:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "isolatedModules": true
  }
}
```

## Type Checking

When transpiling TypeScript code using tools like SWC and Babel, type checking is not performed.

You can use the `@rsbuild/plugin-type-check` plugin for TypeScript type checking.