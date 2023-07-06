# Minimizing Bundle Size

## Tree-shaking

If you're using ES6 modules and a bundler that supports tree-shaking (`webpack` >= 2.x), you can safely use named imports and still get an optimized bundle size automatically:

```ts
import { Button, TextField } from '@material-ui/core';
```

!The following instructions are only needed if you want to optimize your development startup times.

## Development environment

Development bundles can contain the full library which can lead to slower startup times. If this is an issue for you, you have two options:


### 1. Use path imports

You can use path imports to avoid pulling in unused modules.

```ts
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
```

we only support first and second-level imports. Anything deeper is considered private and can cause issues

```tsx
// ✅ OK
import { Add as AddIcon } from '@mui/icons-material';
import { Tabs } from '@mui/material';
//                         ^^^^^^^^ 1st or top-level

// ✅ OK
import AddIcon from '@mui/icons-material/Add';
import Tabs from '@mui/material/Tabs';
//                              ^^^^ 2nd level

// ❌ NOT OK
import TabIndicator from '@mui/material/Tabs/TabIndicator';
//                                           ^^^^^^^^^^^^ 3rd level
```

If you're using eslint you can catch problematic imports with the `no-restricted-imports` rule. The following `.eslintrc` configuration will highlight problematic imports from `@mui` packages:

```tsx
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": ["@mui/*/*/*"]
      }
    ]
  }
}
```


### 2. Use Babel plugin

This option provides the best User Experience and Developer Experience:

- UX: The Babel plugin enables top-level tree-shaking even if your bundler doesn't support it.
- DX: The Babel plugin makes startup time in dev mode as fast as Option 1.
- DX: This syntax reduces the duplication of code, requiring only a single import for multiple modules. Overall, the code is easier to read, and you are less likely to make a mistake when importing a new module.

```ts
import { Button, TextField } from '@material-ui/core';
```

```sh
yarn add -D babel-plugin-import
```

Create a `.babelrc.js` file in the root directory of your project:

```js
const plugins = [
  [
    'babel-plugin-import',
    {
      libraryName: '@mui/material',
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'core',
  ],
  [
    'babel-plugin-import',
    {
      libraryName: '@mui/icons-material',
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'icons',
  ],
];

module.exports = { plugins };
```

### 2. Use `vite-plugin-import`

```sh
yarn add -D vite-plugin-import
```

Add the plugin to your `vite.config.js` file:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import createImportPlugin from 'vite-plugin-import'

export default defineConfig({
  plugins: [
    react(),
    createImportPlugin([
      {
        libraryName: '@mui/material',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      {
        libraryName: '@mui/icons-material',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
    ]),
  ],
})
```
