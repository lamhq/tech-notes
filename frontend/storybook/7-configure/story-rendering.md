# Story rendering

In Storybook, your stories render in a particular “preview” iframe (Canvas tab) inside the larger Storybook web application.

You may want to directly control the rendered HTML to help your stories render correctly.

## Adding to &#60;head&#62;

If you need to add extra elements to the `head` of the preview iframe, for instance, to load static stylesheets, font files, or similar, you can create a file called `.storybook/preview-head.html` and add tags like this:

```html
<!-- .storybook/preview-head.html -->

<!-- Pull in static files served from your Static directory or the internet -->
<!-- Example: `main.js|ts` is configured with staticDirs: ['../public'] and your font is located in the `fonts` directory inside your `public` directory -->
<link rel="preload" href="/fonts/my-font.woff2" />

<!-- Or you can load custom head-tag JavaScript: -->

<script src="https://use.typekit.net/xxxyyy.js"></script>
<script>
  try {
    Typekit.load();
  } catch (e) {}
</script>
```


## Adding to &#60;body&#62;

Sometimes, you may need to add different tags to the `<body>`. Helpful for adding some custom content roots.

You can accomplish this by creating a file called `preview-body.html` inside your `.storybook` directory and adding tags like this:

```html
<!--  .storybook/preview-body.html -->

<div id="custom-root"></div>
```

If using relative sizing in your project (like rem or em), you may update the base font-size by adding a style tag to `preview-body.html`:

```html
<!-- .storybook/preview-body.html -->

<style>
  html {
    font-size: 15px;
  }
</style>
```
