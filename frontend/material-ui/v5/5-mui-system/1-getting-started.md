# Getting Started

## Version

This document is for version: `v5.13.7`


## Overview

MUI System is a collection of CSS utilities for **rapidly laying out custom designs** with MUI component libraries.

The `sx` prop lets you define styles directly within the components themselves, rather than creating bulky and redundant const definitions with `styled-components`. This is especially useful for one-off components with custom designs.


## Installation

```bash
yarn add @mui/system @emotion/react @emotion/styled
```


## The `sx` prop

MUI System's core utility is the `sx` prop, which gives you a quick and efficient way to apply the correct design tokens directly to a React element.


## When to use `sx` prop?

The `sx` prop is best suited for applying one-off styles to custom components. This is in contrast to the `styled-components` API, which is ideal for building components that need to support a wide variety of contexts. These components are used in many different parts of the application and support different combinations of props.


## Where to use `sx` prop?

The `sx` prop can be used in four different locations:

- Core components
- Box
- Custom components created using `styled` utility
  ```tsx
  import { styled } from '@mui/material/styles';

  const Div = styled('div')``;
  ```
- Any element with the babel plugin


## Performance tradeoffs

Pros:

- The initial bundle size cost is fixed (~15kB gzipped). You pay the cost of `@emotion/react` and `@mui/system`.

Cons:

- Runtime performance takes a hit.

When rendering a list with many items, you can use a CSS child selector to not duplicate style of each item.