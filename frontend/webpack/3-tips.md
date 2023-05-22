# Tips

# Differences between Compilers and Bundlers (in Javascript)

Compilers and bundlers are two different types of tools that can be used to process JavaScript code.

Compilers transform the code from one format to another, usually to make it compatible with older browsers or environments.

Bundlers combine multiple files of code into one or more bundles that can be loaded more efficiently by the browser.

Compilers and bundlers can work together to optimize the code for production.

Some examples of compilers are Babel, TypeScript, esbuild and swc. Some examples of bundlers are webpack, rollup, browserify, parcel and esbuild.


# esbuild and TypeScript decorator support

esbuild is a JavaScript bundler and minifier that is known for its speed. It is an extremely fast JavaScript and CSS bundler and minifier. It is also a TypeScript and JavaScript compiler.

esbuild does not support TypeScript decorator metadata by default, as it does not perform type checking or emit metadata for decorators.

However, there are some plugins that can enable this feature by running the TypeScript compiler on files that contain decorators before passing them to esbuild.

For example, you can use `esbuild-plugin-tsc` or `esbuild-decorators` to handle the tsconfig setting `"emitDecoratorMetadata": true`. Note that using these plugins may affect the performance of esbuild and introduce some caveats