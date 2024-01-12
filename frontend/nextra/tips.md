# Nextra Tips

## Enable static build

Enable static site generation will generate statics HTML in the `out` directory that you can upload to any static web hosting.

To enable static site generation, update the file `next.config.js`:

```js
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx'
})

module.exports = {
  ...withNextra(),
  output: 'export',
  images: { unoptimized: true }
}
```