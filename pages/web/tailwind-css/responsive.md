# Responsive Design

## Breakpoints

Every utility class in Tailwind can be applied conditionally at different breakpoints:
```html
<!-- Width of 16 by default, 32 on medium screens, and 48 on large screens -->
<img class="w-16 md:w-32 lg:w-48" src="...">
```

There are five breakpoints by default:

| Breakpoint prefix | Minimum width | CSS |
| --- | --- | --- |
| `sm` | 640px | `@media (min-width: 640px) { ... }` |
| `md` | 768px | `@media (min-width: 768px) { ... }` |
| `lg` | 1024px | `@media (min-width: 1024px) { ... }` |
| `xl` | 1280px | `@media (min-width: 1280px) { ... }` |
| `2xl` | 1536px | `@media (min-width: 1536px) { ... }` |


Look at the [example](https://tailwindcss.com/docs/responsive-design#:~:text=Here%E2%80%99s%20a%20simple%20example) at the official doc.


## Working mobile-first

By default, unprefixed utilities take effect on all screen sizes. Like `uppercase`

Prefixed utilities only take effect at the specified breakpoint  and above. Like `md:uppercase`.

To target mobile screens, use unprefixed utilities, and override them at larger breakpoints:
```html
<!-- This will center text on mobile, and left align it on screens 640px and wider -->
<div class="text-center sm:text-left"></div>
```

It’s recommended to implement the mobile layout for a design first, then layer on any changes for larger screens.


### Targeting a breakpoint range

If you'd like to apply a utility _only_ when a specific breakpoint range is active, use the syntax format: `{from}:max-{to}:{utility}`:

```html
<div class="md:max-xl:flex">
  <!-- ... -->
</div>
```

Available `max-*` modifiers:
| Modifier | Media query |
| --- | --- |
| `max-sm` | `@media not all and (min-width: 640px) { ... }` |
| `max-md` | `@media not all and (min-width: 768px) { ... }` |
| `max-lg` | `@media not all and (min-width: 1024px) { ... }` |
| `max-xl` | `@media not all and (min-width: 1280px) { ... }` |
| `max-2xl` | `@media not all and (min-width: 1536px) { ... }` |


## Using custom breakpoints

### Customizing your theme

You can completely customize your breakpoints in your `tailwind.config.js` file:

```js {{ filename: 'tailwind.config.js' }}
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  }
}
```

### Use arbitrary values

If you need to use a one-off breakpoint that doesn’t make sense to include in your theme, use the `min` or `max` modifiers to generate a custom breakpoint on the fly using any arbitrary value.

```html
<div class="min-[320px]:text-center max-[600px]:bg-sky-300">
  <!-- ... -->
</div>
```