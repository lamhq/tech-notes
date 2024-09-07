# Reusing Styles

## Use cases

You find yourself repeating common utility combinations to recreate the same design in many different places.

Here are different strategies for reusing styles in your project:

## Using editor and language features

When: the styles you need to reuse only need to be reused **within a single file**

### Multi-cursor editing

[Multi-cursor editing](https://code.visualstudio.com/docs/editor/codebasics#_multiple-selections-multicursor) and loops are the simplest way to manage any duplication.


### Loops

Try to use a loop to render the markup before extract a component or create a custom class:

```html
<div>
  <div class="flex items-center space-x-2 text-base">
    <h4 class="font-semibold text-slate-900">Contributors</h4>
    <span class="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">204</span>
  </div>
  <div class="mt-3 flex -space-x-2 overflow-hidden">
    {#each contributors as user}
      <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="{user.avatarUrl}" alt="{user.handle}"/>
    {/each}
  </div>
  <div class="mt-3 text-sm font-medium">
    <a href="#" class="text-blue-500">+ 198 others</a>
  </div>
</div>
```


## Extracting components and partials

If you need to reuse some styles **across multiple files**, the best strategy is to create a _javascript component_ or _template partial_.



## Extracting classes with `@apply`

You can use Tailwind's `@apply` directive to extract repeated utility patterns to custom CSS classes when a template partial feels heavy-handed.

Here's what a `btn-primary` class might look like using `@apply` to compose it from existing utilities:

```html {{ filename: 'HTML' }}
<!-- Before extracting a custom class -->
<button class="py-2 px-5 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75">
  Save changes
</button>

<!-- After extracting a custom class -->
<button class="btn-primary">
  Save changes
</button>
```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply py-2 px-5 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75;
  }
}
```

### Best practices

Don't use `@apply` just to make things look "cleaner".

If you're going to use `@apply`, use it for very small, highly reusable things like buttons and form controls — and even then only if you're not using a framework like React where a component would be a better choice.
