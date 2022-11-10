# Language Options

## Specifying Environments

```json
{
  "env":{
    "browser":true,
    "node":true
  }
}
```

- `browser` - browser global variables.
- `node` - Node.js global variables and Node.js scoping.
- `commonjs` - CommonJS global variables and CommonJS scoping (use this for browser-only code that uses Browserify/WebPack).
- `es2017` - [ECMAScript 2017](https://flaviocopes.com/es2017/), set `ecmaVersion` parser option to 8.
- `es2020` - [ECMAScript 2020](https://www.digitalocean.com/community/tutorials/js-es2020), set `ecmaVersion` parser option to 11.
- `es2021` - [ECMAScript 2021](https://backbencher.dev/articles/javascript-es2021-new-features) set `ecmaVersion` parser option to 12.
- `jest` - Jest global variables.
- `mongo` - MongoDB global variables.
- `serviceworker` - Service Worker global variables.

## Using a plugin

To use an environment from a plugin, specify the plugin name in the `plugins` array and then use the unprefixed plugin name

```json
{
  "plugins":[
    "example"
  ],
  "env":{
    "example/custom":true
  }
}
```

## Specifying Globals

```json
{
  "globals":{
    "var1":"writable",
    "var2":"readonly",
    "Promise": "off"
  }
}
```


## Specifying Parser Options

ESLint allows you to specify the JavaScript language options you want to support. By default, ESLint expects ECMAScript 5 syntax.

We recommend using `eslint-plugin-react` if you are using React.

Supporting ES6 syntax is not the same as supporting new ES6 globals. For ES6 syntax, use:

```json
// does not enable ES6 globals automatically
{
  "parserOptions": {
    "ecmaVersion": 6 
  }
}
```

for new ES6 global variables, use:

```json
// enables ES6 syntax automatically
{
  "env": {
    "es6": true 
  } 
}`
```

Parser options are set by using the `parserOptions` property. The available options are:

- `ecmaVersion`: `2015` (same as `6`), `2016`, `2017`, `2018`, `2019`, `2020`, or `2021` (same as 12)
- `sourceType`: `"script"` (default) or `"module"` if your code is in ECMAScript modules.
- `ecmaFeatures`: 
  - `globalReturn` - allow `return` statements in the global scope
  - `impliedStrict` - enable global strict mode (if ecmaVersion is 5 or greater)
  - `jsx` - enable `JSX`

```json
{
  "parserOptions":{
    "ecmaVersion":"latest",
    "sourceType":"module",
    "ecmaFeatures":{
      "jsx":true
    }
  },
  "rules":{
    "semi":"error"
  }
}
```