# esbuild

## Caveats

There're several [caveats](https://esbuild.github.io/content-types/#typescript-caveats) when using esbuild:
- The `emitDecoratorMetadata` TypeScript configuration option is not supported
- If you are writing a library in TypeScript and you want to publish type declarations, you will likely either need to use the TypeScript compiler to generate them or manually write them yourself.

You must configure your TypeScript transpilation settings ([target](https://esbuild.github.io/api/#target)) to match the Node.js runtime that you plan to use.

`esbuild` doesn't perform type checks. To check types, run `tsc -noEmit` or add a `"noEmit"` option to `tsconfig.json` file.
