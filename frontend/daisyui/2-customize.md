# Customize

Customize daisyUI components

## Use daisyUI utility classes

```html
<button class="btn btn-primary">One</button>
<button class="btn btn-secondary">Two</button>
<button class="btn btn-accent btn-outline">Three</button>
```


## Use Tailwind's utility classes

```html
<button class="btn rounded-full">One</button>
<button class="btn rounded-none px-16">Two</button>
```


## Use Tailwind's `@apply` directive

```css
.btn {
  @apply rounded-full;
}
```


## Use an unstyled version of daisyUI

```js {{ filename: 'tailwind.config.js' }}
/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    styled: false,
  }
}
```
