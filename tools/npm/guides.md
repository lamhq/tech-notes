# Create a React library as npm package

This library is a npm package of Material UI Dashboard Pro React

**package.json**

```json
{
  "name": "@lamhq/test-npm",
  "version": "1.0.0",
  "description": "",
  "main": "dist/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack-cli --config webpack.config.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.3.4",
    "@babel/plugin-proposal-class-properties": "^7.3.4",
    "@babel/polyfill": "^7.2.5",
    "@babel/preset-env": "^7.3.4",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.5",
    "clean-webpack-plugin": "^0.1.19",
    "css-loader": "^2.1.0",
    "file-loader": "^3.0.1",
    "node-sass": "^4.11.0",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.29.5",
    "webpack-cli": "^3.2.3"
  },
  "dependencies": {
    "@material-ui/core": "3.9.2",
    "@material-ui/icons": "3.0.2",
    "react": "16.8.1",
    "react-dom": "16.8.1",
    "chartist": "0.10.1",
    "react-chartist": "0.13.3",
    "react-bootstrap-sweetalert": "4.4.1",
    "react-big-calendar": "0.20.3",
    "perfect-scrollbar": "1.4.0",
    "nouislider": "13.1.0",
    "moment": "2.24.0",
    "react-datetime": "2.16.3",
    "react-swipeable-views": "0.13.1",
    "react-table": "6.9.2",
    "react-google-maps": "9.4.5",
    "react-jvectormap": "0.0.6",
    "react-router-dom": "4.3.1",
    "react-tagsinput": "3.19.0"
  },
  "peerDependencies": {
    "react": "^16.8.1"
  }
}
```

**webpack.config.js**

```js
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const outputDir = path.resolve(__dirname, 'dist');
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: ['./src/index.jsx'],
  },
  output: {
    path: outputDir,
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new CleanWebpackPlugin([outputDir]),
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.jsx'],
    // Tell webpack what directories should be searched when resolving modules.
    modules: ['node_modules', './src'],
  },
  externals: {
    'react': 'commonjs react'
  },
  module: {
    rules: [
      // load image
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: ['file-loader'],
      },
      // load font
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      // load css file
      {
        test: /\.css$/,
        loader: [
          'style-loader',
          'css-loader',
        ],
      },
      // load scss file
      {
        test: /\.(scss|sass)$/,
        loader: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      // load javascript/react components
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
```

**.babelrc**

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "targets": {
          "browsers": [
            "last 2 versions"
          ]
        }
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

**src/index.jsx**

```jsx
import React from 'react';
import "assets/scss/material-dashboard-pro-react.scss";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";


import appStyle from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo-white.svg";
import Buttons from "views/Components/Buttons.jsx";
import routes from "routes.js";


export default Buttons;
```