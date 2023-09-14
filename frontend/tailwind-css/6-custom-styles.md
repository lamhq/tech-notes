# Adding Custom Styles

Best practices for adding your own custom styles to Tailwind.

## Customizing your theme

If you want to change things like your color palette, spacing scale, typography scale, or breakpoints, add your customizations to the `theme` section of your `tailwind.config.js` file:

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
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
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

## Using arbitrary values

When you need to get things pixel-perfect, use Tailwind's square bracket notation to generate a class on the fly with any arbitrary value:

```html
<div class="top-[117px]">
  <!-- ... -->
</div>
```

This is basically like inline styles, with the major benefit that you can combine it with interactive modifiers like `hover` and responsive modifiers like `lg`:

This works for everything in the framework, including things like background colors, font sizes, pseudo-element content, and more:

```html
<div class="bg-[#bada55] text-[22px] before:content-['Festivus']">
  <!-- ... -->
</div>
```

### Reference theme value

It's even possible to use the `theme` function to reference the design tokens in your `tailwind.config.js` file:

```html
<div class="grid grid-cols-[fit-content(theme(spacing.32))]">
  <!-- ... -->
</div>
```

### CSS variables

When using a CSS variable as an arbitrary value, wrapping your variable in `var(...)` isn't needed — just providing the actual variable name is enough:

```html
<div class="bg-[--my-color]">
  <!-- ... -->
</div>
```

### Handling whitespace

When an arbitrary value needs to contain a space, use an underscore (`_`) instead and Tailwind will automatically convert it to a space at build-time:

```html
<div class="grid **grid-cols-[1fr_500px_2fr]**">
  <!-- ... -->
</div>
```

In case that you need to use an underscore, escape the underscore with a backslash and Tailwind won't convert it to a space:

```html
<div class="before:content-['hello\_world']">
  <!-- ... -->
</div>
```

### Resolving ambiguities

Many utilities in Tailwind share a common namespace but map to different CSS properties. For example `text-lg` and `text-black` both share the `text-` namespace, but one is for `font-size` and the other is for `color`.

When using arbitrary values, Tailwind can generally handle this ambiguity automatically based on the value you pass in:

```html
<!-- Will generate a font-size utility -->
<div class="text-[22px]">...</div>

<!-- Will generate a color utility -->
<div class="text-[#bada55]">...</div>
```

With CSS variables:

```html
<!-- Will generate a font-size utility -->
<div class="text-[length:var(--my-var)]">...</div>

<!-- Will generate a color utility -->
<div class="text-[color:var(--my-var)]">...</div>
```

## Arbitrary properties

If you ever need to use a CSS property that Tailwind doesn't include a utility for out of the box, you can also use square bracket notation to write completely arbitrary CSS:

```html
<div class="[mask-type:luminance] hover:[mask-type:alpha]">
  <!-- ... -->
</div>
```

## Arbitrary variants

Arbitrary _variants_ are like pseudo-class variants like `hover:{utility}` or responsive variants like `md:{utility}` but using square bracket notation directly in your HTML.

```html {{ filename: 'HTML' }}
<ul role="list">
  {#each items as item}
    <li class="**lg:[&:nth-child(3)]:hover:underline**">{item}</li>
  {/each}
</ul>
```


## Using CSS and @layer

You also use the `@layer` directive to add styles to Tailwind's `base`, `components`, and `utilities` layers:

```css {{ filename: 'main.css' }}
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .my-custom-style {
    /* ... */
  }
}
```

### Why does Tailwind group styles into "layers"?

In CSS, the order of the rules in your stylesheet decides which declaration wins when two selectors have the same specificity:

```css
.btn {
  background: blue;
  /* ... */
}

.bg-black {
  background: black;
}
```

When used together, `background` will be black since `.bg-black` comes after `.btn` in the CSS.

To manage this, Tailwind organizes the styles it generates into three different "layers" — a concept popularized by [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/#what-is-itcss).

- The `base` layer is for things like reset rules or default styles applied to plain HTML elements.
- The `components` layer is for class-based styles that you want to be able to override with utilities.
- The `utilities` layer is for small, single-purpose classes that should **always take precedence over any other styles**.

The `@layer` directive helps you control declaration order by automatically relocating your styles to the corresponding `@tailwind` directive, and also enables features like modifiers and tree-shaking for your own custom CSS.

### Adding base styles

If you just want to set some defaults for the page (like the text color, background color, or font family), use the `@layer` directive to add those styles to Tailwind's `base` layer:

```css {{ filename: 'main.css' }}
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply text-2xl;
  }
  h2 {
    @apply text-xl;
  }
  /* ... */
}
```

Use the `theme` function or `@apply` directive when adding custom base styles if you want to refer to any of the values defined in your theme.

```css
.content-area {
  height: calc(100vh - theme(spacing.12));
}
```

### Adding component classes

Use the `components` layer for any more complicated classes you want to add to your project that you'd still like to be able to override with utility classes.

Traditionally these would be classes like `card`, `btn`, `badge` — that kind of thing.

```css {{ filename: 'main.css' }}
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .card {
    background-color: theme('colors.white');
    border-radius: theme('borderRadius.lg');
    padding: theme('spacing.6');
    box-shadow: theme('boxShadow.xl');
  }
  /* ... */
}
```

By defining component classes in the `components` layer, you can still use utility classes to override them when necessary:

```html
<!-- Will look like a card, but with square corners -->
<div class="card rounded-none">
  <!-- ... -->
</div>
```

The `components` layer is also a good place to put custom styles for any third-party components you're using:

```css {{ filename: 'main.css' }}
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .select2-dropdown {
    @apply rounded-b-lg shadow-md;
  }
  .select2-search {
    @apply border border-gray-300 rounded;
  }
  .select2-results__group {
    @apply text-lg font-bold text-gray-900;
  }
  /* ... */
}
```

### Adding custom utilities

Add any of your own custom utility classes to Tailwind's `utilities` layer:

```css {{ filename: 'main.css' }}
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .content-auto {
    content-visibility: auto;
  }
}
```

This can be useful when there's a CSS feature you'd like to use in your project that Tailwind doesn't include utilities for out of the box.

### Using modifiers with custom CSS

Any custom styles you add to Tailwind with `@layer` will automatically support Tailwind's modifier syntax for handling things like hover states, responsive breakpoints, dark mode, and more.

```css {{ filename: 'CSS' }}
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .content-auto {
    content-visibility: auto;
  }
}
```

```html {{ filename: 'HTML' }}
<div class="**lg:dark:content-auto**">
  <!-- ... -->
</div>
```


### Removing unused custom CSS

Any custom styles you add to the `base`, `components`, or `utilities` layers will only be included in your compiled CSS if those styles are actually used in your HTML.

If you want to add some custom CSS that should always be included, add it to your stylesheet without using the `@layer` directive.

```css {{ filename: 'main.css' }}
@tailwind base;
@tailwind components;

/* This will always be included in your compiled CSS */
.card {
  /* ... */
}

@tailwind utilities;
```

### Using multiple CSS files

If you are writing a lot of CSS and organizing it into multiple files, make sure those files are combined into a single stylesheet before processing them with Tailwind, or you'll see errors about using `@layer` without the corresponding `@tailwind` directive.

The easiest way to do this is using the [postcss-import](https://github.com/postcss/postcss-import) plugin:

```diff-js {{ filename: 'postcss.config.js' }}
  module.exports = {
    plugins: {
+     'postcss-import': {},
      tailwindcss: {},
      autoprefixer: {},
    }
  }
```