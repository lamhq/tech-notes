# Minimizing Bundle Size

## Tree-shaking

If you're using ES6 modules and a bundler that supports tree-shaking (`webpack` >= 2.x, `parcel` with a flag) you can safely use named imports and still get an optimised bundle size automatically:

```ts
import { Button, TextField } from '@material-ui/core';
```

## Development environment

Development bundles can contain the full library which can lead to slower startup times. If this is an issue for you, you have various options:

### 1. Use path imports to avoid pulling in unused modules

```ts
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
```

### 2. Use Babel plugin

This option provides the best User Experience and Developer Experience:

- The Babel plugin enables top level tree-shaking even if your bundler doesn't support it.
- The Babel plugin makes startup time in dev mode as fast as Option 1.
- This syntax reduces the duplication of code, easier to read,  less likely making a mistake when importing a new module.

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
      'libraryName': '@material-ui/core',
      // Use "'libraryDirectory': ''," if your bundler does not support ES modules
      'libraryDirectory': 'esm',
      'camel2DashComponentName': false
    },
    'core'
  ],
  [
    'babel-plugin-import',
    {
      'libraryName': '@material-ui/icons',
      // Use "'libraryDirectory': ''," if your bundler does not support ES modules
      'libraryDirectory': 'esm',
      'camel2DashComponentName': false
    },
    'icons'
  ]
];

module.exports = {plugins};
```