# Presets

By default, any configuration you add in your own `tailwind.config.js` file is intelligently merged with the default configuration, with your own configuration acting as a set of overrides and extensions.

The `presets` option lets you specify a _different_ configuration to use as your base, making it easy to package up a set of customizations that you'd like to reuse across projects.

```js {{ filename: 'tailwind.config.js' }}
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('@acmecorp/tailwind-base')
  ],
  // ...
}
```