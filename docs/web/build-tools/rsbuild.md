# Rsbuild

## Overview

Rsbuild is a high-performance build tool, powered by Rspack.

Designed to provide an out-of-the-box development experience:
- fast build times
- rich features

*Rspack is a high-performance JavaScript bundler written in Rust, compatible with webpack plugins.*


## Comparisons

![](https://assets.rspack.dev/rsbuild/assets/rsbuild-1-0-build-tools.png)

Rsbuild is similar to Vite, Create React App, or Vue CLI. All include:
- dev servers
- command line tools
- build configurations


### Vite

Rsbuild ensure consistency between development and production builds, while Vite can cause inconsistencies between builds.

Rsbuild support Module Federation by default.

Rsbuild is compatible with most webpack plugins and all Rspack plugins. Vite is compatible with Rollup plugins.


## Features

1. Easy to Configure: allowing developers to start a web project with zero configuration
2. High Performance: deliver first-class build speed
3. Plugin Ecosystem: includes a range of high-quality official plugins
4. Stable: ensures high consistency between development and production builds
5. Framework Agnostic: supports a variety of UI frameworks


## Ecosystem

![](https://assets.rspack.dev/rsbuild/assets/rspack-stack-layers.png)

- [Rspress](https://github.com/web-infra-dev/rspress): A fast static site generator based on Rsbuild.
- [storybook-rsbuild](https://github.com/rspack-contrib/storybook-rsbuild): Storybook builder powered by Rsbuild.
- [Modern.js](https://github.com/web-infra-dev/modern.js): A progressive React framework based on Rsbuild.