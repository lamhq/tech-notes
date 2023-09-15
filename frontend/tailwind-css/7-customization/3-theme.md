# Theme Configuration

The `theme` section of your `tailwind.config.js` file is where you define your project's color palette, type scale, fonts, breakpoints, border radius values, and more.

```js {{ filename: 'tailwind.config.js' }}
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  }
}
```


## Theme structure

### Screens

The `screens` key allows you to customize the responsive breakpoints in your project.

```js {{ filename: 'tailwind.config.js' }}
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  }
}
```

### Colors

The `colors` key allows you to customize the global color palette for your project.

```js {{ filename: 'tailwind.config.js' }}
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      gray: {
        100: '#f7fafc',
        // ...
        900: '#1a202c',
      },

      // ...
    }
  }
}
```


### Spacing

The `spacing` key allows you to customize the global spacing and sizing scale for your project.

```js {{ filename: 'tailwind.config.js' }}
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    spacing: {
      px: '1px',
      0: '0',
      0.5: '0.125rem',
      // ...
      96: '24rem',
    },
  }
}
```

### Core plugins

The rest of the `theme` section is used to configure which values are available for each individual core plugin.


## Customizing the default theme

### Extending the default theme

If you'd like to preserve the default values for a theme option but also add new values, add your extensions under the `theme.extend` key in your configuration file.

Values under this key are merged with existing `theme` values and automatically become available as new classes that you can use.

As an example, here we extend the `fontFamily` property to add the `font-display` class that can change the font used on an element:

```js {{ filename: 'tailwind.config.js' }}
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display: 'Oswald, ui-serif', // Adds a new `font-display` class
      }
    }
  }
}
```

After adding this to your theme you can use it just like any other `font-{family}` utility:

```html
<h1 class="**font-display**">
  This uses the Oswald font
</h1>
```

### Overriding the default theme

To override an option in the default theme, add your overrides directly under the `theme` section of your `tailwind.config.js`:

```js {{ filename: 'tailwind.config.js' }}
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    // Replaces all of the default `opacity` values
    opacity: {
      '0': '0',
      '20': '0.2',
      '40': '0.4',
      '60': '0.6',
      '80': '0.8',
      '100': '1',
    }
  }
}
```

Any keys you **do not** provide will be inherited from the default theme.


### Referencing other values

```js {{ filename: 'tailwind.config.js' }}
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    spacing: {
      // ...
    },
    backgroundSize: ({ theme }) => ({
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      ...theme('spacing')
    })
  }
}
```

Note that you can only use this kind of closure with top-level theme keys, not the keys inside of each section.


### Referencing the default theme

If you'd like to reference a value in the default theme for any reason, you can import it from `tailwindcss/defaultTheme`.


```js {{ filename: 'tailwind.config.js' }}
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Lato',
          ...defaultTheme.fontFamily.sans,
        ]
      }
    }
  }
}
```
