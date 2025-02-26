# Assets

## Import in js files

```jsx
// Import the logo.png image in the static directory
import logo from './static/logo.png';

console.log(logo); // "/static/logo.[hash].png"

export default = () => <img src={logo} />;
```

Import with alias:
```js
import logo from '@/static/logo.png';

console.log(logo); // "/static/logo.[hash].png"

export default = () => <img src={logo} />;
```

URL assets:
```jsx
const logo = new URL('./static/logo.png', import.meta.url).href;

console.log(logo); // "/static/logo.[hash].png"

export default = () => <img src={logo} />;
```

## Import in CSS files

```css
.logo {
  background-image: url('../static/logo.png');
}
```

Import with alias:
```css
.logo {
  background-image: url('@/static/logo.png');
}
```

absolute path:
```css
@font-face {
  font-family: DingTalk;
  src: url('/image/font/foo.ttf');
}
```


## Import Behavior

Behavior of importing static assets:
- When the file size is greater than 4KiB, a URL will be returned, and the file will be output to the dist directory.
- When the file size is less than 4KiB, it will be automatically inlined to Base64 format.


## Output Files

When static assets are imported, they will be output to the `dist` directory.

You can:
- Modify the output filename through `output.filename`.
- Modify the output path through `output.distPath`.


## Asset URL Prefix

You can include path prefix to asset URLs. It can be helpful if you're hosting assets on a CDN.

- In development, using `dev.assetPrefix` to set the path prefix.
- In production, using `output.assetPrefix` to set the path prefix.

```js
import logo from './static/logo.png';

// output.assetPrefix: https://example.com
console.log(logo); // "https://example.com/static/logo.[hash].png"
```


## Static assets

The `public` folder at the project root can be used to place some static assets.

They can be directly referenced via URL by prefixing with `server.base` path (default `/`). For example, the `./public/favicon.ico` file can be referenced as `/favicon.ico`.

When you perform a production build, these assets will be copied to the `dist` directory.

Avoid importing files from the public directory into the source code. The correct approach is to reference them by URL.


## TypeScript

When you import static assets in TypeScript code, TypeScript may prompt that the module is missing a type definition.

To fix this, you need to add a type declaration file for the static assets by creating a `src/env.d.ts` (you must install `@rsbuild/core` package):
```ts title="src/env.d.ts"
/// <reference types="@rsbuild/core/types" />
```
