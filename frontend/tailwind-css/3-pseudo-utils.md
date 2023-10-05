# Handling Hover, Focus, and Other States

## Pseudo-classes

### Hover, focus, and active

Style elements on hover, focus, and active using the `hover`, `focus`, and `active` modifiers:

```html
<button class="bg-violet-500 **hover:bg-violet-600** **active:bg-violet-700** **focus:outline-none focus:ring focus:ring-violet-300** ...">
  Save changes
</button>
```

See the [pseudo-class reference](https://tailwindcss.com/docs/hover-focus-and-other-states#pseudo-class-reference) for a complete list of available pseudo-class modifiers.


### First, last, odd, and even

Style an element when it is the first-child or last-child using the `first` and `last` modifiers:

```html
<ul role="list" class="p-6 divide-y divide-slate-200">
  {#each people as person}
    <!-- Remove top/bottom padding when first/last child -->
    <li class="flex py-4 **first:pt-0** **last:pb-0**">
      <img class="h-10 w-10 rounded-full" src="{person.imageUrl}" alt="" />
      <div class="ml-3 overflow-hidden">
        <p class="text-sm font-medium text-slate-900">{person.name}</p>
        <p class="text-sm text-slate-500 truncate">{person.email}</p>
      </div>
    </li>
  {/each}
</ul>
```

See the [pseudo-class reference](https://tailwindcss.com/docs/hover-focus-and-other-states#pseudo-class-reference) for a complete list of available pseudo-class modifiers.

### Form states

Style form elements in different states using modifiers like `required`, `invalid`, and `disabled`:

```html
<form>
  <label class="block">
    <span class="block text-sm font-medium text-slate-700">Username</span>
    <!-- Using form state modifiers, the classes can be identical for every input -->
    <input type="text" value="tbone" disabled class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      **disabled:bg-slate-50** **disabled:text-slate-500** **disabled:border-slate-200** **disabled:shadow-none**
      **invalid:border-pink-500** **invalid:text-pink-600**
      **focus:invalid:border-pink-500** **focus:invalid:ring-pink-500**
    "/>
  </label>
  <!-- ... -->
</form>
```


### Styling based on parent state <small>(group-{'{modifier}'})</small>

When you need to style an element based on the state of some _parent_ element, mark the parent with the `group` class, and use `group-*` modifiers like `group-hover` to style the target element:

```html
<a href="#" class="**group** block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500">
  <div class="flex items-center space-x-3">
    <svg class="h-6 w-6 stroke-sky-500 **group-hover:stroke-white**" fill="none" viewBox="0 0 24 24"><!-- ... --></svg>
    <h3 class="text-slate-900 **group-hover:text-white** text-sm font-semibold">New project</h3>
  </div>
  <p class="text-slate-500 **group-hover:text-white** text-sm">Create a new project from a variety of starting templates.</p>
</a>
```

This pattern works with every pseudo-class modifier, for example `group-focus`, `group-active`, or even `group-odd`.

**Differentiating nested groups**

When nesting groups, you can style something based on the state of a _specific_ parent group by giving that parent a unique group name using a `group/{name}` class, and including that name in modifiers using classes like `group-hover/{name}`:

```html
<ul role="list">
  {#each people as person}
    <li class="**group/item** hover:bg-slate-100 ...">
      <img src="{person.imageUrl}" alt="" />
      <div>
        <a href="{person.url}">{person.name}</a>
        <p>{person.title}</p>
      </div>
      <a class="**group/edit** invisible hover:bg-slate-200 **group-hover/item:visible** ..." href="tel:{person.phone}">
        <span class="**group-hover/edit:text-gray-700** ...">Call</span>
        <svg class="**group-hover/edit:translate-x-0.5 group-hover/edit:text-slate-500** ...">
          <!-- ... -->
        </svg>
      </a>
    </li>
  {/each}
</ul>
```

**Arbitrary groups**

You can create one-off `group-*` modifiers on the fly by providing your own selector as an arbitrary value between square brackets:

```html {{ filename: 'HTML' }}
<div class="group is-published">
  <div class="hidden **group-[.is-published]:block**">
    Published
  </div>
</div>
```

For more control, you can use the `&` character to mark where `.group` should end up in the final selector relative to the selector you are passing in:

```html {{ filename: 'HTML' }}
<div class="group">
  <div class="group-[:nth-of-type(3)_&]:block">
    <!-- ... -->
  </div>
</div>
```

### Styling based on sibling state <small>(peer-{'{modifier}'})</small>

When you need to style an element based on the state of a _sibling_ element, mark the sibling with the `peer` class, and use `peer-*` modifiers like `peer-invalid` to style the target element:

```html
<form>
  <label class="block">
    <span class="block text-sm font-medium text-slate-700">Email</span>
    <input type="email" class="**peer** ..."/>
    <p class="mt-2 invisible **peer-invalid:visible** text-pink-600 text-sm">
      Please provide a valid email address.
    </p>
  </label>
</form>
```

The `peer` marker can only be used on _previous_ siblings because of how the [general sibling combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_combinator) works in CSS.


## Pseudo-elements

See [here](https://tailwindcss.com/docs/hover-focus-and-other-states#pseudo-elements).

### Before and after

### Placeholder text

### File input buttons

### List markers

### Highlighted text

### First-line and first-letter

### Dialog backdrops

## Media and feature queries

### Responsive breakpoints

To style an element at a specific breakpoint, use responsive modifiers like `md` and `lg`.

```html
<div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
  <!-- ... -->
</div>
```

Check out the [Responsive Design](https://tailwindcss.com/docs/responsive-design) documentation for an in-depth look at how these features work.

### Prefers color scheme

### Prefers reduced motion

### Prefers contrast

### Viewport orientation

### Print styles

### Supports rules

## Attribute selectors

### ARIA states

### Data attributes

```html
<!-- Will apply -->
<div data-size="large" class="data-[size=large]:p-8">
  <!-- ... -->
</div>
```


### RTL support

### Open/closed state
