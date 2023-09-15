# Customizing Screens

## Overriding the defaults

To completely replace the default breakpoints, add your custom `screens` configuration directly under the `theme` key:

```js {{ filename: 'tailwind.config.js' }}
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'md': '960px',
      // => @media (min-width: 960px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
  }
}
```

Any default screens you haven't overridden (such as `xl` using the above example) will be removed and will not be available as screen modifiers.


## Overriding a single breakpoint

To override a single screen size (like `lg`), add your custom `screens` value under the `theme.extend` key:

```js {{ filename: 'tailwind.config.js' }}
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      screens: {
        'lg': '992px',
        // => @media (min-width: 992px) { ... }
      },
    },
  },
}
```

## Adding larger breakpoints

The easiest way to add an additional larger breakpoint is using the `extend` key:

```js {{ filename: 'tailwind.config.js' }}
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      screens: {
        '3xl': '1600px',
      },
    },
  },
  plugins: [],
}
```

## Adding smaller breakpoints

If you want to add an additional small breakpoint, you can't use `extend` because the small breakpoint would be added to the end of the breakpoint list, and breakpoints need to be sorted from smallest to largest in order to work as expected with a min-width breakpoint system.

Instead, override the entire `screens` key, re-specifying the default breakpoints:

```js {{ filename: 'tailwind.config.js' }}
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}
```


## Max-width breakpoints

https://tailwindcss.com/docs/screens#max-width-breakpoints


## Fixed-range breakpoints

https://tailwindcss.com/docs/screens#fixed-range-breakpoints


## Multi-range breakpoints

https://tailwindcss.com/docs/screens#multi-range-breakpoints


## Custom media queries

https://tailwindcss.com/docs/screens#custom-media-queries
