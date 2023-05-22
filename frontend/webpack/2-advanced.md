## Enable Hot Module Replacement

Hot Module Replacement (or HMR) is one of the most useful features offered by webpack. It allows all kinds of modules to be updated at runtime without the need for a full refresh.

__package.json__
```json
{
  "scripts": {
    "start": "webpack-dev-server --open --hot --inline"
  }
}
```

We don't specify the option `hot` and `inline` in webpack's config as official docs because it won't work. See: [https://github.com/webpack/webpack/issues/1151](https://github.com/webpack/webpack/issues/1151)

We don't add `HotModuleReplacementPlugin` plugin in webpack's config gile because it is automatically added when we specify the hot option in `package.json`

__webpack.config.js__

``` javascript
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.NamedModulesPlugin()
  ]
};
```

In `index.js`, whenever a module is updated, we return the updated version by require it in the code

__index.js__

``` javascript
if (module.hot) {
    // Whenever a new version of App.js is available
    module.hot.accept('./App', function () {
        // Require the new version and render it instead
        var NextApp = require('./App')
        ReactDOM.render(<NextApp/>, document.getElementById('root'))
    })
}
```


## Tree Shaking (dead-code elimination)

Tree Shaking allow us to remove unused export codes from bundle when compiling

``` bash
npm i --save-dev uglifyjs-webpack-plugin
```

__webpack.config.js__

``` javascript
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  plugins: [
    new UglifyJSPlugin()
  ]
};
```

## Separate webpack configuration for each environment

### Concept

In _development_, we want strong source mapping and a localhost server with live reloading or hot module replacement. In _production_, our goals shift to a focus on minified bundles, lighter weight source maps, and optimized assets to improve load time.

With this logical separation at hand, we typically recommend writing __separate webpack configurations__ for each environment. While we will separate the configurations, we'll still maintain a "common" configuration to keep things DRY.

In order to merge these configurations together, we'll use a utility called [`webpack-merge`](https://github.com/survivejs/webpack-merge)

### Install `webpack-merge`

``` bash
npm install --save-dev webpack-merge
```

### Create configuration files

__webpack.common.js__

``` javascript
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Production'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

__webpack.dev.js__

``` javascript
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  }
});
```

__webpack.prod.js__

``` javascript
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
});
```

In `webpack.common.js`, we now have our `entry` and `output` setup configured and we've included any plugins that are required for both environments.

In `webpack.dev.js`, we've added the recommended `devtool` for that environment (strong source mapping), as well as our simple `devServer` configuration.

Finally, in `webpack.prod.js`, we included the `UglifyJSPlugin` which was first introduced by the tree shaking guide.

### Update NPM Script

We'll use `webpack.dev.js` for our `npm start` script, and `webpack.prod.js` for our `npm run build` script

__package.json__

``` json
{
  ...
  "scripts": {
    "start": "webpack-dev-server --open --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  },
  ...
}
```
