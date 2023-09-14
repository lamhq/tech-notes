# Reusing Styles

As a project grows, you’ll inevitably find yourself repeating common utility combinations to recreate the same design in many different places.

In this guide you’ll learn about different strategies for reusing styles in your project, as well as best practices for when to employ each one.

## 1. Using editor and language features

If the styles you need to reuse only need to be reused **within a single file**, multi-cursor editing and loops are the simplest way to manage any duplication.

### Multi-cursor editing

When duplication is localized to a group of elements in a single file, the easiest way to deal with it to use [multi-cursor editing](https://code.visualstudio.com/docs/editor/codebasics#_multiple-selections-multicursor) to quickly select and edit the class list for each element at once.


### Loops

Before you assume you're going to need to extract a component or create a custom class for something, make sure you're _actually_ using it more than once in your template.

A lot of the time a design element that shows up more than once in the rendered page is only actually authored once because **the actual markup is rendered in a loop**.

```html
<div>
  <div class="flex items-center space-x-2 text-base">
    <h4 class="font-semibold text-slate-900">Contributors</h4>
    <span class="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">204</span>
  </div>
  <div class="mt-3 flex -space-x-2 overflow-hidden">
**    {#each contributors as user}**
**      <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="{user.avatarUrl}" alt="{user.handle}"/>**
**    {/each}**
  </div>
  <div class="mt-3 text-sm font-medium">
    <a href="#" class="text-blue-500">+ 198 others</a>
  </div>
</div>
```


## 2. Extracting components and partials

If you need to reuse some styles across multiple files, the best strategy is to create a _component_.

```jsx {{ filename: 'Notification.jsx' }}
function Notification({ imageUrl, imageAlt, title, message }) {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div className="shrink-0">
        <img className="h-12 w-12" src={imageUrl.src} alt={imageAlt}>
      </div>
      <div>
        <div className="text-xl font-medium text-black">{title}</div>
        <p className="text-slate-500">{message}</p>
      </div>
    </div>
  )
}
```


### Compared to CSS abstractions (create new css classes)

Even if you create classes for the different elements in a component, you still have to duplicate the HTML every time you want to use this component. (what if you need to turn the title into a link?)

Components and template partials solve this problem much better than CSS-only abstractions because a component can encapsulate the HTML and the styles. Changing the font-size for every instance is just as easy as it is with CSS, but now you can turn all of the titles into links in a single place too.


## Extracting classes with `@apply`

You can use Tailwind's `@apply` directive to extract repeated utility patterns to custom CSS classes when a template partial feels heavy-handed.

Here's what a `btn-primary` class might look like using `@apply` to compose it from existing utilities:

```html {{ filename: 'HTML' }}
<!-- Before extracting a custom class -->
<button class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
  Save changes
</button>

<!-- After extracting a custom class -->
<button class="**btn-primary**">
  Save changes
</button>
```

<div className="-mb-4"/>

```css {{ filename: 'CSS' }}
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75;
  }
}
```

### Avoiding premature abstraction

Whatever you do, **don't use `@apply` just to make things look "cleaner"**. Yes, HTML templates littered with Tailwind classes are kind of ugly. Making changes in a project that has tons of custom CSS is worse.

If you start using `@apply` for everything, you are basically just writing CSS again and throwing away all of the workflow and maintainability advantages Tailwind gives you, for example:

- **You have to think up class names all the time** — nothing will slow you down or drain your energy like coming up with a class name for something that doesn't deserve to be named.
- **You have to jump between multiple files to make changes** — which is a way bigger workflow killer than you'd think before co-locating everything together.
- **Changing styles is scarier** — CSS is global, are you _sure_ you can change the min-width value in that class without breaking something in another part of the site?
- **Your CSS bundle will be bigger** — oof.

If you're going to use `@apply`, use it for very small, highly reusable things like buttons and form controls — and even then only if you're not using a framework like React where a component would be a better choice.