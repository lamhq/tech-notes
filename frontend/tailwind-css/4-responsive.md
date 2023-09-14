# Responsive Design

## Breakpoints

There are five breakpoints by default, inspired by common device resolutions:

| Breakpoint prefix | Minimum width | CSS |
| --- | --- | --- |
| `sm` | 640px | `@media (min-width: 640px) { ... }` |
| `md` | 768px | `@media (min-width: 768px) { ... }` |
| `lg` | 1024px | `@media (min-width: 1024px) { ... }` |
| `xl` | 1280px | `@media (min-width: 1280px) { ... }` |
| `2xl` | 1536px | `@media (min-width: 1536px) { ... }` |

To add a utility but only have it take effect at a certain breakpoint, all you need to do is prefix the utility with the breakpoint name, followed by the `:` character:

```html
<!-- Width of 16 by default, 32 on medium screens, and 48 on large screens -->
<img class="w-16 **md:w-32** **lg:w-48**" src="...">
```

## Example

```html
<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden **md:max-w-2xl**">
  <div class="**md:flex**">
    <div class="**md:shrink-0**">
      <img class="h-48 w-full object-cover **md:h-full md:w-48**" src="/img/building.jpg" alt="Modern building architecture">
    </div>
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div>
      <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Incredible accommodation for your team</a>
      <p class="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.</p>
    </div>
  </div>
</div>
```

Here's how the example above works:

- By default, the outer `div` is `display: block`, but by adding the `md:flex` utility, it becomes `display: flex` on medium screens and larger.
- When the parent is a flex container, we want to make sure the image never shrinks, so we've added `md:shrink-0` to prevent shrinking on medium screens and larger. Technically we could have just used `shrink-0` since it would do nothing on smaller screens, but since it only matters on `md` screens, it's a good idea to make that clear in the class name.
- On small screens the image is automatically full width by default. On medium screens and up, we've constrained the width to a fixed size and ensured the image is full height using `md:h-full md:w-48`.


## Working mobile-first

Tailwind uses a mobile-first breakpoint system.

Unprefixed utilities take effect on all screen sizes.

Prefixed utilities only take effect at the specified breakpoint **and above**.


### Targeting mobile screens

Use unprefixed utilities to target mobile, and override them at larger breakpoints.

```html
<!-- This will center text on mobile, and left align it on screens 640px and wider -->
<div class="text-center sm:text-left"></div>
```

### Targeting a breakpoint range

By default, styles applied by rules like `md:flex` will apply at that breakpoint and stay applied at larger breakpoints.

If you'd like to apply a utility _only_ when a specific breakpoint range is active, stack a responsive modifier like `md` with a `max-*` modifier to limit that style to a specific range:

```html
<div class="md:max-xl:flex">
  <!-- ... -->
</div>
```

| Modifier | Media query |
| --- | --- |
| `max-sm` | `@media not all and (min-width: 640px) { ... }` |
| `max-md` | `@media not all and (min-width: 768px) { ... }` |
| `max-lg` | `@media not all and (min-width: 1024px) { ... }` |
| `max-xl` | `@media not all and (min-width: 1280px) { ... }` |
| `max-2xl` | `@media not all and (min-width: 1536px) { ... }` |


### Targeting a single breakpoint

To target a single breakpoint, target the range for that breakpoint by stacking a responsive modifier like `md` with the `max-*` modifier for the next breakpoint:

```html
<div class="md:max-lg:flex">
  <!-- ... -->
</div>
```

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

### Arbitrary values

If you need to use a one-off breakpoint that doesn’t make sense to include in your theme, use the `min` or `max` modifiers to generate a custom breakpoint on the fly using any arbitrary value.

```html
<div class="**min-[320px]:text-center** **max-[600px]:bg-sky-300**">
  <!-- ... -->
</div>
```