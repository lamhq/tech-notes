# Web Frameworks

There are two kinds of web frameworks that Deno supports:

- Node.js native frameworks/tools/libraries. You might not get the best experience or performance.
- Deno native frameworks/tools/libraries.

## Deno-native frameworks

### Fresh

- [Fresh](https://fresh.deno.dev/) is the most popular web framework.
- The majority of rendering is done on a server
- client is only responsible for re-rendering small
- [islands of interactivity](https://jasonformat.com/islands-architecture/)
 
 
### Ultra

- [Ultra](https://ultrajs.dev/) is a modern streaming React framework.
- Use React to build dynamic media-rich websites (similar to Next.js).
- Supports transpiling JSX and TypeScript to regular JavaScript to work in browser
- 100% esm.
- uses import maps in both development and production. You don't have to deal with heaps of bundling and transpilation.
- source code is shipped in production, similar to how it's written.
- imports, exports, work as they do in development.


### Lume

- [Lume](https://lume.land/) is a static site generator.
- Support multiple file formats: Markdown, YAML, JavaScript, TypeScript,
  JSX, Nunjucks.
- You can hook in any processor to transform assets, for example sass or postcss
  for CSS.
- No need to install thousand of packages in `node_modules` or complex bundlers.


### Oak

[Oak](https://deno.land/x/oak) is a framework for building web API (e.g. REST APIs, GraphQL APIs).
