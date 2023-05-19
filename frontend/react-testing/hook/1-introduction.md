# react-hooks-testing-library

## Version

This document is for version **8.0.1**.

**THIS LIBRARY DOES NOT SUPPORT React 18**

## Introduction

The react-hooks-testing-library allows you to create a simple test harness for React hooks that handles running them within the body of a function component.

### When to use this library

- You're writing a library with one or more custom hooks that are not directly tied to a component
- You have a complex hook that is difficult to test through component interactions

### When not to use this library

- Your hook is defined alongside a component and is only used there
- Your hook is easy to test by just testing the components using it


## Installation

```bash
yarn add --dev @testing-library/react-hooks
```

Peer dependencies:

```bash
yarn add react@^16.9.0
yarn add --dev react-test-renderer@^16.9.0
```


## Import the library

```js
import { renderHook, act } from '@testing-library/react-hooks'
```
