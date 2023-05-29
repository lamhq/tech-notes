# Overview

## Curent version

Vite: `4.0.0`

This document is for React development.


## Why use module bundlers?

Until recently, JavaScript had no concept of **modules**. It **wasn’t possible to directly reference or include one JavaScript file in another** (today is [different](https://www.sitepoint.com/using-es-modules/)). And as applications grew in size and complexity, this made writing JavaScript for the browser tricky.

One common solution is to load arbitrary scripts in a web page using `<script>` tags. However, this brings its own problems. For example, each script initiates a **render-blocking HTTP request**, which can make JS-heavy pages feel **sluggish and slow**. Dependency management also becomes complicated, as load **order matters**.

ES6 (ES2015) went some way to addressing this situation by introducing a single, native module standard.

```js
// lib.js
export const PI = 3.1415926;

export function sum(...args) {
  log('sum', args);
  return args.reduce((num, tot) => tot + num);
}
```

```js
// main.js
import { sum } from './lib.js';

console.log( sum(1,2,3,4) ); // 10
```

However, as browser **support for ES6 modules was initially poor**, people started using module loaders to bundle dependencies into a single ES5 cross-browser compatible file. We have seen tools like webpack, Rollup and Parcel.


## Problems of module bundlers

The amount of JavaScript we are dealing with is increasing dramatically.

We are starting to hit a **performance bottleneck** for JavaScript based tooling: it can often take an unreasonably long wait to **spin up a dev server**, and even with **Hot Module Replacement**, file edits can take a couple of seconds to be reflected in the browser.

The slow feedback loop can greatly affect developers' productivity and happiness.


## Why Vite?

Vite aims to address these issues by leveraging new advancements in the ecosystem: the **availability of native ES modules in the browser**, and the **rise of JavaScript tools** written in compile-to-native languages.

It **improves dev server start time** by pre-bundling dependencies and serving source code over native ESM, which allows the browser to take over part of the job of a bundler.

It also uses HTTP headers to speed up full page reloads and HMR is performed over native ESM. Vite only needs to precisely invalidate the chain between the edited module and its closest HMR boundary, making **HMR updates consistently fast** regardless of the size of your application.

It's not recommended for production use, as it is still inefficient due to network round trips caused by nested imports.


## Features

- NPM Dependency Resolving and Pre-Bundling
- Hot Module Replacement
- TypeScript support
- Vue support
- CSS
- Statics Assets
- JSON
- Glob import
- Dynamic import
- WebAssembly
- Web Workers
- Build Optimizations


## `index.html` and Project Root

- `index.html` is the entry point to your application, not inside `public`
- Vite resolves `<script type="module" src="...">` that references your JavaScript source code, also `<script type="module">` and `<link href>`
- URLs inside `index.html` are automatically rebased, no need for special `%PUBLIC_URL%` placeholders.
- Absolute URLs in your source code will be resolved using the project root as base
