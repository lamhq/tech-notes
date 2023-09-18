# Customizing Colors


## Default color palette

https://tailwindcss.com/docs/customizing-colors#default-color-palette


## Using custom colors

Add your colors directly under the `theme.colors` section of your configuration file:

```js {{ filename: 'tailwind.config.js' }}
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
    },
  },
}
```

By default, these colors will be made available everywhere in the framework where you use colors, like the **text color** utilities, **border color** utilities, **background color** utilities, and more.

```html
<div class="**bg-midnight** **text-tahiti**">
  <!-- ... -->
</div>
```


## Color shades

When your palette includes multiple shades of the same color, it can be convenient to group them together using our nested color object syntax:

```js {{ filename: 'tailwind.config.js' }}
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'tahiti': {
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
      },
      // ...
    },
  },
}
```

The nested keys will be combined with the parent key to form class names like `bg-tahiti-400`.

The special `DEFAULT` key can be used when you want to define a value with no suffix:

```js {{ filename: 'tailwind.config.js' }}
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      // ...
      'tahiti': {
        light: '#67e8f9',
        DEFAULT: '#06b6d4',
        dark: '#0e7490',
      },
      // ...
    },
  },
}
```


## Arbitrary values

If you need a one-off custom color in your project, consider using Tailwind's arbitrary value notation to generate a class for that color on-demand instead of adding it to your theme:

```html
<button class="bg-[#1da1f2] text-white ...">
  <svg><!-- ... --></svg>
  Share on Twitter
</button>
```


## Generating colors

- [UI Colors](https://uicolors.app).
- [Palettte](https://palettte.app/).
- [ColorBox](https://colorbox.io/).


## Using the default colors

If you don't have a set of completely custom colors in mind for your project, you can curate your colors from our default palette by importing `tailwindcss/colors` in your configuration file and choosing the colors you want to use:

```js {{ filename: 'tailwind.config.js' }}
const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    },
  },
}
```

## Adding additional colors

If you'd like to add a brand new color to the default palette, add it in the `theme.extend.colors` section of your configuration file:

```js {{ filename: 'tailwind.config.js' }}
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        brown: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
      }
    },
  },
}
```


## Disabling a default color

If you'd like to disable any of the default colors, the best approach is to override the default color palette and just include the colors you _do_ want:

```js {{ filename: 'tailwind.config.js' }}
const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    },
  },
}
```


## Using CSS variables

If you'd like to define your colors as CSS variables, you'll need to define those variables:

```css {{ filename: 'main.css' }}
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    :root {
>     --color-primary: 255 115 179;
>     --color-secondary: 111 114 185;
      /* ... */
    }
  }
```


Then define your colors in your configuration file, being sure to include the color space you're using, and the special `<alpha-value>` placeholder that Tailwind will use to inject the alpha value when using an opacity modifier:

```js {{ filename: 'tailwind.config.js' }}
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      // Using modern `rgb`
      primary: 'rgb(var(--color-primary) / <alpha-value>)',
      secondary: 'rgb(var(--color-secondary) / <alpha-value>)',

      // Using modern `hsl`
      primary: 'hsl(var(--color-primary) / <alpha-value>)',
      secondary: 'hsl(var(--color-secondary) / <alpha-value>)',

      // Using legacy `rgba`
      primary: 'rgba(var(--color-primary), <alpha-value>)',
      secondary: 'rgba(var(--color-secondary), <alpha-value>)',
    }
  }
}
```