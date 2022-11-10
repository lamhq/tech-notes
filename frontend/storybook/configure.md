# Configure

## Webpack

### Extending Storybook’s webpack config

To extend the above configuration, use the `webpackFinal` field of `.storybook/main.js`.

```js
// .storybook/main.js

const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = {
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    // Return the altered config
    return config;
  },
};
```

### Using your existing config

```js
// .storybook/main.js

const path = require('path');

// your app's webpack.config.js
const custom = require('../webpack.config.js');

module.exports = {
  webpackFinal: (config) => {
    return { ...config, module: { ...config.module, rules: custom.module.rules } };
  },
};
```


## Babel

Storybook’s webpack config by default sets up Babel for ES6 transpiling

### Custom config file

If your project has a `.babelrc` file, we'll use that instead of the default config file.

You can also place a `.storybook/.babelrc` file to use a special configuration for Storybook only.


### Custom configuration

```js
// .storybook/main.js

module.exports = {
  //...
  babel: async (options) => ({
    ...options,
    // any extra options you want to set
  }),
};
```


## Typescript

The base Typescript configuration uses babel-loader for Typescript transpilation, and optionally fork-ts-checker-webpack-plugin for checking.

```js
// .storybook/main.js

module.exports = {
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};
```

To make it easier to configure Typescript handling, use the typescript field in your `.storybook/main.js`.

```js
// .storybook/main.js

module.exports = {
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};
```


## Story rendering

### Adding to `<head>`

```html
<!-- .storybook/preview-head.html -->

<!-- Pull in static files served from your Static director or the internet -->
<link rel=”preload” href=”your/font” />
<!-- Or you can load custom head-tag JavaScript: -->
<script src="https://use.typekit.net/xxxyyy.js"></script>
<script>try{ Typekit.load(); } catch(e){ }</script>
```

### Adding to `<body>`

```html
<!--  .storybook/preview-body.html -->

<div id="custom-root"></div>

<style>
  body {
    font-size: 15px;
  }
</style>
```