## Concept

Webpack is a module bundler for javascript app. It builds a dependency graph of modules and packages all modules into a small number of bundles

## Install

```
npm install --save-dev webpack
```

## Create configuration file

__webpack.config.js__

``` javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

## Create run shortcut using npm script

__package.json__

``` json
{
  ...
  "scripts": {
    "build": "webpack"
  },
  ...
}
```

To run webpack, type `npm run build` in your terminal

## Load Css

Install `style-loader` and `css-loader`

``` bash
npm install --save-dev style-loader css-loader
```

__webpack.config.js__

``` javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};
```

__src/style.css__

``` css
.hello {
  color: red;
}
```

__src/index.js__
``` javascript
import './style.css';
```

Now, when that module is run, a `<style>` tag with the stringified css will be inserted into the `<head>` of your html file.

## Load Images
Install `file-loader`

``` bash
npm install --save-dev file-loader
```

__webpack.config.js__

``` javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};
```

__src/index.js__
``` javascript
import MyImage from './my-image.png;
console.log(MyImage);
```

when you write `import MyImage from './my-image.png'`, that image will be processed and added to your `output` directory _and_ the `MyImage` variable will contain the final url of that image after processing.

When using the `css-loader`, as shown above, a similar process will occur for `url('./my-image.png')` within your CSS. The loader will recognize this is a local file, and replace the `'./my-image.png'` path with the final path to the image in your `output` directory.

The `html-loader` handles `<img src="./my-image.png" />` in the same manner.


## Load Fonts

__webpack.config.js__

``` javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};
```

__src/style.css__
``` css
@font-face {
  font-family: 'MyFont';
  src: url('./my-font.woff2') format('woff2'),
    url('./my-font.woff') format('woff');
  font-weight: 600;
  font-style: normal;
}

.hello {
  color: red;
  font-family: 'MyFont';
}
```

## Automatically generate index.html with HtmlWebpackPlugin

What would happen if we changed the filename of one of our entry points, or the output filename? The generated bundles would be renamed on a build, but our index.html file would still reference the old names.

Let's fix that with the `HtmlWebpackPlugin`, it will generate its own `index.html` and add all the bundles automatically.

Install the plugin

``` bash
npm install --save-dev html-webpack-plugin
```

__webpack.config.js__
``` javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management'
    })
  ],
};
```

You can also take a look at [`html-webpack-template`](https://github.com/jaketrent/html-webpack-template) which provides a couple of extra features in addition to the default template.

## Cleanup the build folder

It's good practice to clean the `/build` folder before each build, so that only used files will be generated. Let's install [`clean-webpack-plugin`](https://www.npmjs.com/package/clean-webpack-plugin) :

``` bash
npm install clean-webpack-plugin --save-dev
```

__webpack.config.js__
``` javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
     new CleanWebpackPlugin(['build'])
  ],
};
```

## Use source maps for easier trackdown errors and warnings

When webpack bundles your source code, it can become difficult to track down errors and warnings to their original location.

For example, if you bundle three source files (`a.js`, `b.js`, and `c.js`) into one bundle (`bundle.js`) and one of the source files contains an error, the stack trace will simply point to `bundle.js`. This isn't always helpful as you probably want to know exactly which source file the error came from.

In order to make it easier to track down errors and warnings, JavaScript offers [source maps](http://blog.teamtreehouse.com/introduction-source-maps), which maps your compiled code back to your original source code. If an error originates from `b.js`, the source map will tell you exactly that.

__webpack.config.js__
``` javascript
module.exports = {
  devtool: 'inline-source-map',
};
```

Now let's make sure we have something to debug, so let's create an error in our `print.js` file:

__src/print.js__
``` javascript
undefine.log('I get called from print.js!');
```

Now check the browser's console, the error should say something like this:

 ``` bash
 Uncaught ReferenceError: cosnole is not defined
    at HTMLButtonElement.printMe (print.js:2)
 ```

 ## Automatically recompile using watch mode
 __package.json__
 ``` json
{
  ...
  "scripts": {
    "build": "webpack --watch"
  },
  ...
}
```

## Automatically refresh browser using `webpack-dev-server`

``` bash
npm install --save-dev webpack-dev-server
```

__webpack.config.js__

``` javascript
const path = require('path');

module.exports = {
  devServer: {
    contentBase: './dist'
  }
};
```

__package.json__

``` json
{
  "scripts": {
    "start": "webpack-dev-server --open",
  }
}
```
