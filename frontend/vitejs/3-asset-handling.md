# Import Handling

## Static Assets

The import can be either using absolute public paths (based on project root during dev) or relative paths.

```js
import imgUrl from './img.png'
document.getElementById('hero-img').src = imgUrl

// Explicitly load assets as URL
import assetAsURL from './asset.js?url'

// Load assets as strings
import assetAsString from './shader.glsl?raw'

// Load Web Workers
import Worker from './worker.js?worker'

// Web Workers inlined as base64 strings at build time
import InlineWorker from './worker.js?worker&inline'
```

Common image, media, and font filetypes are detected as assets automatically. You can extend the internal list using the `assetsInclude` option.


## The `public` Directory

Contain assets that are:

- Never referenced in source code (e.g. robots.txt)
- Must retain the exact same file name (without hashing)
- or you simply don't want to have to import an asset first just to get its URL

Assets in this directory will be served at root path `/` during dev, and copied to the root of the `dist` directory.

You should always reference public assets using root absolute path (for example, `public/icon.png` should be referenced in source code as `/icon.png`).


## Importing CSS

Importing `.css` files will inject its content to the page via a `<style>` tag with HMR support.

All CSS `url()` references are always automatically rebased to ensure correctness.

## CSS Pre-processors

Vite provide built-in support for `.scss`, `.sass`, `.less`, `.styl` and `.stylus`. but the corresponding pre-processor itself must be installed:

```bash
# .scss and .sass
npm add -D sass

# .less
npm add -D less

# .styl and .stylus
npm add -D stylus
```

Relative `url()` references inside imported Sass/Less files are automatically rebased.

## CSS Modules

Any CSS file ending with `.module.css` is considered a CSS modules file.

```css
/* example.module.css */
.red {
  color: red;
}
```

```js
import classes from './example.module.css'
document.getElementById('foo').className = classes.red
```

If `css.modules.localsConvention` is set to enable camelCase locals (e.g. `localsConvention: 'camelCaseOnly'`), you can also use named imports:

```js
// .apply-color -> applyColor
import { applyColor } from './example.module.css'
document.getElementById('foo').className = applyColor
```


## JSON

JSON files can be directly imported - named imports are also supported:

```js
// import the entire object
import json from './example.json'
// import a root field as named exports - helps with tree-shaking!
import { field } from './example.json'
```
