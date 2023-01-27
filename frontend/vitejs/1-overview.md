# Overview

## Curent version

Vite: `4.0.0`

This document is for React development.

## Why Vite

Vite is a development tool that aims to address the performance bottlenecks of using JavaScript-based tooling. It consists of two major parts:

- **A dev server** that provides rich feature enhancements over native ES modules, for example extremely fast Hot Module Replacement (HMR).
- **A build command** that bundles your code with Rollup, pre-configured to output highly optimized static assets for production.

It leverages new advancements in the ecosystem such as the availability of native ES modules in the browser and the rise of JavaScript tools written in compile-to-native languages.

It improves dev server start time by pre-bundling dependencies and serving source code over native ESM, which allows the browser to take over part of the job of a bundler.

It also uses HTTP headers to speed up full page reloads and HMR is performed over native ESM.

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
