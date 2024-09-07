# Pseudo Utilities

## Pseudo-classes

Common modifiers:
- `hover:`, `focus:`, `active:`
- `first:`, `last:`, `odd:`, `even:`

```html
<button class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ...">
  Save changes
</button>
```

Check out the [pseudo-class reference](https://tailwindcss.com/docs/hover-focus-and-other-states#pseudo-class-reference) for a complete list of available pseudo-class modifiers.


### Form states

Common modifiers:
- `required:`, `invalid:`, `disabled:`

```html
<form>
  <label class="block">
    <span class="block text-sm font-medium text-slate-700">Username</span>
    <!-- Using form state modifiers, the classes can be identical for every input -->
    <input type="text" value="tbone" disabled class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
  </label>
  <!-- ... -->
</form>
```


### Styling based on parent state

Check out the [official doc](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state).

### Styling based on sibling state

Check out the [official doc](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-sibling-state).

### Styling direct children

Check out the [official doc](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-direct-children).

### Styling based on descendants

Check out the [official doc](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-descendants).


## Pseudo-elements

Common modifiers:
- Before and after: `before:`, `after:`
- Placeholder text: `placeholder:`
- File input buttons: `file:`
- List markers: `marker:`
- Highlighted text: `selection:`
- First-line and first-letter: `first-line:`, `first-letter`
- Dialog backdrops: `backdrop:`

```html
<div class="before:content-[''] before:block ...">
  <!-- ... -->
</div>
```

```html
<label class="relative block">
  <span class="sr-only">Search</span>
  <span class="absolute inset-y-0 left-0 flex items-center pl-2">
    <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"><!-- ... --></svg>
  </span>
  <input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search"/>
</label>
```


## Media and feature queries

Common modifiers:
- Responsive breakpoints: check out the [Responsive Design](responsive.md) section.
- Prefers color scheme: check out the [Dark Mode](https://tailwindcss.com/docs/dark-mode) documentation.
- Viewport orientation: `portrait:`, `landscape:`
- Print styles: `print:`

```html
<div>
  <div class="portrait:hidden">
    <!-- ... -->
  </div>
  <div class="landscape:hidden">
    <p>
      This experience is designed to be viewed in landscape. Please rotate your
      device to view the site.
    </p>
  </div>
</div>
```


## Attribute selectors

Common modifiers:
- [ARIA states](https://tailwindcss.com/docs/hover-focus-and-other-states#aria-states): `aria-*` (e.g., `aria-checked`, `aria-disabled`, ...)
- [Data attributes](https://tailwindcss.com/docs/hover-focus-and-other-states#data-attributes): `data-*`
- [Open/closed state](https://tailwindcss.com/docs/hover-focus-and-other-states#open-closed-state): `open:` (add styles when a `<details>` or `<dialog>` element is in an open state).

```html
<div data-size="large" class="data-[size=large]:p-8">
  <!-- ... -->
</div>
```

```html
<div aria-checked="true" class="bg-gray-600 aria-checked:bg-sky-700">
  <!-- ... -->
</div>
```

```html
<div class="max-w-lg mx-auto p-8">
  <details class="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg" open>
    <summary class="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
      Why do they call it Ovaltine?
    </summary>
    <div class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
      <p>The mug is round. The jar is round. They should call it Roundtine.</p>
    </div>
  </details>
</div>
```


## Arbitrary variants

Arbitrary variants let you write custom selector modifiers directly in your HTML.

Syntax: `[{selector}]`.

```html
<ul>
  <li class="[&:nth-child(3)]:underline">{item}</li>
</ul>
```

Check out the [official doc](https://tailwindcss.com/docs/hover-focus-and-other-states#custom-modifiers).